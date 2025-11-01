"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Activity, ArrowLeft, CreditCard, Smartphone, QrCode, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [selectedPayment, setSelectedPayment] = useState("upi")
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "success" | "failed">("pending")
  const [upiId, setUpiId] = useState("")

  const doctorName = searchParams.get("doctor") || "Dr. Sarah Johnson"
  const consultationFee = searchParams.get("fee") || "$150"
  const timeSlot = searchParams.get("slot") || "2:30 PM"

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI Payment",
      description: "Pay using UPI ID or QR Code",
      icon: Smartphone,
      popular: true,
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, Rupay accepted",
      icon: CreditCard,
      popular: false,
    },
    {
      id: "qr",
      name: "QR Code",
      description: "Scan and pay with any UPI app",
      icon: QrCode,
      popular: false,
    },
  ]

  const handlePayment = () => {
    setPaymentStatus("processing")
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("success")
    }, 3000)
  }

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center">
        <Card className="max-w-md mx-auto animate-fade-in">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-4">
              Your appointment with {doctorName} has been confirmed for {timeSlot}
            </p>
            <div className="space-y-2 mb-6">
              <Badge variant="outline" className="w-full justify-center py-2">
                Appointment ID: APT-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </Badge>
              <Badge variant="secondary" className="w-full justify-center py-2">
                Amount Paid: {consultationFee}
              </Badge>
            </div>
            <Button onClick={() => (window.location.href = "/human-health")} className="w-full">
              Back to Health Services
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/human-health/doctors" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Activity className="h-8 w-8 text-primary animate-pulse-gentle" />
            <span className="text-2xl font-bold text-foreground">Lifespan</span>
          </Link>

          <Badge variant="secondary">Secure Payment</Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Appointment Summary */}
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
              <CardDescription>Review your booking details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doctor:</span>
                  <span className="font-medium">{doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Slot:</span>
                  <span className="font-medium">{timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consultation Fee:</span>
                  <span className="font-bold text-primary">{consultationFee}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
              <CardDescription>Choose your preferred payment option</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon
                  return (
                    <div
                      key={method.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover-lift ${
                        selectedPayment === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5 text-primary" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{method.name}</span>
                              {method.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedPayment === method.id ? "border-primary bg-primary" : "border-muted-foreground"
                          }`}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* UPI Payment Form */}
          {selectedPayment === "upi" && (
            <Card className="mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle>UPI Payment Details</CardTitle>
                <CardDescription>Enter your UPI ID to proceed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter UPI ID (e.g., user@paytm)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <div className="text-sm text-muted-foreground">
                    Popular UPI apps: PhonePe, Google Pay, Paytm, BHIM
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Button */}
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <Button
                onClick={handlePayment}
                disabled={paymentStatus === "processing" || (selectedPayment === "upi" && !upiId)}
                className="w-full h-12 text-lg hover-lift"
              >
                {paymentStatus === "processing" ? (
                  <>
                    <Clock className="h-5 w-5 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pay {consultationFee}
                  </>
                )}
              </Button>

              <div className="text-center mt-4 text-sm text-muted-foreground">
                🔒 Your payment is secured with 256-bit SSL encryption
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
