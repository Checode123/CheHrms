import supabase from "../config/supabaseClient.js";

export const addNotice = async (req, res) => {
  try {
    const { title, message, posted_by } = req.body;

    if (!title || !message || !posted_by) {
      return res
        .status(400)
        .json({ error: "Title, message, and posted_by are required." });
    }

    // const date_posted = new Date().toISOString();
    const now = new Date();

    const time = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const date = now.toLocaleDateString("en-GB");

    const date_posted = `${time} - ${date}`;

    const { data, error } = await supabase
      .from("notices")
      .insert([{ title, message, posted_by, date_posted }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({
      message: "Notice added successfully",
      data,
    });
  } catch (err) {
    console.error("Unexpected error in addNotice:", err);
    return res.status(500).json({ error: "Unexpected server error occurred." });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Notice ID is required" });
    }

    const { data, error } = await supabase
      .from("notices")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return res
        .status(500)
        .json({ message: "Failed to delete notice", error });
    }

    if (!data || data.length === 0) {
  return res.status(404).json({ message: "Notice not found or already deleted" });
}

    res.status(200).json({ message: "Notice deleted successfully", data });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Failed to delete notice", err });
  }
};




// this is a get request
export const getAllNotices = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Error:", error);
      return res.status(500).json({ message: "Failed to fetch notices", error });
    }

   

    res.status(200).json({ message: "Notices fetched successfully", data });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server error", err });
  }
};

