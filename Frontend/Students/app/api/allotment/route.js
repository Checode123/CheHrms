// app/api/allotment/route.js

export async function GET() {
  try {
    // Ideally, fetch allotment data from a database
    // For demo, return a mock object
    const allotmentData = {
      studentName: "John Doe",
      studentId: "12345",
      hostelName: "Sunrise Hostel",
      roomNumber: "A-101",
      floor: "1st",
      roomType: "Single",
      allotmentDate: "2025-06-01",
      validUntil: "2026-05-31",
      status: "Confirmed",
      roommates: [
        { name: "Jane Smith", studentId: "12346", course: "CS", year: "2nd" },
        { name: "Bob Johnson", studentId: "12347", course: "EE", year: "3rd" },
      ],
      facilities: ["WiFi", "Laundry", "Canteen", "Gym"],
      warden: "Mr. Williams",
      wardenContact: "warden@example.com",
    }

    return new Response(JSON.stringify(allotmentData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to fetch allotment data" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
