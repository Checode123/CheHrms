"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Download,
  Clock,
  Star,
  UtensilsCrossed,
  Calendar,
  DollarSign,
  Bell,
  Phone,
  Mail,
  User,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample data
const weeklyMenu = {
  Monday: {
    breakfast: ["Poha", "Tea/Coffee", "Banana"],
    lunch: ["Rice", "Dal", "Sabzi", "Roti", "Pickle"],
    dinner: ["Roti", "Paneer Curry", "Rice", "Dal", "Salad"],
  },
  Tuesday: {
    breakfast: ["Upma", "Tea/Coffee", "Boiled Eggs"],
    lunch: ["Rice", "Rajma", "Aloo Gobi", "Roti", "Curd"],
    dinner: ["Rice", "Fish Curry", "Roti", "Dal", "Papad"],
  },
  Wednesday: {
    breakfast: ["Paratha", "Curd", "Tea/Coffee", "Pickle"],
    lunch: ["Rice", "Sambar", "Bhindi", "Roti", "Buttermilk"],
    dinner: ["Roti", "Chicken Curry", "Rice", "Dal", "Salad"],
  },
  Thursday: {
    breakfast: ["Idli", "Sambar", "Chutney", "Tea/Coffee"],
    lunch: ["Rice", "Dal", "Cauliflower", "Roti", "Pickle"],
    dinner: ["Roti", "Mutton Curry", "Rice", "Dal", "Raita"],
  },
  Friday: {
    breakfast: ["Dosa", "Sambar", "Chutney", "Tea/Coffee"],
    lunch: ["Rice", "Chole", "Aloo Matar", "Roti", "Lassi"],
    dinner: ["Roti", "Egg Curry", "Rice", "Dal", "Salad"],
  },
  Saturday: {
    breakfast: ["Puri Bhaji", "Tea/Coffee", "Fruits"],
    lunch: ["Biryani", "Raita", "Pickle", "Papad"],
    dinner: ["Roti", "Mixed Veg", "Rice", "Dal", "Sweet"],
  },
  Sunday: {
    breakfast: ["Chole Bhature", "Tea/Coffee", "Lassi"],
    lunch: ["Rice", "Dal Makhani", "Paneer", "Roti", "Ice Cream"],
    dinner: ["Roti", "Special Curry", "Rice", "Dal", "Kheer"],
  },
}

const messTimings = [
  { meal: "Breakfast", time: "7:30 AM – 9:00 AM", icon: "🌅" },
  { meal: "Lunch", time: "12:30 PM – 2:00 PM", icon: "☀️" },
  { meal: "Dinner", time: "7:00 PM – 9:00 PM", icon: "🌙" },
]

const messCharges = {
  monthly: 4500,
  security: 1000,
  total: 5500,
  paid: 4500,
  pending: 1000,
  dueDate: "2024-06-30",
}

const messCommittee = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Mess In-charge",
    email: "rajesh.kumar@university.edu",
    phone: "+91 98765 43210",
  },
  {
    name: "Prof. Priya Sharma",
    role: "Warden",
    email: "priya.sharma@university.edu",
    phone: "+91 98765 43211",
  },
  {
    name: "Amit Singh",
    role: "Student Representative",
    email: "amit.singh@student.edu",
    phone: "+91 98765 43212",
  },
]

const announcements = [
  {
    id: 1,
    title: "Special Dinner on Independence Day",
    message: "Special Indian cuisine will be served on August 15th. Menu includes Biryani, Sweets, and more!",
    date: "2024-06-01",
    priority: "high",
  },
  {
    id: 2,
    title: "Mess Closed for Maintenance",
    message: "Mess will be closed on June 10th from 2 PM to 6 PM for deep cleaning and maintenance.",
    date: "2024-05-28",
    priority: "medium",
  },
  {
    id: 3,
    title: "New Breakfast Timings",
    message: "Breakfast timings have been extended till 9:30 AM from Monday onwards.",
    date: "2024-05-25",
    priority: "low",
  },
]

export default function MessPage() {
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [attendanceToday, setAttendanceToday] = useState({
    breakfast: false,
    lunch: true,
    dinner: true,
  })
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)
  const [selectedMess, setSelectedMess] = useState("Main Mess")
  const { toast } = useToast()

  const handleAttendanceChange = (meal, value) => {
    setAttendanceToday((prev) => ({ ...prev, [meal]: value }))
    toast({
      title: `${meal} ${value ? "booked" : "cancelled"}`,
      description: `You have ${value ? "opted in for" : "opted out of"} today's ${meal}`,
    })
  }

  const handleFeedbackSubmit = () => {
    if (!feedback.trim() || rating === 0) {
      toast({
        title: "Incomplete feedback",
        description: "Please provide both rating and comment",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback. It helps us improve our service.",
    })
    setFeedback("")
    setRating(0)
  }

  const handleDownloadMenu = () => {
    toast({
      title: "Download started",
      description: "Weekly menu PDF is being downloaded",
    })
  }

  const handlePayment = () => {
    toast({
      title: "Redirecting to payment",
      description: "You will be redirected to the payment gateway",
    })
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
          <h1 className="text-3xl font-bold text-gray-900">Mess Management</h1>
          <p className="text-gray-600 mt-1">Manage your mess preferences, view menu, and track attendance</p>
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="menu" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              📋 Menu
            </TabsTrigger>
            <TabsTrigger value="timings" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              🕐 Timings
            </TabsTrigger>
            <TabsTrigger
              value="attendance"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              🍽️ Booking
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              📊 Feedback
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              📈 Billing
            </TabsTrigger>
            <TabsTrigger value="notices" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              💬 Notices
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              🛠️ Contact
            </TabsTrigger>
          </TabsList>

          {/* Menu Tab */}
          <TabsContent value="menu">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl text-gray-900 flex items-center">
                      <UtensilsCrossed className="h-5 w-5 mr-2 text-blue-600" />
                      Weekly Menu
                    </CardTitle>
                    <CardDescription className="text-gray-600">View daily meal plans for the week</CardDescription>
                  </div>
                  <Button onClick={handleDownloadMenu} variant="outline" className="border-gray-200">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger className="w-full border-gray-300">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(weeklyMenu).map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["breakfast", "lunch", "dinner"].map((meal) => (
                      <Card key={meal} className="border border-gray-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg capitalize text-gray-900 flex items-center">
                            {meal === "breakfast" && "🌅"}
                            {meal === "lunch" && "☀️"}
                            {meal === "dinner" && "🌙"}
                            <span className="ml-2">{meal}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {weeklyMenu[selectedDay][meal].map((item, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Weekly Overview */}
                  <Card className="border border-gray-200 mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">Weekly Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-7 gap-2">
                        {Object.keys(weeklyMenu).map((day) => (
                          <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`p-3 rounded-lg border transition-all ${
                              selectedDay === day
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className="text-xs font-medium">{day.substring(0, 3)}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {weeklyMenu[day].breakfast.length +
                                weeklyMenu[day].lunch.length +
                                weeklyMenu[day].dinner.length}{" "}
                              items
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timings Tab */}
          <TabsContent value="timings">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Mess Timings
                </CardTitle>
                <CardDescription className="text-gray-600">Meal serving times and guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messTimings.map((timing, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{timing.icon}</span>
                            <div>
                              <h3 className="font-medium text-gray-900">{timing.meal}</h3>
                              <p className="text-sm text-gray-600">Serving time</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{timing.time}</p>
                            <p className="text-sm text-gray-600">Daily</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Important Guidelines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-900">Entry Policy</h4>
                            <p className="text-sm text-blue-700 mt-1">
                              Entry is allowed 15 minutes before and after the scheduled time
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-900">ID Card Required</h4>
                            <p className="text-sm text-green-700 mt-1">Student ID card is mandatory for mess entry</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-orange-200 bg-orange-50">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-orange-900">Late Entry</h4>
                            <p className="text-sm text-orange-700 mt-1">
                              Late entry may result in limited food options
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-purple-200 bg-purple-50">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-purple-900">Guest Policy</h4>
                            <p className="text-sm text-purple-700 mt-1">
                              Guests allowed with prior permission and payment
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance/Booking Tab */}
          <TabsContent value="attendance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Today's Meal Booking
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Opt in/out for today's meals to help reduce food waste
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["breakfast", "lunch", "dinner"].map((meal) => (
                    <div key={meal} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">
                          {meal === "breakfast" && "🌅"}
                          {meal === "lunch" && "☀️"}
                          {meal === "dinner" && "🌙"}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900 capitalize">{meal}</p>
                          <p className="text-sm text-gray-600">
                            {messTimings.find((t) => t.meal.toLowerCase() === meal)?.time}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={attendanceToday[meal]}
                        onCheckedChange={(value) => handleAttendanceChange(meal, value)}
                      />
                    </div>
                  ))}

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">Booking Summary</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          You are booked for {Object.values(attendanceToday).filter(Boolean).length} meal(s) today
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Monthly Attendance</CardTitle>
                  <CardDescription className="text-gray-600">Your mess attendance history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-700">85%</p>
                        <p className="text-sm text-gray-600">Breakfast</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-700">92%</p>
                        <p className="text-sm text-gray-600">Lunch</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-700">78%</p>
                        <p className="text-sm text-gray-600">Dinner</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Recent Activity</h4>
                      <div className="space-y-2">
                        {[
                          { date: "Today", meals: ["Lunch", "Dinner"], status: "booked" },
                          { date: "Yesterday", meals: ["Breakfast", "Lunch", "Dinner"], status: "attended" },
                          { date: "June 1", meals: ["Lunch", "Dinner"], status: "attended" },
                          { date: "May 31", meals: ["Breakfast", "Lunch"], status: "attended" },
                        ].map((day, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-900">{day.date}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">{day.meals.join(", ")}</span>
                              <Badge
                                variant={day.status === "attended" ? "default" : "outline"}
                                className={
                                  day.status === "attended"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }
                              >
                                {day.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-blue-600" />
                    Submit Feedback
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Rate your mess experience and share suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Overall Rating</Label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`p-1 rounded ${
                            star <= rating ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"
                          }`}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{rating > 0 && `${rating}/5`}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback">Your Feedback</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Share your thoughts about food quality, service, cleanliness, or suggestions for improvement..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="min-h-[120px] border-gray-300"
                    />
                  </div>

                  <Button onClick={handleFeedbackSubmit} className="w-full bg-blue-600 hover:bg-blue-700">
                    Submit Feedback
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Mess Ratings</CardTitle>
                  <CardDescription className="text-gray-600">Average ratings from all students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">4.2</div>
                      <div className="flex items-center justify-center space-x-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${star <= 4 ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Based on 1,234 reviews</p>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      {[
                        { category: "Food Quality", rating: 4.3, color: "bg-green-500" },
                        { category: "Service", rating: 4.1, color: "bg-blue-500" },
                        { category: "Cleanliness", rating: 4.0, color: "bg-purple-500" },
                        { category: "Variety", rating: 3.8, color: "bg-orange-500" },
                      ].map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">{item.category}</span>
                            <span className="text-gray-700">{item.rating}/5</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${(item.rating / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Recent Feedback</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {[
                          { user: "Anonymous", comment: "Food quality has improved significantly!", rating: 5 },
                          { user: "Student", comment: "More variety in breakfast needed", rating: 3 },
                          { user: "Anonymous", comment: "Excellent service by mess staff", rating: 5 },
                        ].map((review, index) => (
                          <div key={index} className="p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-700">{review.user}</span>
                              <div className="flex items-center">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-gray-600">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                    Mess Charges
                  </CardTitle>
                  <CardDescription className="text-gray-600">Current month billing details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Monthly Mess Fee</span>
                      <span className="font-medium text-gray-900">₹{messCharges.monthly.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Security Deposit</span>
                      <span className="font-medium text-gray-900">₹{messCharges.security.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-900">Total Amount</span>
                      <span className="font-bold text-blue-900">₹{messCharges.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Amount Paid</span>
                      <span className="font-medium text-green-600">₹{messCharges.paid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Pending Amount</span>
                      <span className="font-medium text-red-600">₹{messCharges.pending.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Due Date</span>
                      <span className="font-medium text-gray-900">{messCharges.dueDate}</span>
                    </div>
                  </div>

                  {messCharges.pending > 0 && (
                    <Button onClick={handlePayment} className="w-full bg-blue-600 hover:bg-blue-700">
                      Pay Pending Amount
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Payment History</CardTitle>
                  <CardDescription className="text-gray-600">Your mess payment records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: "2024-05-01", amount: 4500, status: "Paid", receipt: "MSS240501" },
                      { date: "2024-04-01", amount: 4500, status: "Paid", receipt: "MSS240401" },
                      { date: "2024-03-01", amount: 4500, status: "Paid", receipt: "MSS240301" },
                      { date: "2024-02-01", amount: 4500, status: "Paid", receipt: "MSS240201" },
                    ].map((payment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{payment.date}</p>
                          <p className="text-sm text-gray-600">Receipt: {payment.receipt}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">₹{payment.amount.toLocaleString()}</p>
                          <Badge className="bg-green-100 text-green-800">{payment.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-4 border-gray-200">
                    <Download className="h-4 w-4 mr-2" />
                    Download Payment History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notices Tab */}
          <TabsContent value="notices">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-blue-600" />
                  Mess Announcements
                </CardTitle>
                <CardDescription className="text-gray-600">Important updates and notices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <Card key={announcement.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                          <Badge
                            className={
                              announcement.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : announcement.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {announcement.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-2">{announcement.message}</p>
                        <p className="text-sm text-gray-500">{announcement.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-blue-600" />
                    Mess Committee
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Contact information for mess-related queries
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {messCommittee.map((member, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{member.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Mail className="h-3 w-3 text-gray-400" />
                                <span className="text-sm text-gray-600">{member.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="h-3 w-3 text-gray-400" />
                                <span className="text-sm text-gray-600">{member.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Switch Mess</CardTitle>
                  <CardDescription className="text-gray-600">
                    Change your mess preference (monthly basis)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mess-selection">Select Mess</Label>
                    <Select value={selectedMess} onValueChange={setSelectedMess}>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Choose your mess" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Main Mess">Main Mess (North Campus)</SelectItem>
                        <SelectItem value="Annexe Mess">Annexe Mess (South Campus)</SelectItem>
                        <SelectItem value="Special Mess">Special Mess (Vegetarian Only)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Important Note</p>
                        <p className="text-sm text-yellow-700">
                          Mess changes are effective from the 1st of next month. Deadline: 25th of current month.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Change</Label>
                    <Textarea
                      id="reason"
                      placeholder="Please specify the reason for mess change..."
                      className="border-gray-300"
                    />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Submit Mess Change Request</Button>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Previous Selections</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>May 2024: Main Mess</p>
                      <p>April 2024: Main Mess</p>
                      <p>March 2024: Annexe Mess</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
