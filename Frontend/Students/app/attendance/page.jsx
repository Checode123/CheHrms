"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
  isSameMonth,
  isToday,
} from "date-fns"

// Sample attendance data
const attendanceData = {
  "2024-06-01": "present",
  "2024-06-02": "present",
  "2024-06-03": "present",
  "2024-06-04": "absent",
  "2024-06-05": "present",
  "2024-06-06": "present",
  "2024-06-07": "leave",
  "2024-06-08": "present",
  "2024-06-09": "present",
  "2024-06-10": "present",
  "2024-06-11": "present",
  "2024-06-12": "absent",
  "2024-06-13": "present",
  "2024-06-14": "present",
  "2024-06-15": "present",
  "2024-06-16": "present",
  "2024-06-17": "leave",
  "2024-06-18": "leave",
  "2024-06-19": "present",
  "2024-06-20": "present",
  "2024-06-21": "present",
  "2024-06-22": "present",
  "2024-06-23": "present",
  "2024-06-24": "absent",
  "2024-06-25": "present",
  "2024-06-26": "present",
  "2024-06-27": "present",
  "2024-06-28": "present",
  "2024-06-29": "present",
  "2024-06-30": "present",
}

// Sample monthly summary data
const monthlySummary = [
  { month: "January", present: 28, absent: 2, leave: 1, percentage: "90.3%" },
  { month: "February", present: 25, absent: 3, leave: 0, percentage: "89.3%" },
  { month: "March", present: 29, absent: 1, leave: 1, percentage: "93.5%" },
  { month: "April", present: 27, absent: 2, leave: 1, percentage: "90.0%" },
  { month: "May", present: 30, absent: 1, leave: 0, percentage: "96.8%" },
  { month: "June", present: 25, absent: 3, leave: 2, percentage: "83.3%" },
]

// Sample yearly summary data
const yearlySummary = {
  totalDays: 365,
  presentDays: 320,
  absentDays: 25,
  leaveDays: 20,
  percentage: "87.7%",
}

export default function AttendancePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedMonth, setSelectedMonth] = useState("June")

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const startingDayOfWeek = getDay(monthStart)

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const getAttendanceStatus = (date) => {
    const dateString = format(date, "yyyy-MM-dd")
    return attendanceData[dateString] || null
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-500"
      case "absent":
        return "bg-red-500"
      case "leave":
        return "bg-amber-500"
      default:
        return "bg-gray-200"
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Present</Badge>
      case "absent":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Absent</Badge>
      case "leave":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Leave</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Calculate current month stats
  const currentMonthStats = {
    present: Object.values(attendanceData).filter((status) => status === "present").length,
    absent: Object.values(attendanceData).filter((status) => status === "absent").length,
    leave: Object.values(attendanceData).filter((status) => status === "leave").length,
    total: Object.keys(attendanceData).length,
  }

  const attendancePercentage = ((currentMonthStats.present / currentMonthStats.total) * 100).toFixed(1)

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
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600 mt-1">View your attendance records and statistics</p>
        </div>

        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="daily" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Daily View
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Monthly Summary
            </TabsTrigger>
            <TabsTrigger value="yearly" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Yearly Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Calendar View */}
              <Card className="md:col-span-2 bg-white border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900 flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-blue-600" />
                      {format(currentDate, "MMMM yyyy")}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={previousMonth} className="h-8 w-8 border-gray-200">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8 border-gray-200">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Day headers */}
                    {daysOfWeek.map((day) => (
                      <div key={day} className="text-center py-2 text-sm font-medium text-gray-600">
                        {day}
                      </div>
                    ))}

                    {/* Empty cells for days before the start of the month */}
                    {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                      <div key={`empty-${index}`} className="h-12 p-1"></div>
                    ))}

                    {/* Calendar days */}
                    {monthDays.map((day) => {
                      const dateString = format(day, "yyyy-MM-dd")
                      const status = getAttendanceStatus(day)

                      return (
                        <div
                          key={dateString}
                          className={`h-12 p-1 relative border border-gray-100 rounded-md ${
                            isToday(day) ? "bg-blue-50 border-blue-200" : ""
                          } ${!isSameMonth(day, currentDate) ? "opacity-50" : ""}`}
                        >
                          <div className="flex flex-col h-full">
                            <span className={`text-xs ${isToday(day) ? "font-bold text-blue-700" : "text-gray-700"}`}>
                              {format(day, "d")}
                            </span>
                            {status && (
                              <div className="flex justify-center items-center mt-1">
                                <div className={`h-3 w-3 rounded-full ${getStatusColor(status)}`}></div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-center space-x-6 mt-6">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-600">Present</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-600">Absent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm text-gray-600">Leave</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Monthly Statistics</CardTitle>
                  <CardDescription className="text-gray-600">
                    Your attendance for {format(currentDate, "MMMM yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Attendance Percentage */}
                  <div className="flex flex-col items-center">
                    <div className="relative h-32 w-32">
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-200"
                          strokeWidth="10"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className="text-blue-600"
                          strokeWidth="10"
                          strokeDasharray={`${Number.parseInt(attendancePercentage) * 2.51}, 251`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">{attendancePercentage}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Attendance Rate</p>
                  </div>

                  {/* Stats Breakdown */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <p className="text-xl font-bold text-green-700">{currentMonthStats.present}</p>
                      <p className="text-xs text-gray-600">Present</p>
                    </div>
                    <div className="p-2 bg-red-50 rounded-lg">
                      <p className="text-xl font-bold text-red-700">{currentMonthStats.absent}</p>
                      <p className="text-xs text-gray-600">Absent</p>
                    </div>
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <p className="text-xl font-bold text-amber-700">{currentMonthStats.leave}</p>
                      <p className="text-xs text-gray-600">Leave</p>
                    </div>
                  </div>

                  {/* Recent Status */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Recent Status</h4>
                    {Object.entries(attendanceData)
                      .slice(-3)
                      .map(([date, status]) => (
                        <div key={date} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">{date}</span>
                          {getStatusBadge(status)}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">Monthly Summary</CardTitle>
                    <CardDescription className="text-gray-600">
                      View your attendance summary for each month
                    </CardDescription>
                  </div>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[180px] border-gray-200">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {monthlySummary.map((month) => (
                        <SelectItem key={month.month} value={month.month}>
                          {month.month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Month</th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Present Days</th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Absent Days</th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Leave Days</th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Attendance %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlySummary.map((month) => (
                        <tr
                          key={month.month}
                          className={`border-b border-gray-100 hover:bg-gray-50 ${
                            month.month === selectedMonth ? "bg-blue-50" : ""
                          }`}
                        >
                          <td className="py-3 px-4 text-sm text-gray-900 font-medium">{month.month}</td>
                          <td className="py-3 px-4 text-center text-sm text-green-700">{month.present}</td>
                          <td className="py-3 px-4 text-center text-sm text-red-700">{month.absent}</td>
                          <td className="py-3 px-4 text-center text-sm text-amber-700">{month.leave}</td>
                          <td className="py-3 px-4 text-center text-sm text-blue-700 font-medium">
                            {month.percentage}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Monthly Chart */}
                <div className="mt-8">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Attendance Trend</h4>
                  <div className="h-64 flex items-end space-x-2">
                    {monthlySummary.map((month) => {
                      const percentage = Number.parseFloat(month.percentage)
                      return (
                        <div key={month.month} className="flex-1 flex flex-col items-center">
                          <div
                            className={`w-full rounded-t-md ${
                              month.month === selectedMonth ? "bg-blue-600" : "bg-blue-400"
                            }`}
                            style={{ height: `${percentage}%` }}
                          ></div>
                          <span className="text-xs text-gray-600 mt-2">{month.month.substring(0, 3)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="yearly">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Yearly Overview</CardTitle>
                <CardDescription className="text-gray-600">
                  Your attendance summary for the academic year 2023-2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Yearly Stats */}
                  <div className="space-y-6">
                    <div className="flex flex-col items-center">
                      <div className="relative h-40 w-40">
                        <svg className="h-full w-full" viewBox="0 0 100 100">
                          <circle
                            className="text-gray-200"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="text-blue-600"
                            strokeWidth="10"
                            strokeDasharray={`${Number.parseFloat(yearlySummary.percentage) * 2.51}, 251`}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <span className="text-3xl font-bold text-gray-900">{yearlySummary.percentage}</span>
                            <p className="text-sm text-gray-600">Attendance</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-700">{yearlySummary.presentDays}</p>
                        <p className="text-sm text-gray-600">Present Days</p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-red-700">{yearlySummary.absentDays}</p>
                        <p className="text-sm text-gray-600">Absent Days</p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-amber-700">{yearlySummary.leaveDays}</p>
                        <p className="text-sm text-gray-600">Leave Days</p>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-700">{yearlySummary.totalDays}</p>
                      <p className="text-sm text-gray-600">Total Academic Days</p>
                    </div>
                  </div>

                  {/* Yearly Distribution */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700">Attendance Distribution</h4>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Present</span>
                          <span className="text-gray-700">
                            {Math.round((yearlySummary.presentDays / yearlySummary.totalDays) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(yearlySummary.presentDays / yearlySummary.totalDays) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Absent</span>
                          <span className="text-gray-700">
                            {Math.round((yearlySummary.absentDays / yearlySummary.totalDays) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full"
                            style={{ width: `${(yearlySummary.absentDays / yearlySummary.totalDays) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Leave</span>
                          <span className="text-gray-700">
                            {Math.round((yearlySummary.leaveDays / yearlySummary.totalDays) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-amber-600 h-2 rounded-full"
                            style={{ width: `${(yearlySummary.leaveDays / yearlySummary.totalDays) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Attendance Requirements</h5>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              Number.parseFloat(yearlySummary.percentage) >= 75 ? "bg-green-500" : "bg-red-500"
                            } mr-2`}
                          ></div>
                          Minimum required attendance: 75%
                        </li>
                        <li className="flex items-center">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              Number.parseFloat(yearlySummary.percentage) >= 85 ? "bg-green-500" : "bg-amber-500"
                            } mr-2`}
                          ></div>
                          Good standing attendance: 85%
                        </li>
                        <li className="flex items-center">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              Number.parseFloat(yearlySummary.percentage) >= 95 ? "bg-green-500" : "bg-blue-500"
                            } mr-2`}
                          ></div>
                          Excellent attendance: 95%
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
