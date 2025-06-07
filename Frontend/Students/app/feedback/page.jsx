"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavigationHeader } from "@/components/navigation-header"
import { ArrowLeft, Send, MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample feedback data
const feedbackHistory = [
  {
    id: 1,
    type: "Complaint",
    message: "The water heater in my room (302) is not working properly. It's been three days now.",
    date: "2024-05-28",
    status: "Replied",
    reply:
      "We've scheduled a maintenance visit for tomorrow between 10 AM and 12 PM. Thank you for reporting this issue.",
    replyDate: "2024-05-29",
  },
  {
    id: 2,
    type: "Query",
    message: "What are the visiting hours for guests during weekends?",
    date: "2024-05-25",
    status: "Replied",
    reply: "Visiting hours are from 10 AM to 8 PM on weekends. Guests must register at the reception desk.",
    replyDate: "2024-05-25",
  },
  {
    id: 3,
    type: "Suggestion",
    message: "It would be great if we could have a small bookshelf in the common room for students to share books.",
    date: "2024-05-20",
    status: "Pending",
    reply: "",
    replyDate: "",
  },
  {
    id: 4,
    type: "Complaint",
    message: "The WiFi connection is very slow in the evening, especially in the west wing of the building.",
    date: "2024-05-18",
    status: "Pending",
    reply: "",
    replyDate: "",
  },
]

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!feedbackType) {
      toast({
        title: "Missing feedback type",
        description: "Please select a feedback type",
        variant: "destructive",
      })
      return
    }

    if (!message.trim()) {
      toast({
        title: "Missing message",
        description: "Please enter your feedback message",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Feedback submitted",
        description: "Your feedback has been submitted successfully",
      })
      setFeedbackType("")
      setMessage("")
      setIsSubmitting(false)
    }, 1500)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Replied":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Replied</Badge>
      case "Pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "Complaint":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "Query":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "Suggestion":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4 hover:bg-gray-100">
            <a href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </a>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>
          <p className="text-gray-600 mt-1">Submit your feedback or check status of previous submissions</p>
        </div>

        <Tabs defaultValue="submit" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="submit" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Submit Feedback
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Feedback History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Submit New Feedback</CardTitle>
                <CardDescription className="text-gray-600">
                  Your feedback helps us improve our services. Please be specific and constructive.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="feedback-type" className="text-sm font-medium text-gray-700">
                      Feedback Type
                    </label>
                    <Select value={feedbackType} onValueChange={setFeedbackType}>
                      <SelectTrigger
                        id="feedback-type"
                        className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <SelectValue placeholder="Select feedback type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Query">Query</SelectItem>
                        <SelectItem value="Complaint">Complaint</SelectItem>
                        <SelectItem value="Suggestion">Suggestion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your feedback in detail..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[150px] border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-4">
              {feedbackHistory.length > 0 ? (
                feedbackHistory.map((feedback) => (
                  <Card
                    key={feedback.id}
                    className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(feedback.type)}
                          <CardTitle className="text-lg text-gray-900">{feedback.type}</CardTitle>
                        </div>
                        {getStatusBadge(feedback.status)}
                      </div>
                      <CardDescription className="flex items-center text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        Submitted on {feedback.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-gray-700">{feedback.message}</p>
                    </CardContent>
                    {feedback.status === "Replied" && (
                      <CardFooter className="border-t border-gray-100 bg-gray-50 rounded-b-lg pt-3">
                        <div className="w-full">
                          <div className="flex items-center space-x-2 mb-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Admin" />
                              <AvatarFallback className="bg-blue-600 text-white text-xs">A</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-gray-700">Admin</span>
                            <span className="text-xs text-gray-500">• {feedback.replyDate}</span>
                          </div>
                          <p className="text-sm text-gray-600">{feedback.reply}</p>
                        </div>
                      </CardFooter>
                    )}
                  </Card>
                ))
              ) : (
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center">You haven't submitted any feedback yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
