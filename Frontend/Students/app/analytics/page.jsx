"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Star,
  BookOpen,
  Award,
  Clock,
  Download,
  RefreshCw,
  Loader2,
} from "lucide-react"
import { useApi } from "@/hooks/use-api"
import { analyticsApi } from "@/lib/api"

export default function AnalyticsPage() {
  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
    refetch: refetchDashboard,
  } = useApi(analyticsApi.getDashboardData, [], { immediate: true })

  const {
    data: attendanceData,
    loading: attendanceLoading,
    refetch: refetchAttendance,
  } = useApi(analyticsApi.getAttendanceAnalytics, [], { immediate: true })

  const {
    data: performanceData,
    loading: performanceLoading,
    refetch: refetchPerformance,
  } = useApi(analyticsApi.getPerformanceAnalytics, [], { immediate: true })

  const handleExportData = async (type) => {
    try {
      const response = await analyticsApi.exportData(type)
      // Handle file download
      const blob = new Blob([response], { type: "application/octet-stream" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${type}-analytics-${new Date().toISOString().split("T")[0]}.xlsx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Export failed:", error)
    }
  }

  if (dashboardError) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Comprehensive metrics and performance insights</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-red-600 mb-4">Failed to load analytics data</p>
            <Button onClick={refetchDashboard} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Comprehensive metrics and performance insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleExportData("dashboard")}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline" onClick={refetchDashboard}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          : dashboardData?.metrics?.map((metric) => (
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
                {dashboardLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  dashboardData?.gradeDistribution?.map((grade) => (
                    <div key={grade.grade} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{grade.grade}</span>
                        <span className="text-muted-foreground">
                          {grade.count} students ({grade.percentage}%)
                        </span>
                      </div>
                      <Progress value={grade.percentage} className="h-2" />
                    </div>
                  ))
                )}
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
                  {dashboardLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-4 animate-pulse">
                          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                          <div className="h-6 bg-gray-200 rounded w-12"></div>
                        </div>
                      ))
                    : dashboardData?.topPerformers?.map((student, index) => (
                        <div key={student.id} className="flex items-center space-x-4">
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
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Subject Performance Analysis
                  </CardTitle>
                  <CardDescription>Average performance across all subjects</CardDescription>
                </div>
                {performanceLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-2 animate-pulse">
                        <div className="flex justify-between items-center">
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                      </div>
                    ))
                  : performanceData?.subjects?.map((subject) => (
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
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Monthly Trends
                  </CardTitle>
                  <CardDescription>Key metrics over the past 4 months</CardDescription>
                </div>
                {attendanceLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {attendanceLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="space-y-3 animate-pulse">
                        <div className="flex justify-between items-center">
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                          <div className="h-6 bg-gray-200 rounded w-24"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-2 bg-gray-200 rounded w-full"></div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-2 bg-gray-200 rounded w-full"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  : attendanceData?.monthlyTrends?.map((month) => (
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
                {dashboardData?.reports?.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-muted-foreground">{report.generatedAt}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>{report.format}</Badge>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No reports available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
                <CardDescription>Key findings from recent data analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardData?.insights?.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg ${insight.type === "positive" ? "bg-green-50 border-green-200" : insight.type === "warning" ? "bg-orange-50 border-orange-200" : "bg-blue-50 border-blue-200"}`}
                  >
                    <div className="flex items-center space-x-2">
                      {insight.type === "positive" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : insight.type === "warning" ? (
                        <Clock className="h-4 w-4 text-orange-600" />
                      ) : (
                        <Star className="h-4 w-4 text-blue-600" />
                      )}
                      <p
                        className={`text-sm font-medium ${insight.type === "positive" ? "text-green-800" : insight.type === "warning" ? "text-orange-800" : "text-blue-800"}`}
                      >
                        {insight.title}
                      </p>
                    </div>
                    <p
                      className={`text-sm mt-1 ${insight.type === "positive" ? "text-green-700" : insight.type === "warning" ? "text-orange-700" : "text-blue-700"}`}
                    >
                      {insight.description}
                    </p>
                  </div>
                )) || (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No insights available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
