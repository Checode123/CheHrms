"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CreditCard, ClipboardList, Building, Bell, MessageSquare, ArrowRight } from "lucide-react"

const features = [
  {
    id: 1,
    title: "Apply for Hostel",
    description: "Fill out and submit the hostel application form online",
    icon: FileText,
    color: "bg-blue-50 text-blue-600",
    href: "/apply",
  },
  {
    id: 2,
    title: "Fees Payment",
    description: "View fee details and make payment easily via this portal",
    icon: CreditCard,
    color: "bg-green-50 text-green-600",
    href: "/fees",
  },
  {
    id: 3,
    title: "View Attendance",
    description: "Check your daily/monthly attendance records",
    icon: ClipboardList,
    color: "bg-purple-50 text-purple-600",
    href: "/attendance",
  },
  {
    id: 4,
    title: "Hostel Allotment",
    description: "See your allotted hostel room and download the letter",
    icon: Building,
    color: "bg-orange-50 text-orange-600",
    href: "/allotment",
  },
  {
    id: 5,
    title: "Notices",
    description: "Read important notices or updates from hostel authorities",
    icon: Bell,
    color: "bg-red-50 text-red-600",
    href: "/notices",
  },
  {
    id: 6,
    title: "Feedback",
    description: "Share your feedback or report issues via the warden",
    icon: MessageSquare,
    color: "bg-teal-50 text-teal-600",
    href: "/feedback",
    highlighted: true,
  },
]

export function FeatureCards() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              feature.highlighted ? "ring-2 ring-blue-500 shadow-lg" : ""
            }`}
          >
            <CardHeader className="text-center pb-4">
              <div
                className={`w-16 h-16 mx-auto rounded-full ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-8 w-8" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-800">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-gray-600 mb-4 leading-relaxed">{feature.description}</CardDescription>
              <Button
                variant="ghost"
                className="group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300"
                asChild
              >
                <a href={feature.href} className="flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
