import supabase from "../config/SupabaseClient.js";
import dayjs from 'dayjs';

export const viewAttendance=  async (req, res) => {
    // console.log("hello");
    

    // return res.status(200).json({message: "hello i'm here"});
    
  const { student_id } = req.params;
//   const { month, year } = req.body;
  const { month, year } = req.query;
    // console.log(student_id);
    
  if (!student_id || !month || !year) {
    return res.status(400).json({ error: 'Missing studentId, month, or year' });
  }

  const start = dayjs(`${year}-${month}-01`);
  const end = start.endOf('month');

  // Fetch actual attendance records
  const { data, error } = await supabase
    .from('attendance')
    .select('date, status')
    .eq('student_id', student_id)
    .gte('date', start.format('YYYY-MM-DD'))
    .lte('date', end.format('YYYY-MM-DD'));
    
    // console.log("1");
    

  if (error) {
    console.log(error);
    
    return res.status(500).json({ error: error.message });
  }

  // Build full date list of month
  const totalDays = start.daysInMonth();
  const attendanceMap = {};


  data.forEach(({ date, status }) => {
    attendanceMap[dayjs(date).format('YYYY-MM-DD')] = status;
  });
// console.log("2");
  const attendance = [];

  for (let i = 1; i <= totalDays; i++) {
    const dateStr = start.date(i).format('YYYY-MM-DD');
    attendance.push({
      date: dateStr,
      status: attendanceMap[dateStr] || 'unmarked'
    });
  }

  return res.json({ attendance });
};





export const markAttendance = async (req, res) => {
  const { date, records } = req.body;

  if (!date || !records || !Array.isArray(records)) {
    return res.status(400).json({ error: "Missing or invalid 'date' or 'records'" });
  }

  const formattedDate = new Date(date).toISOString().split('T')[0]; // yyyy-mm-dd

  const upserts = records.map((record) => ({
    student_id: record.student_id,
    date: formattedDate,
    status: record.status,
  }));

  const { error } = await supabase
    .from("attendance")
    .upsert(upserts, { onConflict: ['student_id', 'date'] });

  if (error) {
    console.log(error);
    
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: "Attendance marked successfully" });
};