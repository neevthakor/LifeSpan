"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// --- NEW --- Imported new icons for location features
import { User, Heart, Wrench, ArrowRight, Home, MapPin, Hospital, Archive, Loader2 } from "lucide-react"
import Link from "next/link"
// --- NEW --- Imported useState
import { useState } from "react"

// --- NEW --- Define types for location and places ---
type Location = {
  lat: number
  long: number
}
type Place = {
  name: string
  address: string
  phone?: string
}
// ---

export default function CategoriesPage() {
  const categories = [
    {
      id: "human",
      title: "Human Health",
      description: "Comprehensive medical care, wellness programs, and health consultations",
      icon: User,
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: ["Medical Consultations", "Health Monitoring", "Wellness Programs", "Emergency Care"],
      image: "/medical-doctor-consultation-healthcare-professiona.jpg",
      href: "/human-health",
    },
    {
      id: "animals",
      title: "Animal Care",
      description: "Expert veterinary services and pet health management solutions",
      icon: Heart,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      features: ["Veterinary Care", "Pet Wellness", "Emergency Services", "Health Records"],
      image: "/veterinarian-with-pets-dogs-cats-animal-care.jpg",
      href: "/animal-care",
    },
    {
      id: "mechanics",
      title: "Automotive Health",
      description: "Professional vehicle maintenance and automotive diagnostic services",
      icon: Wrench,
      color: "text-accent",
      bgColor: "bg-accent/10",
      features: ["Vehicle Diagnostics", "Maintenance Plans", "Repair Services", "Health Reports"],
      image: "/car-mechanic-automotive-repair-garage-professional.jpg",
      href: "/automotive-care",
    },
  ]

  // --- NEW: State for location features ---
  const [location, setLocation] = useState<Location | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([])
  const [isFindingLocation, setIsFindingLocation] = useState(false)
  const [isFindingPlaces, setIsFindingPlaces] = useState(false)
  // ---

  // --- NEW: Function to get user's location ---
  const handleGetLocation = () => {
    setIsFindingLocation(true)
    setLocationError(null)
    setNearbyPlaces([])

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, long: longitude })
          setIsFindingLocation(false)
        },
        (error) => {
          setLocationError("Unable to get location. Please allow permission in your browser.")
          setIsFindingLocation(false)
        }
      )
    } else {
      setLocationError("Geolocation is not supported by your browser.")
      setIsFindingLocation(false)
    }
  }

  // --- NEW: Function to find nearby places ---
  const handleFindNearby = async (type: "hospitals" | "medical") => {
    if (!location) {
      setLocationError("Please get your location first.")
      return
    }

    setIsFindingPlaces(true)
    setLocationError(null)
    setNearbyPlaces([])

    const apiEndpoint = type === "hospitals" ? "/api/findHospitals" : "/api/findMedical"

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: location.lat, long: location.long }),
      })

      const data = await response.json()

      if (response.ok) {
        setNearbyPlaces(data.places)
      } else {
        setLocationError(data.error || "Could not find places.")
      }
    } catch (error) {
      setLocationError("Failed to connect to server.")
    }
    setIsFindingPlaces(false)
  }
  // ---

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/30 to-accent/10">
      
      {/* --- HEADER BLOCK REMOVED ---
        The duplicate <header>...</header> block is now gone.
        Your main header from app/layout.tsx will show here.
      */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            Choose Your Service Category
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-4">
            Select Your <span className="text-primary">Health Service</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Choose from our comprehensive range of health services designed for humans, animals, and vehicles.
          </p>
        </div>

        {/* --- NEW: Emergency Location Card --- */}
        <Card className="max-w-4xl mx-auto mb-12 bg-linear-to-r from-primary/10 to-secondary/10 border-primary/20 animate-fade-in">
          <CardHeader>
            <CardTitle>Find Nearby Emergency Services</CardTitle>
            <CardDescription>Get your location to find hospitals or medical stores near you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleGetLocation} 
              disabled={isFindingLocation} 
              className="w-full"
            >
              {isFindingLocation ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="mr-2 h-4 w-4" />
              )}
              {location ? `Location Found! (Lat: ${location.lat.toFixed(2)})` : "Get My Location"}
            </Button>

            {locationError && (
              <p className="text-sm text-destructive text-center">{locationError}</p>
            )}
            
            {location && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => handleFindNearby("hospitals")} 
                  disabled={isFindingPlaces} 
                  className="flex-1"
                  variant="secondary"
                >
                  {isFindingPlaces ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Hospital className="mr-2 h-4 w-4" />
                  )}
                  Find Nearby Hospitals
                </Button>
                <Button 
                  onClick={() => handleFindNearby("medical")} 
                  disabled={isFindingPlaces} 
                  className="flex-1"
                  variant="secondary"
                >
                  {isFindingPlaces ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Archive className="mr-2 h-4 w-4" />
                  )}
                  Find Medical Stores
                </Button>
              </div>
            )}

            {/* --- NEW: Results List --- */}
            {nearbyPlaces.length > 0 && (
              <div className="space-y-3 pt-4">
                <h4 className="font-semibold">Results:</h4>
                <ul className="list-disc list-inside space-y-2">
                  {nearbyPlaces.map((place) => (
                    <li key={place.name} className="text-sm">
                      <span className="font-bold">{place.name}</span>
                      <p className="text-muted-foreground">{place.address}</p>
                      {place.phone && <p className="text-primary text-xs">{place.phone}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
        {/* --- End of New Card --- */}

        {/* Categories Grid (Untouched) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.id}
                className={`hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl ${category.bgColor} border-2 hover:border-primary/50 animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => (window.location.href = category.href)}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${category.bgColor} flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <CardTitle className="text-2xl mb-2">{category.title}</CardTitle>
                  <CardDescription className="text-base">{category.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Key Services
                    </h4>
                    <ul className="space-y-1">
                      {category.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div className={`w-2 h-2 rounded-full ${category.color.replace("text-", "bg-")} mr-2`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    className={`w-full hover-lift ${category.color.replace("text-", "bg-")} text-white`}
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = category.href
                    }}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA Section (Untouched) */}
        <div className="text-center animate-fade-in">
          <Card className="max-w-2xl mx-auto bg-linear-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
              <p className="text-muted-foreground mb-6">
                Our AI assistant can help you determine the best service category for your specific needs.
              </p>
              <Button size="lg" className="hover-lift">
                Chat with AI Assistant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
