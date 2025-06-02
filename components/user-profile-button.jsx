"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserProfileModal } from "@/components/user-profile-modal"
import { User, Settings, Bell, HelpCircle, LogOut, ChevronDown, Shield, Mail, Phone } from "lucide-react"

export function UserProfileButton() {
  const [notificationCount] = useState(3)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 px-2 py-2 h-auto hover:bg-gray-50 rounded-lg">
          <div className="relative">
            <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">JD</AvatarFallback>
            </Avatar>
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-white border border-gray-200 shadow-lg">
        {/* User Info Header */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                <AvatarImage src="/placeholder.svg?height=48&width=48" alt="User" />
                <AvatarFallback className="bg-blue-600 text-white font-medium">JD</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-600">john.doe@student.edu</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                  Student
                </Badge>
                <Badge variant="outline" className="text-xs border-green-200 text-green-800">
                  Online
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Quick Stats */}
        <div className="p-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2 rounded-lg bg-blue-50">
              <p className="text-lg font-bold text-blue-600">94.2%</p>
              <p className="text-xs text-gray-600">Attendance</p>
            </div>
            <div className="p-2 rounded-lg bg-green-50">
              <p className="text-lg font-bold text-green-600">A-302</p>
              <p className="text-xs text-gray-600">Room</p>
            </div>
            <div className="p-2 rounded-lg bg-purple-50">
              <p className="text-lg font-bold text-purple-600">3rd</p>
              <p className="text-xs text-gray-600">Year</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Menu Items */}
        <div className="p-1">
          <UserProfileModal>
            <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Edit Profile</p>
                <p className="text-xs text-gray-500">Manage personal & parent details</p>
              </div>
            </DropdownMenuItem>
          </UserProfileModal>

          <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
              <Settings className="h-4 w-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Settings</p>
              <p className="text-xs text-gray-500">Manage your preferences</p>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 relative">
              <Bell className="h-4 w-4 text-orange-600" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white flex items-center justify-center">
                  {notificationCount}
                </Badge>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Notifications</p>
              <p className="text-xs text-gray-500">{notificationCount} unread messages</p>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
              <HelpCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Help & Support</p>
              <p className="text-xs text-gray-500">Get help and contact support</p>
            </div>
          </DropdownMenuItem>
        </div>

        <Separator />

        {/* Contact Info */}
        <div className="p-3">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Contact Information</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <Mail className="h-3 w-3" />
              <span>john.doe@student.edu</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <Phone className="h-3 w-3" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <Shield className="h-3 w-3" />
              <span>Last login: Today at 9:30 AM</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Logout */}
        <div className="p-1">
          <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 cursor-pointer text-red-600">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
              <LogOut className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Sign Out</p>
              <p className="text-xs text-red-500">Sign out of your account</p>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
