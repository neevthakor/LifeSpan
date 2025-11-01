"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, ArrowLeft, FileText, Pill, Plus, Trash2, Download, Send, User, MapPin } from "lucide-react"
import Link from "next/link"

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

export default function EPrescriptionPage() {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "30 days",
      instructions: "Take with food in the morning",
    },
  ])

  const [patientInfo, setPatientInfo] = useState({
    name: "Neel Patel",
    age: "18",
    gender: "Male",
    phone: "(555) 123-4567",
    email: "neelpatel13@email.com",
  })

  const [doctorInfo] = useState({
    name: "Dr. Niraj Sharma ",
    specialty: "Cardiology",
    license: "MD12345",
    clinic: "Heart Care Center",
    address: "123 Medical Plaza, Suite 200",
    phone: "(555) 987-6543",
  })

  const [diagnosis, setDiagnosis] = useState("Hypertension - Essential")
  const [additionalNotes, setAdditionalNotes] = useState(
    "Patient reports improved symptoms. Continue current medication regimen.",
  )

  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    }
    setMedications([...medications, newMedication])
  }

  const updateMedication = (id: string, field: keyof Medication, value: string) => {
    setMedications(medications.map((med) => (med.id === id ? { ...med, [field]: value } : med)))
  }

  const removeMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id))
  }

  const generatePrescription = () => {
    // In a real app, this would generate a PDF or send to pharmacy
    alert("Prescription generated and sent to patient's preferred pharmacy!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/video-consultation" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Activity className="h-8 w-8 text-primary animate-pulse-gentle" />
            <span className="text-2xl font-bold text-foreground">Lifespan</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Badge variant="default" className="bg-blue-500">
              <FileText className="h-4 w-4 mr-1" />
              E-Prescription
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
              <Pill className="h-8 w-8 text-blue-500" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-balance mb-2">
              Electronic <span className="text-blue-500">Prescription</span>
            </h1>
            <p className="text-lg text-muted-foreground">Create and manage digital prescriptions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Doctor Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Doctor Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">{doctorInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Specialty</p>
                  <p className="text-sm text-muted-foreground">{doctorInfo.specialty}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">License Number</p>
                  <p className="text-sm text-muted-foreground">{doctorInfo.license}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Clinic</p>
                  <p className="text-sm text-muted-foreground">{doctorInfo.clinic}</p>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {doctorInfo.address}
                </div>
              </CardContent>
            </Card>

            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Name</p>
                    <Input
                      value={patientInfo.name}
                      onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Age</p>
                    <Input
                      value={patientInfo.age}
                      onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Gender</p>
                  <Select
                    value={patientInfo.gender}
                    onValueChange={(value) => setPatientInfo({ ...patientInfo, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Phone</p>
                  <Input
                    value={patientInfo.phone}
                    onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Email</p>
                  <Input
                    value={patientInfo.email}
                    onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Diagnosis */}
          <Card>
            <CardHeader>
              <CardTitle>Diagnosis</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter diagnosis..."
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="min-h-20"
              />
            </CardContent>
          </Card>

          {/* Medications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Pill className="h-5 w-5 mr-2" />
                  Medications
                </span>
                <Button onClick={addMedication} size="sm" className="hover-lift">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {medications.map((medication, index) => (
                <Card key={medication.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Medication {index + 1}</h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeMedication(medication.id)}
                        className="hover-lift"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Medication Name</p>
                        <Input
                          placeholder="e.g., Lisinopril"
                          value={medication.name}
                          onChange={(e) => updateMedication(medication.id, "name", e.target.value)}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Dosage</p>
                        <Input
                          placeholder="e.g., 10mg"
                          value={medication.dosage}
                          onChange={(e) => updateMedication(medication.id, "dosage", e.target.value)}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Frequency</p>
                        <Select
                          value={medication.frequency}
                          onValueChange={(value) => updateMedication(medication.id, "frequency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Once daily">Once daily</SelectItem>
                            <SelectItem value="Twice daily">Twice daily</SelectItem>
                            <SelectItem value="Three times daily">Three times daily</SelectItem>
                            <SelectItem value="Four times daily">Four times daily</SelectItem>
                            <SelectItem value="As needed">As needed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Duration</p>
                        <Input
                          placeholder="e.g., 30 days"
                          value={medication.duration}
                          onChange={(e) => updateMedication(medication.id, "duration", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium mb-1">Special Instructions</p>
                      <Textarea
                        placeholder="e.g., Take with food, avoid alcohol"
                        value={medication.instructions}
                        onChange={(e) => updateMedication(medication.id, "instructions", e.target.value)}
                        className="min-h-16"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Any additional instructions or notes for the patient..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="min-h-24"
              />
            </CardContent>
          </Card>

          {/* Prescription Summary */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Prescription Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Patient: {patientInfo.name}</p>
                  <p className="text-sm text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Dr. {doctorInfo.name}</p>
                  <p className="text-sm text-muted-foreground">{doctorInfo.specialty}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-medium mb-2">Medications Prescribed:</p>
                <div className="space-y-2">
                  {medications.map((med, index) => (
                    <div key={med.id} className="bg-white/50 rounded-lg p-3">
                      <p className="font-medium">
                        {med.name || `Medication ${index + 1}`} - {med.dosage}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {med.frequency} for {med.duration}
                      </p>
                      {med.instructions && (
                        <p className="text-sm text-blue-600 mt-1">Instructions: {med.instructions}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button onClick={generatePrescription} className="flex-1 hover-lift">
                  <Send className="h-4 w-4 mr-2" />
                  Send to Pharmacy
                </Button>
                <Button variant="outline" className="flex-1 hover-lift bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
