// controllers/feedbackController.js
import supabase from "../config/SupabaseClient.js";

export const submitFeedback = async (req, res) => {
  const { student_id, message } = req.body;

  if (!student_id || !message) {
    return res.status(400).json({ error: 'student_id and message are required' });
  }

  const { data, error } = await supabase
    .from('feedbacks')
    .insert([
      {
        student_id,
        message,
        status: 'pending',
      },
    ])
    .select();

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to submit feedback' });
  }

  res.status(201).json({ message: 'Feedback submitted', feedback: data[0] });
};





export const getAllFeedbacks = async (req, res) => {
  const { data, error } = await supabase
    .from('feedbacks')
    .select('*, users(name)') // include student name if needed

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }

  res.status(200).json({ feedbacks: data });
};




export const updateFeedbackStatus = async (req, res) => {
    // this is not student_id, but its uuid (feedback.id)
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'reviewed', 'resolved'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  const { data, error } = await supabase
    .from('feedbacks')
    .update({ status })
    .eq('id', id)
    .select();

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update status' });
  }

  res.status(200).json({ message: 'Feedback status updated', feedback: data[0] });
};
