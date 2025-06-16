import bcrypt from "bcryptjs";
import supabase from "../config/SupabaseClient.js";
import jwt from "jsonwebtoken";

export const updateStudentProfile = async (req, res) => {
  const studentId = req.user.id;
  const { name, email, mobile, password } = req.body;

  try {
    let updateData = { name, email, mobile };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password_hash = hashedPassword;
    }

    const { data, error } = await supabase
      .from("Users") // Replace with your actual table name if different
      .update(updateData)
      .eq("id", studentId)
      .select("id, name, email, mobile, role"); // Select only what you need

    if (error) {
      return res
        .status(500)
        .json({ message: "Error updating profile", error: error.message });
    }

    res.json({
      message: "Profile updated successfully",
      user: data[0],
    });
  } catch (err) {
    console.error("Update Error:", err); // Log full error to terminal
    return res.status(500).json({
      message: "Error updating profile",
      error: err.message || "Unknown error",
    });
  }
};
