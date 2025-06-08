import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock analytics data
    const dashboardData = {
      metrics: [
        {
          title: "Overall Performance",
          value: "87.5%",
          change: "+5.2%",
          trend: "up",
          description: "Average student performance",
          icon: "Target",
        },
        {
          title: "Attendance Rate",
          value: "94.2%",
          change: "+2.1%",
          trend: "up",
          description: "Monthly attendance average",
          icon: "Calendar",
        },
        {
          title: "Course Completion",
          value: "78.9%",
          change: "-1.3%",
          trend: "down",
          description: "Students completing courses",
          icon: "GraduationCap",
        },
        {
          title: "Student Satisfaction",
          value: "4.8/5",
          change: "+0.3",
          trend: "up",
          description: "Average feedback rating",
          icon: "Star",
        },
      ],
      gradeDistribution: [
        { grade: "A+", count: 156, percentage: 12.6 },
        { grade: "A", count: 298, percentage: 24.1 },
        { grade: "B+", count: 342, percentage: 27.7 },
        { grade: "B", count: 267, percentage: 21.6 },
        { grade: "C+", count: 123, percentage: 10.0 },
        { grade: "C", count: 48, percentage: 3.9 },
      ],
      topPerformers: [
        { id: 1, name: "Sarah Johnson", grade: "12th", average: 97.8, subjects: 6 },
        { id: 2, name: "Michael Chen", grade: "11th", average: 96.5, subjects: 7 },
        { id: 3, name: "Emma Williams", grade: "12th", average: 95.9, subjects: 6 },
        { id: 4, name: "David Rodriguez", grade: "10th", average: 95.2, subjects: 8 },
        { id: 5, name: "Lisa Thompson", grade: "11th", average: 94.8, subjects: 7 },
      ],
      reports: [
        {
          title: "Monthly Performance Report",
          generatedAt: "Generated 2 hours ago",
          format: "PDF",
        },
        {
          title: "Attendance Summary",
          generatedAt: "Generated yesterday",
          format: "Excel",
        },
        {
          title: "Grade Distribution Analysis",
          generatedAt: "Generated 3 days ago",
          format: "PDF",
        },
      ],
      insights: [
        {
          type: "positive",
          title: "Attendance Improvement",
          description: "Overall attendance has increased by 2.1% this month",
        },
        {
          type: "info",
          title: "High Satisfaction",
          description: "Student feedback ratings are at an all-time high of 4.8/5",
        },
        {
          type: "warning",
          title: "Action Required",
          description: "Science course completion rate needs attention",
        },
      ],
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
