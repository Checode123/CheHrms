// controllers/warden.js
import supabase from "../config/SupabaseClient.js";

//To fetch all allotments from the DB
export const getAllAllotments = async (req, res) => {
  try {
    const { data, error } = await supabase.from("hostelallotments").select("*");

    if (error)
      return res
        .status(500)
        .json({ error: "Error fetching allotments", details: error });

    return res.status(200).json({ allotments: data });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};

//To fetch allotments of a particular student from DB
export const getStudentAllotment = async (req, res) => {
  const { student_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("hostelallotments")
      .select("*")
      .eq("student_id", student_id)
      .single();

    if (error)
      return res
        .status(404)
        .json({ error: "Allotment not found", details: error });

    return res.status(200).json({ allotment: data });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};

//To display student data with searching
export const getAllStudents = async (req, res) => {
  try {
    const { name } = req.query;

    let query = supabase
      .from('users')
      .select('user_id, name, email, mobile')
      .eq('role', 'student');

    if (name) {
      query = query.ilike('name', `%${name}%`); 
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch students', details: error });
    }

    return res.status(200).json({ students: data });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
};

