// File: /pages/api/apply.js  (or /app/api/apply/route.js if using Next.js 13 app router)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { name, studentId, course, year, reason } = JSON.parse(req.body)

    // Basic validation
    if (!name || !studentId || !course || !year || !reason) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Here you would save the data to a database, e.g.:
    // await db.collection('applications').insertOne({ name, studentId, course, year, reason, appliedAt: new Date() })

    // For demo, just echo back the received data:
    return res.status(200).json({ message: 'Application received', data: { name, studentId, course, year, reason } })
  } catch (error) {
    console.error('Error processing application:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
