"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function AllotmentPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/allotment")
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p className="p-6">Loading allotment details...</p>

  if (!data) return <p className="p-6">No data available</p>

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <Button variant="ghost" onClick={() => router.push("/apply")} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Application
      </Button>

      <h1 className="text-3xl font-bold text-gray-800">Allotment Details</h1>

      <Card>
        <CardHeader>
          <CardTitle>Room Allotment</CardTitle>
          <CardDescription>Your hostel allotment details are shown below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Name:</strong> {data.studentName}</div>
            <div><strong>ID:</strong> {data.studentId}</div>
            <div><strong>Hostel:</strong> {data.hostelName}</div>
            <div><strong>Room:</strong> {data.roomNumber}</div>
            <div><strong>Floor:</strong> {data.floor}</div>
            <div><strong>Room Type:</strong> {data.roomType}</div>
            <div><strong>Allotment Date:</strong> {data.allotmentDate}</div>
            <div><strong>Valid Until:</strong> {data.validUntil}</div>
            <div><strong>Status:</strong> <Badge>{data.status}</Badge></div>
          </div>

          <hr />
          <h3 className="text-lg font-semibold">Roommates</h3>
          {data.roommates.map((r, i) => (
            <div key={i} className="border p-4 rounded-md">
              <p><strong>Name:</strong> {r.name}</p>
              <p><strong>ID:</strong> {r.studentId}</p>
              <p><strong>Course:</strong> {r.course}</p>
              <p><strong>Year:</strong> {r.year}</p>
            </div>
          ))}

          <hr />
          <h3 className="text-lg font-semibold">Facilities</h3>
          <ul className="list-disc ml-6">
            {data.facilities.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <hr />
          <h3 className="text-lg font-semibold">Warden Info</h3>
          <p><strong>Name:</strong> {data.warden}</p>
          <p><strong>Contact:</strong> {data.wardenContact}</p>
        </CardContent>
      </Card>
    </div>
  )
}
