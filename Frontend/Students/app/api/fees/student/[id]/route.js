import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  try {
    // Mock fee data
    const feeData = {
      feeDetails: [
        { id: 1, description: "Hostel Room Rent", amount: 25000, dueDate: "2024-06-15", status: "Pending" },
        { id: 2, description: "Mess Charges", amount: 15000, dueDate: "2024-06-15", status: "Pending" },
        { id: 3, description: "Electricity Charges", amount: 5000, dueDate: "2024-06-15", status: "Pending" },
        { id: 4, description: "Internet Charges", amount: 2000, dueDate: "2024-06-15", status: "Pending" },
      ],
      totalAmount: 47000,
      paymentHistory: [
        {
          id: 1,
          description: "Hostel Fee - Previous Semester",
          amount: 45000,
          date: "2024-01-10",
          receiptNo: "HF24010001",
        },
        { id: 2, description: "Late Fee", amount: 1000, date: "2024-01-15", receiptNo: "LF24010015" },
      ],
    }

    return NextResponse.json(feeData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch fee data" }, { status: 500 })
  }
}
