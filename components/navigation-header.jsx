"use client"

import { Button } from "@/components/ui/button"
import { ThreeDotsMenu } from "@/components/three-dots-menu"
import { UserProfileModal } from "@/components/user-profile-modal"
import { Home, Bell, User } from "lucide-react"

export function NavigationHeader() {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <Home className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HMS
              </span>
              <p className="text-xs text-gray-500 -mt-1">Hostel Management</p>
            </div>
          </div>
        </div>

        {/* Center - Empty for cleaner look */}
        <div className="flex-1"></div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100 transition-all duration-200 hover:scale-105"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </Button>

          {/* My Profile Button */}
          <UserProfileModal>
            <Button
              variant="outline"
              className="flex items-center space-x-2 px-4 py-2 h-auto border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">My Profile</span>
            </Button>
          </UserProfileModal>

          {/* Three Dots Menu */}
          <ThreeDotsMenu />
        </div>
      </div>
    </header>
  )
}
