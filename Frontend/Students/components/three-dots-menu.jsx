"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MoreVertical,
  Home,
  Users,
  Settings,
  UtensilsCrossed,
  Bell,
  Phone,
  MapPin,
  Wifi,
  Shield,
  Car,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  User,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    description: "Overview and analytics",
    category: "main",
  },
  {
    title: "Feedback",
    href: "/feedback",
    icon: Users,
    
    description: "Manage  Feedbacks",
    category: "main",
  },
    {
    title: "Attendance",
    href: "/attendance",
    icon: Bell,
   description: "Manage Attendance",
    
  },
  {
    title: "Mess Management",
    href: "/mess",
    icon: UtensilsCrossed,
    badge: "New",
    description: "Menu, timings & bookings",
    category: "services",
  },
  {
    title: "Notices",
    href: "/notices",
    icon: Bell,
    badge: "5",
    description: "Important announcements",
    category: "communication",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    description: "System configuration",
    category: "admin",
  },
]

/*const hostelServices = [
  {
    title: "WiFi Network",
    status: "Active",
    icon: Wifi,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Security",
    status: "24/7 Active",
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Parking",
    status: "Available",
    icon: Car,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Maintenance",
    status: "On Call",
    icon: Phone,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]*/

const emergencyContacts = [
  {
    title: "Security",
    number: "+91 98765 43210",
    icon: Shield,
    color: "bg-red-500",
    available: "24/7",
  },
  {
    title: "Warden",
    number: "+91 98765 43211",
    icon: User,
    color: "bg-blue-500",
    available: "9 AM - 9 PM",
  },
  {
    title: "Medical",
    number: "+91 98765 43212",
    icon: Phone,
    color: "bg-green-500",
    available: "24/7",
  },
  {
    title: "Maintenance",
    number: "+91 98765 43213",
    icon: Settings,
    color: "bg-orange-500",
    available: "8 AM - 6 PM",
  },
]

export function ThreeDotsMenu() {
  const [open, setOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()

  const handleNavigation = (href) => {
    window.location.href = href
    setOpen(false)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      // Show logout confirmation
      toast({
        title: "Logging out...",
        description: "Please wait while we sign you out securely.",
      })

      // Simulate logout process (replace with actual logout logic)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear any stored user data
      localStorage.removeItem("userToken")
      localStorage.removeItem("userData")
      sessionStorage.clear()

      // Show success message
      toast({
        title: "Logged out successfully",
        description: "You have been signed out securely. Redirecting to login...",
      })

      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = "/login"
      }, 1500)
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was an error signing you out. Please try again.",
        variant: "destructive",
      })
      setIsLoggingOut(false)
    }
  }

  const getBadgeVariant = (badge) => {
    if (badge === "New") return "bg-green-100 text-green-800 animate-pulse"
    if (typeof badge === "string" && badge.includes(",")) return "bg-blue-100 text-blue-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-gray-100 relative transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <MoreVertical className="h-5 w-5 text-gray-600 transition-transform duration-200 hover:rotate-90" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-xs text-white font-bold">5</span>
          </div>
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-white p-0 border-l-2 border-gray-100 shadow-2xl">
        <ScrollArea className="h-full">
          <div className="p-6">
            <SheetHeader className="mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <SheetTitle className="text-gray-900 text-xl font-bold">Navigation Hub</SheetTitle>
                  <SheetDescription className="text-gray-600">
                    Quick access to all hostel management features
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="space-y-6">
              {/* Navigation Items */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-purple-600" />
                  <h3 className="text-sm font-semibold text-gray-700">Navigation</h3>
                </div>
                <div className="space-y-2">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <button
                        key={item.href}
                        onClick={() => handleNavigation(item.href)}
                        className={cn(
                          "w-full flex items-center space-x-3 rounded-xl p-3 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                          isActive
                            ? "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-md"
                            : "hover:bg-gray-50 border-2 border-transparent hover:border-gray-200",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                            isActive
                              ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p
                              className={cn(
                                "text-sm font-semibold transition-colors duration-200",
                                isActive ? "text-blue-900" : "text-gray-900",
                              )}
                            >
                              {item.title}
                            </p>
                            {item.badge && (
                              <Badge
                                className={cn(
                                  "ml-2 transition-all duration-200 text-xs",
                                  isActive ? "bg-blue-600 text-white shadow-sm" : getBadgeVariant(item.badge),
                                )}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <Separator className="bg-gray-200" />

            

              {/* Emergency Contacts */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <h3 className="text-sm font-semibold text-gray-700">Emergency Contacts</h3>
                </div>
                <div className="space-y-2">
                  {emergencyContacts.map((contact) => (
                    <div
                      key={contact.title}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 ${contact.color} rounded-lg`}>
                          <contact.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{contact.title}</p>
                          <p className="text-xs text-gray-600">{contact.available}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{contact.number}</p>
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-gray-200" />

              {/* Logout Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4 text-red-600" />
                  <h3 className="text-sm font-semibold text-gray-700">Account</h3>
                </div>
                <Button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center justify-center space-x-3 p-4 bg-red-50 hover:bg-red-100 border-2 border-red-200 hover:border-red-300 text-red-700 hover:text-red-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] rounded-xl"
                  variant="outline"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white">
                    <LogOut className={cn("h-5 w-5", isLoggingOut && "animate-spin")} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold">{isLoggingOut ? "Signing Out..." : "Sign Out"}</p>
                    <p className="text-xs opacity-75">
                      {isLoggingOut ? "Please wait..." : "Securely logout from your account"}
                    </p>
                  </div>
                </Button>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <span>HMS v2.0</span>
                  <span>•</span>
                  <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
