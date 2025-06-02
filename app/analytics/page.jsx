"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  GraduationCap,
  Calendar,
  Star,
  BookOpen,
  Award,
  Clock,
  Target,
} from "lucide-react"

const performanceMetrics = [
  {
    title: "Overall Performance",
    value: "87.5%",
    change: "+5.2%",
    trend: "up",
    description: "Average student performance",
    icon: Target,
  },
  {
    title: "Attendance Rate",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    description: "Monthly attendance average",
    icon: Calendar,
  },
  {
    title: "Course Completion",
    value: "78.9%",
    change: "-1.3%",
    trend: "down",
    description: "Students completing courses",
    icon: GraduationCap,
  },
  {
    title: "Student Satisfaction",
    value: "4.8/5",
    change: "+0.3",
    trend: "up",
    description: "Average feedback rating",
    icon: Star,
  },
]

const gradeDistribution = [
  { grade: "A+", count: 156, percentage: 12.6, color: "bg-green-500" },
  { grade: "A", count: 298, percentage: 24.1, color: "bg-green-400" },
  { grade: "B+", count: 342, percentage: 27.7, color: "bg-blue-500" },
  { grade: "B", count: 267, percentage: 21.6, color: "bg-blue-400" },
  { grade: "C+", count: 123, percentage: 10.0, color: "bg-yellow-500" },
  { grade: "C", count: 48, percentage: 3.9, color: "bg-orange-500" },
]

const subjectPerformance = [
  { subject: "Mathematics", average: 85.2, students: 234, trend: "up" },
  { subject: "English", average: 88.7, students: 245, trend: "up" },
  { subject: "Science", average: 82.1, students: 198, trend: "down" },
  { subject: "History", average: 79.8, students: 187, trend: "up" },
  { subject: "Geography", average: 84.3, students: 156, trend: "up" },
  { subject: "Art", average: 91.2, students: 123, trend: "up" },
]

const monthlyTrends = [
  { month: "Jan", students: 1180, attendance: 92.1, performance: 84.2 },
  { month: "Feb", students: 1195, attendance: 93.4, performance: 85.1 },
  { month: "Mar", students: 1210, attendance: 94.2, performance: 86.3 },
  { month: "Apr", students: 1234, attendance: 94.8, performance: 87.5 },
]

const topPerformers = [
  { name: "Sarah Johnson", grade: "12th", average: 97.8, subjects: 6 },
  { name: "Michael Chen", grade: "11th", average: 96.5, subjects: 7 },
  { name: "Emma Williams", grade: "12th", average: 95.9, subjects: 6 },
  { name: "David Rodriguez", grade: "10th", average: 95.2, subjects: 8 },
  { name: "Lisa Thompson", grade: "11th", average: 94.8, subjects: 7 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Comprehensive metrics and performance insights</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2 text-xs">
                <span className={`flex items-center ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Grade Distribution
                </CardTitle>
                <CardDescription>Current semester grade breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {gradeDistribution.map((grade) => (
                  <div key={grade.grade} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{grade.grade}</span>
                      <span className="text-muted-foreground">
                        {grade.count} students ({grade.percentage}%)
                      </span>
                    </div>
                    <Progress value={grade.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Performers
                </CardTitle>
                <CardDescription>Highest achieving students this semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((student, index) => (
                    <div key={student.name} className="flex items-center space-x-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.grade} • {student.subjects} subjects
                        </p>
                      </div>
                      <Badge variant="secondary">{student.average}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Subject Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Subject Performance Analysis
              </CardTitle>
              <CardDescription>Average performance across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectPerformance.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{subject.subject}</span>
                        <Badge variant="outline">{subject.students} students</Badge>
                        {subject.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{subject.average}%</span>
                    </div>
                    <Progress value={subject.average} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Trends
              </CardTitle>
              <CardDescription>Key metrics over the past 4 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {monthlyTrends.map((month) => (
                  <div key={month.month} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{month.month} 2024</h4>
                      <Badge variant="outline">{month.students} students</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Attendance</span>
                          <span>{month.attendance}%</span>
                        </div>
                        <Progress value={month.attendance} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Performance</span>
                          <span>{month.performance}%</span>
                        </div>
                        <Progress value={month.performance} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {/* Reports Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
                <CardDescription>Recent analytics reports and exports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Monthly Performance Report</p>
                    <p className="text-sm text-muted-foreground">Generated 2 hours ago</p>
                  </div>
                  <Badge>PDF</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Attendance Summary</p>
                    <p className="text-sm text-muted-foreground">Generated yesterday</p>
                  </div>
                  <Badge>Excel</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Grade Distribution Analysis</p>
                    <p className="text-sm text-muted-foreground">Generated 3 days ago</p>
                  </div>
                  <Badge>PDF</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
                <CardDescription>Key findings from recent data analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="text-sm font-medium text-green-800">Attendance Improvement</p>
                  </div>
                  <p className="text-sm text-green-700 mt-1">Overall attendance has increased by 2.1% this month</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-blue-600" />
                    <p className="text-sm font-medium text-blue-800">High Satisfaction</p>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Student feedback ratings are at an all-time high of 4.8/5
                  </p>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <p className="text-sm font-medium text-orange-800">Action Required</p>
                  </div>
                  <p className="text-sm text-orange-700 mt-1">Science course completion rate needs attention</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
