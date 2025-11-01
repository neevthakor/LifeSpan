"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Activity,
  ArrowLeft,
  Truck,
  MapPin,
  Clock,
  Phone,
  AlertTriangle,
  User,
  Calendar,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

export default function AmbulanceBookingPage() {
  const [bookingType, setBookingType] = useState<"emergency" | "non-emergency">("non-emergency")
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    phone: "",
    emergencyContact: "",
    medicalCondition: "",
    medications: "",
  })
  const [locationInfo, setLocationInfo] = useState({
    pickupAddress: "",
    destinationAddress: "",
    pickupInstructions: "",
  })
  const [serviceDetails, setServiceDetails] = useState({
    serviceType: "",
    urgencyLevel: "",
    scheduledDate: "",
    scheduledTime: "",
    specialRequirements: [] as string[],
  })
  const [estimatedCost, setEstimatedCost] = useState("$0")
  const [estimatedTime, setEstimatedTime] = useState("0 min")

  useEffect(() => {
    // Get booking type from URL params
    const urlParams = new URLSearchParams(window.location.search)
    const type = urlParams.get("type")
    if (type === "emergency" || type === "non-emergency") {
      setBookingType(type)
    }
  }, [])

  useEffect(() => {
    // Calculate estimated cost and time based on service type and distance
    let baseCost = 200
    let baseTime = 15

    if (serviceDetails.serviceType === "basic") {
      baseCost = 200
    } else if (serviceDetails.serviceType === "advanced") {
      baseCost = 350
    } else if (serviceDetails.serviceType === "critical") {
      baseCost = 500
    }

    if (bookingType === "emergency") {
      baseCost += 100
      baseTime = 5
    }

    setEstimatedCost(`₹${baseCost}`)
    setEstimatedTime(`${baseTime} min`)
  }, [serviceDetails.serviceType, bookingType])

  const serviceTypes = [
    { value: "basic", label: "Basic Life Support (BLS)", description: "Standard medical transport" },
    { value: "advanced", label: "Advanced Life Support (ALS)", description: "Advanced medical equipment" },
    { value: "critical", label: "Critical Care Transport", description: "ICU-level care during transport" },
  ]

  const urgencyLevels = [
    { value: "routine", label: "Routine", description: "Scheduled appointment transport" },
    { value: "urgent", label: "Urgent", description: "Same-day medical need" },
    { value: "emergency", label: "Emergency", description: "Life-threatening situation" },
  ]

  const specialRequirements = [
    "Wheelchair accessible",
    "Oxygen support",
    "Cardiac monitoring",
    "IV medication",
    "Stretcher transport",
    "Bariatric equipment",
  ]

  const handleSpecialRequirementChange = (requirement: string, checked: boolean) => {
    if (checked) {
      setServiceDetails({
        ...serviceDetails,
        specialRequirements: [...serviceDetails.specialRequirements, requirement],
      })
    } else {
      setServiceDetails({
        ...serviceDetails,
        specialRequirements: serviceDetails.specialRequirements.filter((req) => req !== requirement),
      })
    }
  }

  const handleBooking = () => {
    // In a real app, this would process the booking
    alert(`Ambulance booking confirmed! Estimated arrival: ${estimatedTime}`)
    window.location.href = "/payment?service=ambulance&amount=" + estimatedCost.replace("₹", "")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-orange-50/20 to-red-50/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/emergency" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Activity className="h-8 w-8 text-primary animate-pulse-gentle" />
            <span className="text-2xl font-bold text-foreground">Lifespan</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Badge variant={bookingType === "emergency" ? "destructive" : "secondary"}>
              <Truck className="h-4 w-4 mr-1" />
              {bookingType === "emergency" ? "Emergency" : "Scheduled"} Ambulance
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-balance mb-2">
              {bookingType === "emergency" ? "Emergency" : "Schedule"}{" "}
              <span className="text-orange-600">Ambulance</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {bookingType === "emergency"
                ? "Request immediate medical transport"
                : "Book medical transport for appointments or non-emergency needs"}
            </p>
          </div>

          {bookingType === "emergency" && (
            <Card className="border-destructive bg-destructive/5 mb-8 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                  <div>
                    <h3 className="text-lg font-bold text-destructive mb-1">Emergency Booking</h3>
                    <p className="text-sm text-muted-foreground">
                      For life-threatening emergencies, call 911 immediately. This service is for urgent medical
                      transport needs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Patient Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Patient Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Patient Name *</label>
                      <Input
                        placeholder="Full name"
                        value={patientInfo.name}
                        onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Age *</label>
                      <Input
                        placeholder="Age"
                        value={patientInfo.age}
                        onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Phone Number *</label>
                      <Input
                        placeholder="(555) 123-4567"
                        value={patientInfo.phone}
                        onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Emergency Contact</label>
                      <Input
                        placeholder="Emergency contact number"
                        value={patientInfo.emergencyContact}
                        onChange={(e) => setPatientInfo({ ...patientInfo, emergencyContact: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Medical Condition</label>
                    <Textarea
                      placeholder="Brief description of medical condition or reason for transport"
                      value={patientInfo.medicalCondition}
                      onChange={(e) => setPatientInfo({ ...patientInfo, medicalCondition: e.target.value })}
                      className="min-h-20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Current Medications</label>
                    <Textarea
                      placeholder="List current medications (optional)"
                      value={patientInfo.medications}
                      onChange={(e) => setPatientInfo({ ...patientInfo, medications: e.target.value })}
                      className="min-h-16"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Location Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Location Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Pickup Address *</label>
                    <Input
                      placeholder="Street address, city, state, zip"
                      value={locationInfo.pickupAddress}
                      onChange={(e) => setLocationInfo({ ...locationInfo, pickupAddress: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Destination Address *</label>
                    <Input
                      placeholder="Hospital or medical facility address"
                      value={locationInfo.destinationAddress}
                      onChange={(e) => setLocationInfo({ ...locationInfo, destinationAddress: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Pickup Instructions</label>
                    <Textarea
                      placeholder="Special instructions for pickup location (apartment number, building entrance, etc.)"
                      value={locationInfo.pickupInstructions}
                      onChange={(e) => setLocationInfo({ ...locationInfo, pickupInstructions: e.target.value })}
                      className="min-h-16"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Service Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Service Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Service Type *</label>
                    <Select
                      value={serviceDetails.serviceType}
                      onValueChange={(value) => setServiceDetails({ ...serviceDetails, serviceType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Urgency Level *</label>
                    <Select
                      value={serviceDetails.urgencyLevel}
                      onValueChange={(value) => setServiceDetails({ ...serviceDetails, urgencyLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div>
                              <div className="font-medium">{level.label}</div>
                              <div className="text-xs text-muted-foreground">{level.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {bookingType === "non-emergency" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Preferred Date</label>
                        <Input
                          type="date"
                          value={serviceDetails.scheduledDate}
                          onChange={(e) => setServiceDetails({ ...serviceDetails, scheduledDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Preferred Time</label>
                        <Input
                          type="time"
                          value={serviceDetails.scheduledTime}
                          onChange={(e) => setServiceDetails({ ...serviceDetails, scheduledTime: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium mb-2 block">Special Requirements</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {specialRequirements.map((requirement) => (
                        <div key={requirement} className="flex items-center space-x-2">
                          <Checkbox
                            id={requirement}
                            checked={serviceDetails.specialRequirements.includes(requirement)}
                            onCheckedChange={(checked: boolean) =>
                              handleSpecialRequirementChange(requirement, checked)
                            }
                          />
                          <label htmlFor={requirement} className="text-sm">
                            {requirement}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Service Type:</span>
                      <span className="text-sm font-medium">
                        {serviceDetails.serviceType
                          ? serviceTypes.find((t) => t.value === serviceDetails.serviceType)?.label
                          : "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Urgency:</span>
                      <Badge
                        variant={serviceDetails.urgencyLevel === "emergency" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {serviceDetails.urgencyLevel || "Not selected"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Estimated Time:</span>
                      <span className="text-sm font-medium flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {estimatedTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Special Requirements:</span>
                      <span className="text-sm font-medium">{serviceDetails.specialRequirements.length || 0}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Estimated Cost:</span>
                      <span className="text-xl font-bold text-primary">{estimatedCost}</span>
                    </div>

                    <Button
                      onClick={handleBooking}
                      className="w-full hover-lift bg-orange-600 hover:bg-orange-700"
                      disabled={!patientInfo.name || !locationInfo.pickupAddress || !serviceDetails.serviceType}
                    >
                      {bookingType === "emergency" ? (
                        <>
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Book Emergency Ambulance
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Ambulance
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Final cost may vary based on actual distance and services provided
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-8 w-8 text-red-600" />
                    <div>
                      <h4 className="font-medium text-red-800">Need Immediate Help?</h4>
                      <p className="text-sm text-red-700">Call our emergency dispatch</p>
                      <Button
                        className="mt-2 px-3 py-1 text-sm border-red-500 text-red-700 hover:bg-red-50 bg-transparent"
                        onClick={() => window.open("tel:911")}
                      >
                        Call 911
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
