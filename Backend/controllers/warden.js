// controllers/warden.js
import supabase from "../config/SupabaseClient.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { sendEmailWithAttachment } from "../utils/emailSender.js";


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



// Generate PDF Allotment Letter

export const generateAllotmentPDF = async (req, res) => {
  const { student_id } = req.params;

  try {
    // Get allotment
    const { data: allotments, error: allotmentError } = await supabase
      .from("hostelallotments")
      .select("*")
      .eq("student_id", student_id);

    if (allotmentError || !allotments || allotments.length === 0) {
      return res.status(404).json({
        error: "Allotment not found",
        details: allotmentError || "No allotment data found for student",
      });
    }

    const allotment = allotments[0];

    // Get student info
    const { data: students, error: studentError } = await supabase
      .from("users")
      .select("name, email")
      .eq("user_id", student_id)
      .limit(1);

    if (studentError || !students || students.length === 0) {
      return res.status(404).json({
        error: "Student not found",
        details: studentError || "No student data found",
      });
    }

    const student = students[0];

    // PDF generation
    const fileName = `${student_id}_allotment_letter.pdf`;
    const filePath = path.join("pdfs", fileName);
    if (!fs.existsSync("pdfs")) fs.mkdirSync("pdfs");

    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(20).text("Hostel Allotment Letter", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`This is to certify that:`);
    doc.moveDown();
    doc.text(`Student Name: ${student?.name || "N/A"}`);
    doc.text(`Student ID: ${student_id}`);
    doc.text(`Email: ${student?.email || "N/A"}`);
    doc.text(`Hostel Name: ${allotment.hostel_name}`);
    doc.text(`Room Number: ${allotment.room_number}`);
    doc.text(`Allotment Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown(2);
    doc.text(`Warden Signature: ______________________`);
    doc.end();

writeStream.on("finish", async () => {
  console.log("PDF generation completed for:", student.email);
      try {
        await sendEmailWithAttachment(
          student.email,
          "Your Hostel Allotment Letter",
          `Hello ${student.name},\n\nPlease find your hostel allotment letter attached.\n\nRegards,\nHostel Management`,
          filePath
        );

        return res.status(200).json({
          message: "PDF generated and email sent successfully",
          url: `/pdfs/${fileName}`,
        });
      } catch (emailErr) {
        return res.status(500).json({
          message: "PDF generated, but failed to send email",
          error: emailErr.message,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
};
