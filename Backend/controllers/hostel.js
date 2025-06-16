import supabase from "../config/SupabaseClient.js";

export const applyForHostel = async (req, res) => {
  const { student_id, preferred_hostel } = req.body;

  if (!req.body || !req.body.student_id || !req.body.preferred_hostel) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { data, error } = await supabase.from("hostelapplications").insert([
    {
      student_id,
      preferred_hostel,
      applied_on: new Date().toISOString(),
      status: "pending",
    },
  ]);

  if (error) {
    return res.status(500).json({ error: "Failed to apply", details: error });
  }

  res.status(201).json({ message: "Application submitted", data });
};

export const getAllHostelApplications = async (req, res) => {
  try {
    const { data, error } = await supabase.from("hostelapplications").select(`
    student_id,
    applied_on,
    status,
    preferred_hostel,
    users (
      name
    )
  `);
    if (error) {
      return res
        .status(500)
        .json({ error: "Failed to fetch applications", details: error });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { student_id, new_status } = req.body;

    const { data, error } = await supabase
      .from("hostelapplications")
      .update({ status: new_status })
      .eq("student_id", student_id)
      .select();

    if (error) {
      return res
        .status(500)
        .json({ error: "Failed to update status", details: error });
    }

    return res
      .status(200)
      .json({ message: "Status updated successfully", data });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};

export const withdrawApplication = async (req, res) => {
  const { student_id } = req.params;
  try {
    const { error } = await supabase
      .from("hostelapplications")
      .delete()
      .eq("student_id", student_id);

    if (error) throw error;

    res.status(200).json({ message: "Application withdrawn successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to withdraw application", details: error });
  }
};

export const viewApplicationStatus = async (req, res) => {
  const { student_id } = req.params;
  try {
    const { data, error } = await supabase
      .from("hostelapplications")
      .select("student_id, status, applied_on") // only existing columns
      .eq("student_id", student_id);

    if (error || !data || data.length === 0) throw error;

    res.status(200).json({ student_id, applications: data });
  } catch (error) {
    res.status(404).json({ error: "Application not found", details: error });
  }
};

export const listAllHostels = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('hostels')
      .select('hostel_id, name, type, total_capacity, current_occupancy');

    if (error) throw error;

    const availableHostels = data.map(hostel => ({
      ...hostel,
      available_seats: hostel.total_capacity - hostel.current_occupancy
    }));

    res.status(200).json({ hostels: availableHostels });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to fetch hostels',
      details: err.message,
    });
  }
};
