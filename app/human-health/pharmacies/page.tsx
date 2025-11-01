"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Star,
  Pill,
  Search,
  Navigation,
  ShoppingCart,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface Medicine {
  name: string
  genericName: string
  price: string
  inStock: boolean
  quantity: number
  expiryDate: string
}

interface Pharmacy {
  id: string
  name: string
  address: string
  distance: string
  rating: number
  reviews: number
  phone: string
  isOpen24Hours: boolean
  currentStatus: "Open" | "Closed" | "Closing Soon"
  nextOpenTime?: string
  medicines: Medicine[]
  acceptsInsurance: boolean
  hasDelivery: boolean
  deliveryTime?: string
}

export default function PharmaciesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [medicineSearch, setMedicineSearch] = useState("")

  const pharmacies: Pharmacy[] = [
    {
      id: "1",
      name: "HealthPlus Pharmacy",
      address: "123 Main Street, Downtown",
      distance: "0.3 miles",
      rating: 4.8,
      reviews: 245,
      phone: "(555) 123-4567",
      isOpen24Hours: true,
      currentStatus: "Open",
      acceptsInsurance: true,
      hasDelivery: true,
      deliveryTime: "30-45 min",
      medicines: [
        {
          name: "Lisinopril 10mg",
          genericName: "Lisinopril",
          price: "$12.99",
          inStock: true,
          quantity: 50,
          expiryDate: "2025-08-15",
        },
        {
          name: "Metformin 500mg",
          genericName: "Metformin",
          price: "$8.50",
          inStock: true,
          quantity: 30,
          expiryDate: "2025-06-20",
        },
        {
          name: "Ibuprofen 200mg",
          genericName: "Ibuprofen",
          price: "$6.99",
          inStock: false,
          quantity: 0,
          expiryDate: "",
        },
      ],
    },
    {
      id: "2",
      name: "MediCare Express",
      address: "456 Oak Avenue, Medical District",
      distance: "0.7 miles",
      rating: 4.6,
      reviews: 189,
      phone: "(555) 234-5678",
      isOpen24Hours: false,
      currentStatus: "Open",
      nextOpenTime: "Closes at 10 PM",
      acceptsInsurance: true,
      hasDelivery: true,
      deliveryTime: "45-60 min",
      medicines: [
        {
          name: "Lisinopril 10mg",
          genericName: "Lisinopril",
          price: "$14.50",
          inStock: true,
          quantity: 25,
          expiryDate: "2025-09-10",
        },
        {
          name: "Amoxicillin 500mg",
          genericName: "Amoxicillin",
          price: "$15.99",
          inStock: true,
          quantity: 40,
          expiryDate: "2025-07-30",
        },
        {
          name: "Aspirin 81mg",
          genericName: "Aspirin",
          price: "$4.99",
          inStock: true,
          quantity: 100,
          expiryDate: "2026-01-15",
        },
      ],
    },
    {
      id: "3",
      name: "QuickMeds Pharmacy",
      address: "789 Pine Street, Westside",
      distance: "1.2 miles",
      rating: 4.4,
      reviews: 156,
      phone: "(555) 345-6789",
      isOpen24Hours: false,
      currentStatus: "Closing Soon",
      nextOpenTime: "Closes at 9 PM",
      acceptsInsurance: false,
      hasDelivery: false,
      medicines: [
        {
          name: "Metformin 500mg",
          genericName: "Metformin",
          price: "$9.99",
          inStock: true,
          quantity: 15,
          expiryDate: "2025-05-25",
        },
        {
          name: "Omeprazole 20mg",
          genericName: "Omeprazole",
          price: "$18.99",
          inStock: true,
          quantity: 35,
          expiryDate: "2025-11-05",
        },
      ],
    },
  ]

  const filters = [
    { value: "all", label: "All Pharmacies" },
    { value: "24hours", label: "24/7 Open" },
    { value: "delivery", label: "Home Delivery" },
    { value: "insurance", label: "Accepts Insurance" },
  ]

  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    const matchesSearch =
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "24hours" && pharmacy.isOpen24Hours) ||
      (selectedFilter === "delivery" && pharmacy.hasDelivery) ||
      (selectedFilter === "insurance" && pharmacy.acceptsInsurance)

    const matchesMedicine =
      medicineSearch === "" ||
      pharmacy.medicines.some(
        (med) =>
          med.name.toLowerCase().includes(medicineSearch.toLowerCase()) ||
          med.genericName.toLowerCase().includes(medicineSearch.toLowerCase()),
      )

    return matchesSearch && matchesFilter && matchesMedicine
  })

  const getStockIcon = (inStock: boolean, quantity: number) => {
    if (!inStock) return <XCircle className="h-4 w-4 text-destructive" />
    if (quantity < 20) return <AlertCircle className="h-4 w-4 text-yellow-500" />
    return <CheckCircle className="h-4 w-4 text-green-500" />
  }

  const getStockText = (inStock: boolean, quantity: number) => {
    if (!inStock) return "Out of Stock"
    if (quantity < 20) return `Low Stock (${quantity})`
    return `In Stock (${quantity})`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50/20 to-blue-50/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/human-health" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Activity className="h-8 w-8 text-primary animate-pulse-gentle" />
            <span className="text-2xl font-bold text-foreground">Lifespan</span>
          </Link>

          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Pill className="h-4 w-4 mr-1" />
            Pharmacy Finder
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <Pill className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-balance mb-2">
            Medical <span className="text-green-600">Stores & Pharmacies</span>
          </h1>
          <p className="text-lg text-muted-foreground">Find nearby pharmacies and check medicine availability</p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search pharmacies by name or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Pill className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for specific medicine..."
                      value={medicineSearch}
                      onChange={(e) => setMedicineSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {filters.map((filter) => (
                    <Button
                      key={filter.value}
                      variant={selectedFilter === filter.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter.value)}
                      className="hover-lift"
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pharmacies List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredPharmacies.map((pharmacy, index) => (
            <Card
              key={pharmacy.id}
              className="hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Pharmacy Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{pharmacy.name}</h3>
                        <div className="flex items-center text-muted-foreground text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {pharmacy.address}
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">
                              {pharmacy.rating} ({pharmacy.reviews} reviews)
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Navigation className="h-4 w-4 mr-1" />
                            {pharmacy.distance}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Badge
                          variant={
                            pharmacy.currentStatus === "Open"
                              ? "default"
                              : pharmacy.currentStatus === "Closing Soon"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {pharmacy.currentStatus}
                        </Badge>
                        {pharmacy.isOpen24Hours && (
                          <Badge variant="outline" className="text-xs">
                            24/7 Open
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pharmacy.acceptsInsurance && (
                        <Badge variant="outline" className="text-xs">
                          Insurance Accepted
                        </Badge>
                      )}
                      {pharmacy.hasDelivery && (
                        <Badge variant="outline" className="text-xs">
                          Home Delivery ({pharmacy.deliveryTime})
                        </Badge>
                      )}
                      {pharmacy.nextOpenTime && (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {pharmacy.nextOpenTime}
                        </Badge>
                      )}
                    </div>

                    {/* Medicine Availability */}
                    {medicineSearch && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Medicine Availability</h4>
                        <div className="space-y-2">
                          {pharmacy.medicines
                            .filter(
                              (med) =>
                                med.name.toLowerCase().includes(medicineSearch.toLowerCase()) ||
                                med.genericName.toLowerCase().includes(medicineSearch.toLowerCase()),
                            )
                            .map((medicine, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div>
                                  <p className="font-medium text-sm">{medicine.name}</p>
                                  <p className="text-xs text-muted-foreground">{medicine.genericName}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-medium text-sm">{medicine.price}</span>
                                  <div className="flex items-center gap-1">
                                    {getStockIcon(medicine.inStock, medicine.quantity)}
                                    <span className="text-xs">{getStockText(medicine.inStock, medicine.quantity)}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 min-w-48">
                    <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      {pharmacy.phone}
                    </Button>
                    <Button size="sm" className="hover-lift bg-green-600 hover:bg-green-700">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    {pharmacy.hasDelivery && (
                      <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Order Online
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover-lift bg-transparent"
                      onClick={() => (window.location.href = `/human-health/pharmacies/${pharmacy.id}`)}
                    >
                      View Full Stock
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPharmacies.length === 0 && (
          <div className="text-center py-12">
            <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No pharmacies found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Quick Medicine Search */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Quick Medicine Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Search for specific medicines across all nearby pharmacies to compare prices and availability.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Enter medicine name..." className="flex-1" />
                <Button className="hover-lift bg-green-600 hover:bg-green-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search All Stores
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
