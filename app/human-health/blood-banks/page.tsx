"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Activity, ArrowLeft, MapPin, Phone, Clock, Droplets, Navigation, Search } from "lucide-react"
import Link from "next/link"

export default function BloodBanksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBloodType, setSelectedBloodType] = useState("all")

  const bloodBanks = [
    {
      name: "Krishna blood banck",
      address: "456 Health Plaza, Medical District",
      distance: "500 meter",
      phone: "(555) 111-2222",
      hours: "24/7",
      bloodTypes: ["O+", "O-", "A+", "A-", "B+", "AB+"],
      urgent: ["O-", "AB+"],
      donations: "Open",
    },
    {
      name: "Red Cross Blood Center",
      address: "789 Charity Avenue, Downtown",
      distance: "1.1 KM",
      phone: "(555) 333-4444",
      hours: "6 AM - 10 PM",
      bloodTypes: ["O+", "A+", "B+", "B-", "AB-"],
      urgent: ["B-"],
      donations: "Open",
    },
    {
      name: "Community Blood Services",
      address: "321 Community Road, Suburbs",
      distance: "2.3 KM",
      phone: "(555) 555-6666",
      hours: "8 AM - 6 PM",
      bloodTypes: ["O+", "O-", "A+", "A-", "AB+", "AB-"],
      urgent: ["A-", "AB-"],
      donations: "Appointment Only",
    },
    {
      name: "University Blood Bank",
      address: "654 Campus Drive, University Area",
      distance: "3.2 KM",
      phone: "(555) 777-8888",
      hours: "9 AM - 5 PM",
      bloodTypes: ["All Types"],
      urgent: ["O-", "A-"],
      donations: "Open",
    },
  ]

  const bloodTypes = ["all", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

  const filteredBloodBanks = bloodBanks.filter((bank) => {
    const matchesSearch =
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBloodType =
      selectedBloodType === "all" ||
      bank.bloodTypes.includes(selectedBloodType) ||
      bank.bloodTypes.includes("All Types")
    return matchesSearch && matchesBloodType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-destructive/5 to-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/human-health" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Activity className="h-8 w-8 text-primary animate-pulse-gentle" />
            <span className="text-2xl font-bold text-foreground">Lifespan</span>
          </Link>

          <Badge variant="secondary">Blood Bank Finder</Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <Droplets className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-balance mb-2">
            Find <span className="text-destructive">Blood Banks</span>
          </h1>
          <p className="text-lg text-muted-foreground">Locate blood donation centers and check blood availability</p>
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
                      placeholder="Search blood banks by name or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {bloodTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedBloodType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedBloodType(type)}
                    >
                      {type === "all" ? "All Types" : type}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blood Banks List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredBloodBanks.map((bank, index) => (
            <Card key={index} className="hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{bank.name}</h3>
                        <div className="flex items-center text-muted-foreground text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {bank.address}
                        </div>
                      </div>
                      <Badge variant={bank.donations === "Open" ? "default" : "secondary"}>{bank.donations}</Badge>
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Navigation className="h-4 w-4 mr-1" />
                        {bank.distance}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {bank.hours}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium mb-1">Available Blood Types:</p>
                        <div className="flex flex-wrap gap-1">
                          {bank.bloodTypes.map((type, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {bank.urgent.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1 text-destructive">Urgently Needed:</p>
                          <div className="flex flex-wrap gap-1">
                            {bank.urgent.map((type, idx) => (
                              <Badge key={idx} variant="destructive" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      {bank.phone}
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

        {filteredBloodBanks.length === 0 && (
          <div className="text-center py-12">
            <Droplets className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No blood banks found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or blood type filter</p>
          </div>
        )}
      </main>
    </div>
  )
}
