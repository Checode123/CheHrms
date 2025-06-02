"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Building, MapPin, User, Calendar, FileText } from "lucide-react"

const allotmentDetails = {
  studentName: "John Doe",
  studentId: "DU2024001",
  hostelName: "Kamla Nehru Hostel",
  roomNumber: "A-302",
  floor: "3rd Floor",
  roomType: "Double Sharing",
  allotmentDate: "2024-01-15",
  validUntil: "2024-12-31",
  status: "Active",
  warden: "Dr. Priya Sharma",
  wardenContact: "+91 98765 43210",
}

const roommates = [
  {
    name: "Mike Johnson",
    studentId: "DU2024002",
    course: "B.Tech CSE",
    year: "2nd Year",
  },
]

const hostelFacilities = [
  "24/7 Security",
  "WiFi Internet",
  "Mess Facility",
  "Laundry Service",
  "Common Room",
  "Study Hall",
  "Gym",
  "Medical Room",
]

export default function AllotmentPage() {
  const handleDownloadLetter = () => {
    // Simulate download
    alert("Allotment letter download started!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4 hover:bg-gray-100">
            <a href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </a>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Hostel Allotment</h1>
          <p className="text-gray-600 mt-1">View your hostel room allotment details and download the letter</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Allotment Details */}
          <Card className="lg:col-span-2 bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-gray-900">Allotment Details</CardTitle>
                  <CardDescription className="text-gray-600">Your current hostel room assignment</CardDescription>
                </div>
                <Badge
                  className={
                    allotmentDetails.status === "Active"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }
                >
                  {allotmentDetails.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Student Name</p>
                      <p className="font-medium text-gray-900">{allotmentDetails.studentName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Student ID</p>
                      <p className="font-medium text-gray-900">{allotmentDetails.studentId}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Allotment Date</p>
                      <p className="font-medium text-gray-900">{allotmentDetails.allotmentDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Valid Until</p>
                      <p className="font-medium text-gray-900">{allotmentDetails.validUntil}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Room Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-500">Hostel Name</p>
                        <p className="font-medium text-gray-900">{allotmentDetails.hostelName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-500">Room Number</p>
                        <p className="font-medium text-gray-900">{allotmentDetails.roomNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-500">Floor</p>
                        <p className="font-medium text-gray-900">{allotmentDetails.floor}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-500">Room Type</p>
                        <p className="font-medium text-gray-900">{allotmentDetails.roomType}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warden Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Warden Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Warden Name</p>
                      <p className="font-medium text-gray-900">{allotmentDetails.warden}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Contact Number</p>
                      <p className="font-medium text-gray-900">{allotmentDetails.wardenContact}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="border-t pt-6">
                <Button
                  onClick={handleDownloadLetter}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Allotment Letter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Roommates */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Roommates</CardTitle>
                <CardDescription className="text-gray-600">Your current roommates</CardDescription>
              </CardHeader>
              <CardContent>
                {roommates.length > 0 ? (
                  <div className="space-y-4">
                    {roommates.map((roommate, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <p className="font-medium text-gray-900">{roommate.name}</p>
                        <p className="text-sm text-gray-600">{roommate.studentId}</p>
                        <p className="text-sm text-gray-600">{roommate.course}</p>
                        <p className="text-sm text-gray-600">{roommate.year}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">No roommates assigned</p>
                )}
              </CardContent>
            </Card>

            {/* Hostel Facilities */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Hostel Facilities</CardTitle>
                <CardDescription className="text-gray-600">Available amenities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {hostelFacilities.map((facility, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
