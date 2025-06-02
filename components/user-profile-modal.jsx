"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Users,
  Shield,
  Edit,
  Save,
  Camera,
  CheckCircle,
  AlertCircle,
  Clock,
  Send,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const studentData = {
  personal: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@student.edu",
    phone: "+91 98765 43210",
    dateOfBirth: "2002-05-15",
    address: "123 Main Street, City, State - 123456",
    bloodGroup: "O+",
    emergencyContact: "+91 98765 43211",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    rollNumber: "CSE2021001",
    admissionDate: "2021-08-15",
    hostelRoom: "A-302",
    verified: true,
  },
  parents: {
    father: {
      name: "Robert Doe",
      phone: "+91 98765 43220",
      email: "robert.doe@email.com",
      occupation: "Engineer",
      verified: false,
    },
    mother: {
      name: "Mary Doe",
      phone: "+91 98765 43221",
      email: "mary.doe@email.com",
      occupation: "Teacher",
      verified: true,
    },
    guardian: {
      name: "",
      phone: "",
      email: "",
      relation: "",
      verified: false,
    },
  },
}

export function UserProfileModal({ children }) {
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(studentData)
  const [otpStep, setOtpStep] = useState(null) // 'father', 'mother', 'guardian', null
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const { toast } = useToast()

  const handleSendOtp = (parentType) => {
    setOtpStep(parentType)
    toast({
      title: "OTP Sent",
      description: `Verification code sent to ${formData.parents[parentType].phone}`,
    })
  }

  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the verification code",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)

    // Simulate OTP verification
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        parents: {
          ...prev.parents,
          [otpStep]: {
            ...prev.parents[otpStep],
            verified: true,
          },
        },
      }))

      toast({
        title: "Verification Successful",
        description: `${otpStep} details have been verified successfully`,
      })

      setOtpStep(null)
      setOtp("")
      setIsVerifying(false)
    }, 2000)
  }

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully",
    })
    setIsEditing(false)
  }

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleParentInputChange = (parentType, field, value) => {
    setFormData((prev) => ({
      ...prev,
      parents: {
        ...prev.parents,
        [parentType]: {
          ...prev.parents[parentType],
          [field]: value,
        },
      },
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-900 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Student Profile
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            View and manage your personal information and parent details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                <AvatarFallback className="bg-blue-600 text-white text-xl font-bold">
                  {formData.personal.firstName[0]}
                  {formData.personal.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 p-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="h-3 w-3" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">
                {formData.personal.firstName} {formData.personal.lastName}
              </h3>
              <p className="text-gray-600">{formData.personal.course}</p>
              <p className="text-gray-600">{formData.personal.rollNumber}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Student
                </Badge>
                <Badge variant="outline" className="border-blue-200 text-blue-800">
                  Room {formData.personal.hostelRoom}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={isEditing ? "bg-green-600 hover:bg-green-700" : "border-gray-200"}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="personal" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
                Personal Details
              </TabsTrigger>
              <TabsTrigger value="parents" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
                Parent/Guardian Details
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.personal.firstName}
                        onChange={(e) => handleInputChange("personal", "firstName", e.target.value)}
                        disabled={!isEditing}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.personal.lastName}
                        onChange={(e) => handleInputChange("personal", "lastName", e.target.value)}
                        disabled={!isEditing}
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.personal.email}
                          onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={formData.personal.phone}
                          onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 border-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.personal.dateOfBirth}
                          onChange={(e) => handleInputChange("personal", "dateOfBirth", e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select
                        value={formData.personal.bloodGroup}
                        onValueChange={(value) => handleInputChange("personal", "bloodGroup", value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        id="address"
                        value={formData.personal.address}
                        onChange={(e) => handleInputChange("personal", "address", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10 border-gray-300 min-h-[80px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="emergencyContact"
                        value={formData.personal.emergencyContact}
                        onChange={(e) => handleInputChange("personal", "emergencyContact", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10 border-gray-300"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-blue-600" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="course">Course</Label>
                      <Input
                        id="course"
                        value={formData.personal.course}
                        disabled
                        className="border-gray-300 bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input id="year" value={formData.personal.year} disabled className="border-gray-300 bg-gray-50" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input
                        id="rollNumber"
                        value={formData.personal.rollNumber}
                        disabled
                        className="border-gray-300 bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admissionDate">Admission Date</Label>
                      <Input
                        id="admissionDate"
                        value={formData.personal.admissionDate}
                        disabled
                        className="border-gray-300 bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hostelRoom">Hostel Room</Label>
                    <Input
                      id="hostelRoom"
                      value={formData.personal.hostelRoom}
                      disabled
                      className="border-gray-300 bg-gray-50"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="parents" className="space-y-4">
              {/* Father Details */}
              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-gray-900 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-blue-600" />
                      Father Details
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {formData.parents.father.verified ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-orange-200 text-orange-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Not Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatherName">Father's Name</Label>
                      <Input
                        id="fatherName"
                        value={formData.parents.father.name}
                        onChange={(e) => handleParentInputChange("father", "name", e.target.value)}
                        disabled={!isEditing}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fatherOccupation">Occupation</Label>
                      <Input
                        id="fatherOccupation"
                        value={formData.parents.father.occupation}
                        onChange={(e) => handleParentInputChange("father", "occupation", e.target.value)}
                        disabled={!isEditing}
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatherPhone">Phone Number</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="fatherPhone"
                          value={formData.parents.father.phone}
                          onChange={(e) => handleParentInputChange("father", "phone", e.target.value)}
                          disabled={!isEditing}
                          className="border-gray-300"
                        />
                        {!formData.parents.father.verified && formData.parents.father.phone && (
                          <Button
                            size="sm"
                            onClick={() => handleSendOtp("father")}
                            className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Send OTP
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fatherEmail">Email Address</Label>
                      <Input
                        id="fatherEmail"
                        type="email"
                        value={formData.parents.father.email}
                        onChange={(e) => handleParentInputChange("father", "email", e.target.value)}
                        disabled={!isEditing}
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  {otpStep === "father" && (
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">OTP Verification</span>
                          </div>
                          <p className="text-sm text-blue-700">
                            Enter the 6-digit code sent to {formData.parents.father.phone}
                          </p>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Enter OTP"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              className="border-blue-300"
                              maxLength={6}
                            />
                            <Button
                              onClick={handleVerifyOtp}
                              disabled={isVerifying || otp.length !== 6}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              {isVerifying ? (
                                <>
                                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                                  Verifying...
                                </>
                              ) : (
                                "Verify"
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>

              {/* Mother Details */}
              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-gray-900 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-pink-600" />
                      Mother Details
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {formData.parents.mother.verified ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-orange-200 text-orange-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Not Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="motherName">Mother's Name</Label>
                      <Input
                        id="motherName"
                        value={formData.parents.mother.name}
                        onChange={(e) => handleParentInputChange("mother", "name", e.target.value)}
                        disabled={!isEditing}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherOccupation">Occupation</Label>
                      <Input
                        id="motherOccupation"
                        value={formData.parents.mother.occupation}
                        onChange={(e) => handleParentInputChange("mother", "occupation", e.target.value)}
                        disabled={!isEditing}
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="motherPhone">Phone Number</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="motherPhone"
                          value={formData.parents.mother.phone}
                          onChange={(e) => handleParentInputChange("mother", "phone", e.target.value)}
                          disabled={!isEditing}
                          className="border-gray-300"
                        />
                        {!formData.parents.mother.verified && formData.parents.mother.phone && (
                          <Button
                            size="sm"
                            onClick={() => handleSendOtp("mother")}
                            className="bg-pink-600 hover:bg-pink-700 whitespace-nowrap"
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Send OTP
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherEmail">Email Address</Label>
                      <Input
                        id="motherEmail"
                        type="email"
                        value={formData.parents.mother.email}
                        onChange={(e) => handleParentInputChange("mother", "email", e.target.value)}
                        disabled={!isEditing}
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  {otpStep === "mother" && (
                    <Card className="border-pink-200 bg-pink-50">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-pink-600" />
                            <span className="text-sm font-medium text-pink-900">OTP Verification</span>
                          </div>
                          <p className="text-sm text-pink-700">
                            Enter the 6-digit code sent to {formData.parents.mother.phone}
                          </p>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Enter OTP"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              className="border-pink-300"
                              maxLength={6}
                            />
                            <Button
                              onClick={handleVerifyOtp}
                              disabled={isVerifying || otp.length !== 6}
                              className="bg-pink-600 hover:bg-pink-700"
                            >
                              {isVerifying ? (
                                <>
                                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                                  Verifying...
                                </>
                              ) : (
                                "Verify"
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>

              {/* Guardian Details (Optional) */}
              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-gray-900 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-purple-600" />
                      Guardian Details (Optional)
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {formData.parents.guardian.verified ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : formData.parents.guardian.name ? (
                        <Badge variant="outline" className="border-orange-200 text-orange-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Not Verified
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guardianName">Guardian's Name</Label>
                      <Input
                        id="guardianName"
                        value={formData.parents.guardian.name}
                        onChange={(e) => handleParentInputChange("guardian", "name", e.target.value)}
                        disabled={!isEditing}
                        className="border-gray-300"
                        placeholder="Enter guardian's name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guardianRelation">Relation</Label>
                      <Select
                        value={formData.parents.guardian.relation}
                        onValueChange={(value) => handleParentInputChange("guardian", "relation", value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select relation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uncle">Uncle</SelectItem>
                          <SelectItem value="aunt">Aunt</SelectItem>
                          <SelectItem value="grandfather">Grandfather</SelectItem>
                          <SelectItem value="grandmother">Grandmother</SelectItem>
                          <SelectItem value="brother">Brother</SelectItem>
                          <SelectItem value="sister">Sister</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guardianPhone">Phone Number</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="guardianPhone"
                          value={formData.parents.guardian.phone}
                          onChange={(e) => handleParentInputChange("guardian", "phone", e.target.value)}
                          disabled={!isEditing}
                          className="border-gray-300"
                          placeholder="Enter phone number"
                        />
                        {!formData.parents.guardian.verified && formData.parents.guardian.phone && (
                          <Button
                            size="sm"
                            onClick={() => handleSendOtp("guardian")}
                            className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Send OTP
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guardianEmail">Email Address</Label>
                      <Input
                        id="guardianEmail"
                        type="email"
                        value={formData.parents.guardian.email}
                        onChange={(e) => handleParentInputChange("guardian", "email", e.target.value)}
                        disabled={!isEditing}
                        className="border-gray-300"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  {otpStep === "guardian" && (
                    <Card className="border-purple-200 bg-purple-50">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-900">OTP Verification</span>
                          </div>
                          <p className="text-sm text-purple-700">
                            Enter the 6-digit code sent to {formData.parents.guardian.phone}
                          </p>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Enter OTP"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              className="border-purple-300"
                              maxLength={6}
                            />
                            <Button
                              onClick={handleVerifyOtp}
                              disabled={isVerifying || otp.length !== 6}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              {isVerifying ? (
                                <>
                                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                                  Verifying...
                                </>
                              ) : (
                                "Verify"
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
