"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, FileText, AlertCircle, CheckCircle, ExternalLink, Download, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample fee data
const feeDetails = [
  { id: 1, description: "Hostel Room Rent", amount: 25000, dueDate: "2024-06-15", status: "Pending" },
  { id: 2, description: "Mess Charges", amount: 15000, dueDate: "2024-06-15", status: "Pending" },
  { id: 3, description: "Electricity Charges", amount: 5000, dueDate: "2024-06-15", status: "Pending" },
  { id: 4, description: "Internet Charges", amount: 2000, dueDate: "2024-06-15", status: "Pending" },
]

// Sample payment history
const paymentHistory = [
  { id: 1, description: "Hostel Fee - Previous Semester", amount: 45000, date: "2024-01-10", receiptNo: "HF24010001" },
  { id: 2, description: "Late Fee", amount: 1000, date: "2024-01-15", receiptNo: "LF24010015" },
]

export default function FeesPage() {
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const { toast } = useToast()

  const totalAmount = feeDetails.reduce((sum, fee) => sum + fee.amount, 0)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      const fileType = selectedFile.type
      if (!fileType.includes("pdf") && !fileType.includes("image")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or image file",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)
      setUploadSuccess(false)
    }
  }

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      setUploadSuccess(true)
      toast({
        title: "Upload successful",
        description: "Your payment receipt has been uploaded successfully",
      })
    }, 2000)
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
          <h1 className="text-3xl font-bold text-gray-900">Fee Payment</h1>
          <p className="text-gray-600 mt-1">Pay your hostel fees and upload payment receipts</p>
        </div>

        {/* Fee Details */}
        <Card className="mb-6 bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Fee Details</CardTitle>
            <CardDescription className="text-gray-600">Current semester hostel fees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Description</th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-700">Amount (₹)</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Due Date</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeDetails.map((fee) => (
                      <tr key={fee.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-gray-900">{fee.description}</td>
                        <td className="py-3 px-4 text-right text-sm text-gray-900">₹{fee.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-center text-sm text-gray-900">{fee.dueDate}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge
                            variant={fee.status === "Paid" ? "default" : "outline"}
                            className={
                              fee.status === "Paid"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                            }
                          >
                            {fee.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">Total</td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">
                        ₹{totalAmount.toLocaleString()}
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* SBI Collect */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Pay with SBI Collect</CardTitle>
              <CardDescription className="text-gray-600">Make payment through SBI Collect portal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Payment Instructions</AlertTitle>
                <AlertDescription className="text-blue-700">
                  Click the button below to navigate to SBI Collect portal. Select "Educational Institutions" and then
                  search for "DU Hostels".
                </AlertDescription>
              </Alert>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
                onClick={() => window.open("https://www.onlinesbi.sbi/sbicollect/", "_blank")}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Pay with SBI Collect
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Upload Receipt */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Upload Payment Receipt</CardTitle>
              <CardDescription className="text-gray-600">
                Upload your payment receipt after making the payment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  file ? "border-blue-300 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input
                  type="file"
                  id="receipt"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <label htmlFor="receipt" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    {file ? (
                      <>
                        <FileText className="h-8 w-8 text-blue-600" />
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400" />
                        <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF or Image (max. 5MB)</p>
                      </>
                    )}
                  </div>
                </label>
              </div>

              {uploadSuccess && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Upload Successful</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your payment receipt has been uploaded successfully. It will be verified within 24-48 hours.
                  </AlertDescription>
                </Alert>
              )}

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                onClick={handleUpload}
                disabled={!file || isUploading || uploadSuccess}
              >
                {isUploading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Uploading...
                  </>
                ) : uploadSuccess ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Uploaded Successfully
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Receipt
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Payment History</CardTitle>
            <CardDescription className="text-gray-600">Your previous payment records</CardDescription>
          </CardHeader>
          <CardContent>
            {paymentHistory.length > 0 ? (
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{payment.description}</p>
                      <p className="text-sm text-gray-600">Paid on {payment.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="font-medium text-gray-900">₹{payment.amount.toLocaleString()}</p>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1 border-gray-200">
                        <Download className="h-4 w-4" />
                        <span>Receipt #{payment.receiptNo}</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No payment history available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
