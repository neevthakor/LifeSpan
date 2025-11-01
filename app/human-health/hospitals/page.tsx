"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Activity, ArrowLeft, MapPin, Phone, Clock, Star, Navigation, Search } from "lucide-react"
import Link from "next/link"

export default function HospitalsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")

  const hospitals = [
    {
      name: "City General Hospital",
      address: "123 Main Street, Downtown",
      distance: "0.8 miles",
      rating: 4.8,
      specialties: ["Emergency", "Cardiology", "Neurology"],
      phone: "(555) 123-4567",
      emergency: true,
      waitTime: "15 min",
    },
    {
      name: "St. Mary's Medical Center",
      address: "456 Oak Avenue, Midtown",
      distance: "1.2 miles",
      rating: 4.6,
      specialties: ["Pediatrics", "Oncology", "Surgery"],
      phone: "(555) 234-5678",
      emergency: true,
      waitTime: "25 min",
    },
    {
      name: "Regional Health Institute",
      address: "789 Pine Road, Westside",
      distance: "2.1 miles",
      rating: 4.7,
      specialties: ["Orthopedics", "Radiology", "Internal Medicine"],
      phone: "(555) 345-6789",
      emergency: false,
      waitTime: "45 min",
    },
    {
      name: "University Medical Hospital",
      address: "321 University Blvd, Campus",
      distance: "2.8 miles",
      rating: 4.9,
      specialties: ["Research", "Trauma", "Psychiatry"],
      phone: "(555) 456-7890",
      emergency: true,
      waitTime: "20 min",
    },
  ]

  const specialties = ["all", "Emergency", "Cardiology", "Pediatrics", "Surgery", "Orthopedics"]

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty =
      selectedSpecialty === "all" ||
      hospital.specialties.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase()))
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/human-health" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Activity className="h-8 w-8 text-primary animate-pulse-gentle" />
            <span className="text-2xl font-bold text-foreground">Lifespan</span>
          </Link>

          <Badge variant="secondary">Hospital Finder</Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-balance mb-2">
            Find <span className="text-primary">Hospitals</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Locate nearby hospitals and medical centers with real-time availability
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search hospitals by name or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {specialties.map((specialty) => (
                    <Button
                      key={specialty}
                      variant={selectedSpecialty === specialty ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSpecialty(specialty)}
                      className="capitalize"
                    >
                      {specialty}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hospitals List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredHospitals.map((hospital, index) => (
            <Card key={index} className="hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{hospital.name}</h3>
                        <div className="flex items-center text-muted-foreground text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {hospital.address}
                        </div>
                      </div>
                      {hospital.emergency && (
                        <Badge variant="destructive" className="ml-2">
                          Emergency
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{hospital.rating}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Navigation className="h-4 w-4 mr-1" />
                        {hospital.distance}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        Wait: {hospital.waitTime}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {hospital.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      {hospital.phone}
                    </Button>
                    <Button size="sm" className="hover-lift">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hospitals found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or location</p>
          </div>
        )}
      </main>
    </div>
  )
}
