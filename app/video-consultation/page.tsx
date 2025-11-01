"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Activity,
  ArrowLeft,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageSquare,
  FileText,
  Camera,
  Settings,
  Users,
  Clock,
  Send,
  Pill,
  Bell,
} from "lucide-react"
import Link from "next/link"

export default function VideoConsultationPage() {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isCallActive, setIsCallActive] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { sender: "Dr. Niraj Sharma ", message: "Hello! I can see you're ready for our consultation.", time: "2:30 PM" },
    { sender: "You", message: "Yes, thank you doctor. I'm having some chest discomfort.", time: "2:31 PM" },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [consultationNotes, setConsultationNotes] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mock doctor info from URL params
  const doctorInfo = {
    name: "Dr. Niraj Sharma",
    specialty: "Cardiology",
    consultationFee: "Rs 500",
    appointmentTime: "2:30 PM - 3:00 PM",
  }

  useEffect(() => {
    // Simulate video stream
    if (videoRef.current && isVideoOn) {
      // In a real app, this would be WebRTC stream
      videoRef.current.src = "/patient-video-call.png"
    }
  }, [isVideoOn])

  const toggleVideo = () => setIsVideoOn(!isVideoOn)
  const toggleAudio = () => setIsAudioOn(!isAudioOn)
  const toggleCall = () => setIsCallActive(!isCallActive)

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          sender: "You",
          message: newMessage,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/human-health/doctors" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Activity className="h-8 w-8 text-primary animate-pulse-gentle" />
            <span className="text-2xl font-bold text-foreground">Lifespan</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Badge variant="default" className="bg-green-500">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              Live Consultation
            </Badge>
            <Badge variant="secondary">
              <Clock className="h-4 w-4 mr-1" />
              {doctorInfo.appointmentTime}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Doctor Video */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative bg-gray-900 aspect-video">
                  <img
                    src="/doctor-video-consultation-professional-medical.jpg"
                    alt="Doctor Video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      {doctorInfo.name} - {doctorInfo.specialty}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant={isCallActive ? "default" : "destructive"} className="bg-black/50">
                      {isCallActive ? "Connected" : "Connecting..."}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patient Video (Picture-in-Picture) */}
            <Card className="relative">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Your Video</h3>
                  <div className="flex space-x-2">
                    <Button variant={isVideoOn ? "default" : "destructive"} size="sm" onClick={toggleVideo}>
                      {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    <Button variant={isAudioOn ? "default" : "destructive"} size="sm" onClick={toggleAudio}>
                      {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="relative bg-gray-800 aspect-video rounded-lg overflow-hidden">
                  {isVideoOn ? (
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Call Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-center space-x-4">
                  <Button
                    variant={isVideoOn ? "default" : "destructive"}
                    size="lg"
                    onClick={toggleVideo}
                    className="hover-lift"
                  >
                    {isVideoOn ? <Video className="h-5 w-5 mr-2" /> : <VideoOff className="h-5 w-5 mr-2" />}
                    {isVideoOn ? "Video On" : "Video Off"}
                  </Button>

                  <Button
                    variant={isAudioOn ? "default" : "destructive"}
                    size="lg"
                    onClick={toggleAudio}
                    className="hover-lift"
                  >
                    {isAudioOn ? <Mic className="h-5 w-5 mr-2" /> : <MicOff className="h-5 w-5 mr-2" />}
                    {isAudioOn ? "Mic On" : "Mic Off"}
                  </Button>

                  <Button
                    variant={isCallActive ? "destructive" : "default"}
                    size="lg"
                    onClick={toggleCall}
                    className="hover-lift"
                  >
                    {isCallActive ? <PhoneOff className="h-5 w-5 mr-2" /> : <Phone className="h-5 w-5 mr-2" />}
                    {isCallActive ? "End Call" : "Start Call"}
                  </Button>

                  <Button variant="outline" size="lg" className="hover-lift bg-transparent">
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Consultation Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Consultation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Doctor</p>
                  <p className="text-sm text-muted-foreground">{doctorInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Specialty</p>
                  <p className="text-sm text-muted-foreground">{doctorInfo.specialty}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">{doctorInfo.appointmentTime}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Fee</p>
                  <Badge variant="outline">{doctorInfo.consultationFee}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Chat */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-48 overflow-y-auto space-y-2 border rounded-lg p-3">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs rounded-lg p-2 text-sm ${
                          msg.sender === "You"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        <p className="font-medium text-xs mb-1">{msg.sender}</p>
                        <p>{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button size="sm" onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Consultation Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Doctor's consultation notes will appear here..."
                  value={consultationNotes}
                  onChange={(e) => setConsultationNotes(e.target.value)}
                  className="min-h-24"
                  readOnly
                />
              </CardContent>
            </Card>

            {/* E-Prescription Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <Link href="/e-prescription">
                  <Button className="w-full hover-lift bg-blue-500 hover:bg-blue-600">
                    <Pill className="h-4 w-4 mr-2" />
                    Create E-Prescription
                  </Button>
                </Link>
                
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Generate digital prescription for this consultation
                </p>
              </CardContent>
            </Card>

            {/* Medicine Reminder Card */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <a 
                  href="/reminder-widget.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full hover-lift bg-gradient-to-r from-purple-600 to-Blue-600 hover:from-purple-700 hover:to-pink-700">
                    <Bell className="h-4 w-4 mr-2" />
                    Set Medicine Reminders
                  </Button>
                </a>
                
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Never miss your medication schedule
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}