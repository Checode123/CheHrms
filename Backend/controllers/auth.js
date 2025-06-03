import supabase from "../config/supabaseClient.js";

// export const registerStudent = async (req, res) => {
//   const { student_id, name, email, mobile,role, password, confirmPassword } = req.body

//   if (password !== confirmPassword)
//     return res.status(400).json({ error: 'Passwords do not match' })

//   const hashedPassword = await bcrypt.hash(password, 10)

//   // Send OTP
// //   try {
// //     await sendOTP(mobile, otp)

// //     // Store in OTP_Verification Table
// //     await supabase.from('OTP_Verification').insert([
// //       {
// //         user_id: student_id,
// //         mobile_number: mobile,
// //         otp_code: otp,
// //         is_verified: false
// //       }
// //     ])

// //     // Temporarily store user in session or memory (if needed)
// //     res.status(200).json({ message: 'OTP sent. Verify to complete registration.' })
// //   } catch (err) {
// //     res.status(500).json({ error: 'Failed to send OTP' })
// //   }
// }

import bcrypt from "bcrypt";

export const registerStudent = async (req, res) => {
  try {
    const { user_id, name, email, mobile, password, confirmPassword , role} =
      req.body;

    if (!user_id || !name || !email || !mobile || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error, status } = await supabase //status for debug only.
      .from("users")
      .insert([
        {
          user_id,
          name,
          email,
          mobile,
          role,
          password_hash: hashedPassword,
        },
      ])
      .select(); // this fetches the newly inserted row

    console.log("Status:", status); //debug
    console.log("Data:", data); //debug
    console.log("Error:", error); //debug

    if (error) {
      console.log(error);

      return res.status(404).json({ message: "there is an error" });
    }

    res.status(201).json({ message: "Student registered successfully", data });
  } catch (err) {
    // res.status(500).json({ error: 'Server error' });
    console.log(err);

    res.status(500).json({ err });
  }
};

export const loginUser = async (req, res) => {
  const { user_id, password } = req.body;

  if (!user_id || !password) {
    return res
      .status(400)
      .json({ message: "user_id and password are required" });
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.log(error);

    return res.status(404).json({ message: "there is an error" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!user || !isPasswordValid) {
    return res.status(401).json({ message: "Invalid user_id or password" });
  }

  //  generate a session token here using JWT

  return res.status(200).json({
    message: "Login successful",
    user: {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
