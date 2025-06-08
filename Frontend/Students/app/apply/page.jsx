"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function HostelApplication() {
  // Form state
  const [name, setName] = useState("")
  const [studentId, setStudentId] = useState("")
  const [course, setCourse] = useState("")
  const [year, setYear] = useState("")
  const [reason, setReason] = useState("")

  // UI state
  const [loading, setLoading] = useState(false) // for submit or fetch
  const [showAllotment, setShowAllotment] = useState(false)
  const [data, setData] = useState(null)

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // You can uncomment and use this to POST form data to your backend API:
      // await fetch("/api/apply", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name, studentId, course, year, reason }),
      // })

      // After submission, fetch allotment details:
      const res = await fetch("/api/allotment")
      const json = await res.json()
      setData(json)
      setShowAllotment(true)
    } catch (err) {
      console.error("Failed to submit application or fetch allotment")
    } finally {
      setLoading(false)
    }
  }

  // Handle "Back to Application" button click
  const handleBack = () => {
    setShowAllotment(false)
    setData(null)
  }

  if (showAllotment) {
    // Show allotment details
    if (loading) return <p className="p-6">Loading allotment details...</p>
    if (!data) return <p className="p-6">No allotment data available.</p>

    return (
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
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

  // Show application form
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hostel Application Form</h1>
      <Card>
        <CardHeader>
          <CardTitle>Apply for Hostel</CardTitle>
          <CardDescription>Fill in your details to apply</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="studentId">Student ID</Label>
                <Input id="studentId" value={studentId} onChange={e => setStudentId(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="course">Course</Label>
                <Input id="course" value={course} onChange={e => setCourse(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Select value={year} onValueChange={setYear} required>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st</SelectItem>
                    <SelectItem value="2nd">2nd</SelectItem>
                    <SelectItem value="3rd">3rd</SelectItem>
                    <SelectItem value="4th">4th</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  rows={4}
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
