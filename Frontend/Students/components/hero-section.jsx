"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "DU Hostels",
    subtitle: "Discover Our Premium Hostel Facilities",
    image: "/images/hostel-building.png",
  },
  {
    id: 2,
    title: "Modern Amenities",
    subtitle: "Experience Comfort and Convenience",
    image: "/images/hostel-building.png",
  },
  {
    id: 3,
    title: "Safe Environment",
    subtitle: "Your Security is Our Priority",
    image: "/images/hostel-building.png",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-80 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 bg-[url('/images/college-campus.jpg')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/50 rounded-lg shadow-inner">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">{slides[currentSlide].title}</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl animate-fade-in">{slides[currentSlide].subtitle}</p>

        {/* Navigation Dots */}
        <div className="flex space-x-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Home Button */}
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
        >
          Home
        </Button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
    </div>
  )
}
