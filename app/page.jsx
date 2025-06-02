"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />
      <HeroSection />
      <FeatureCards />
    </div>
  )
}
