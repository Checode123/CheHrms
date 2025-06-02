"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Calendar, Bell, Download, Eye } from "lucide-react"
import { useState } from "react"

const notices = [
  {
    id: 1,
    title: "Hostel Fee Payment Deadline Extended",
    content:
      "The deadline for hostel fee payment has been extended to June 30, 2024. Students are requested to clear their dues before the new deadline to avoid late fees.",
    date: "2024-06-01",
    category: "Fee",
    priority: "High",
    author: "Accounts Department",
    attachments: ["fee_notice.pdf"],
  },
  {
    id: 2,
    title: "Mess Menu Changes - June 2024",
    content:
      "New mess menu has been introduced from June 1st, 2024. The menu includes more variety and healthy options. Please check the notice board for detailed menu.",
    date: "2024-05-30",
    category: "Mess",
    priority: "Medium",
    author: "Mess Committee",
    attachments: ["june_menu.pdf"],
  },
  {
    id: 3,
    title: "WiFi Maintenance Schedule",
    content:
      "WiFi services will be temporarily unavailable on June 5th, 2024 from 2:00 AM to 6:00 AM due to scheduled maintenance. We apologize for any inconvenience.",
    date: "2024-05-28",
    category: "Technical",
    priority: "Medium",
    author: "IT Department",
    attachments: [],
  },
  {
    id: 4,
    title: "Room Inspection Notice",
    content:
      "Monthly room inspection will be conducted from June 10-12, 2024. Students are requested to keep their rooms clean and organized. Any violations will be reported.",
    date: "2024-05-25",
    category: "General",
    priority: "Low",
    author: "Hostel Administration",
    attachments: ["inspection_guidelines.pdf"],
  },
  {
    id: 5,
    title: "Summer Vacation Guidelines",
    content:
      "Students planning to stay during summer vacation must register by June 15th, 2024. Special arrangements for mess and security will be made for registered students.",
    date: "2024-05-20",
    category: "General",
    priority: "High",
    author: "Hostel Administration",
    attachments: ["vacation_form.pdf"],
  },
  {
    id: 6,
    title: "New Security Measures",
    content:
      "Enhanced security measures have been implemented including CCTV monitoring and visitor registration. All students must carry their ID cards at all times.",
    date: "2024-05-15",
    category: "Security",
    priority: "High",
    author: "Security Department",
    attachments: [],
  },
]

export default function NoticesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Fee", "Mess", "Technical", "General", "Security"]

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || notice.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Fee":
        return "bg-blue-100 text-blue-800"
      case "Mess":
        return "bg-green-100 text-green-800"
      case "Technical":
        return "bg-purple-100 text-purple-800"
      case "Security":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Notices</h1>
          <p className="text-gray-600 mt-1">Read important notices and updates from hostel authorities</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6 bg-white border-gray-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : "border-gray-300"}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notices List */}
        <div className="space-y-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <Card key={notice.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Bell className="h-4 w-4 text-blue-600" />
                        <CardTitle className="text-lg text-gray-900">{notice.title}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{notice.date}</span>
                        </div>
                        <span>•</span>
                        <span>{notice.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(notice.category)}>{notice.category}</Badge>
                      <Badge className={getPriorityColor(notice.priority)}>{notice.priority}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700 mb-4 leading-relaxed">{notice.content}</p>

                  {notice.attachments.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments:</h4>
                      <div className="flex flex-wrap gap-2">
                        {notice.attachments.map((attachment, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-1 border-gray-200 hover:bg-gray-50"
                          >
                            <Download className="h-3 w-3" />
                            <span>{attachment}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end mt-4">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      <Eye className="h-4 w-4 mr-1" />
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-center">No notices found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
