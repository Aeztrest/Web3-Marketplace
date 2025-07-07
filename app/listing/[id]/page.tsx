"use client"

import { useState } from "react"
import { ArrowLeft, User, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Listing {
  id: string
  title: string
  description: string
  price: number
  image: string
  status: "Available" | "Sold"
  seller: string
  createdAt: string
}

const mockListing: Listing = {
  id: "1",
  title: "Digital Art Collection #001",
  description:
    "A unique digital art collection featuring abstract designs and vibrant colors. This NFT represents hours of creative work and comes with full commercial rights. Perfect for collectors and art enthusiasts looking to own a piece of digital history.",
  price: 25.5,
  image: "/placeholder.svg?height=400&width=400",
  status: "Available",
  seller: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
  createdAt: "2024-01-15",
}

type TransactionStatus = "idle" | "pending" | "success" | "error"

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const [listing] = useState<Listing>(mockListing)
  const [walletAddress] = useState("SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE")
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>("idle")

  const isOwner = walletAddress === listing.seller
  const canPurchase = listing.status === "Available" && !isOwner && walletAddress

  const handlePurchase = async () => {
    if (!canPurchase) return

    setTransactionStatus("pending")

    // Mock transaction delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Simulate random success/failure
    const success = Math.random() > 0.3
    setTransactionStatus(success ? "success" : "error")

    // Reset after 5 seconds
    setTimeout(() => {
      setTransactionStatus("idle")
    }, 5000)
  }

  const getTransactionAlert = () => {
    switch (transactionStatus) {
      case "pending":
        return (
          <Alert className="border-blue-200 bg-blue-50">
            <Clock className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Transaction pending... Please wait while we process your purchase.
            </AlertDescription>
          </Alert>
        )
      case "success":
        return (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">Purchase successful! The item is now yours.</AlertDescription>
          </Alert>
        )
      case "error":
        return (
          <Alert className="border-red-200 bg-red-50">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Transaction failed. Please try again or check your wallet balance.
            </AlertDescription>
          </Alert>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Marketplace
                </Button>
              </Link>
              <div className="text-2xl font-bold text-blue-600">ChainGo</div>
            </div>

            {walletAddress && (
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden bg-white shadow-sm border border-gray-200">
              <div className="aspect-square relative">
                <Image src={listing.image || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
              </div>
            </Card>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
                <Badge
                  variant={listing.status === "Available" ? "default" : "secondary"}
                  className={
                    listing.status === "Available"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-gray-100 text-gray-600"
                  }
                >
                  {listing.status}
                </Badge>
              </div>

              <div className="text-4xl font-bold text-blue-600 mb-6">{listing.price} STX</div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Description</h2>
              <p className="text-gray-700 leading-relaxed">{listing.description}</p>
            </div>

            <Card className="bg-gray-50 border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Seller</div>
                    <div className="text-sm text-gray-600 font-mono">
                      {listing.seller.slice(0, 8)}...{listing.seller.slice(-8)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Status */}
            {transactionStatus !== "idle" && <div className="space-y-4">{getTransactionAlert()}</div>}

            {/* Purchase Button */}
            <div className="space-y-4">
              {!walletAddress ? (
                <Button disabled className="w-full py-3 text-lg">
                  Connect Wallet to Purchase
                </Button>
              ) : isOwner ? (
                <Button disabled className="w-full py-3 text-lg">
                  You Own This Item
                </Button>
              ) : listing.status === "Sold" ? (
                <Button disabled className="w-full py-3 text-lg">
                  Item Sold
                </Button>
              ) : (
                <Button
                  onClick={handlePurchase}
                  disabled={transactionStatus === "pending"}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                >
                  {transactionStatus === "pending" ? "Processing..." : `Buy Now for ${listing.price} STX`}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
