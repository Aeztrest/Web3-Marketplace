"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, User, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Listing {
  id: string
  title: string
  price: number
  image: string
  status: "Available" | "Sold"
  seller: string
  description: string
}

const mockListings: Listing[] = [
  {
    id: "1",
    title: "Digital Art Collection #001",
    price: 25.5,
    image: "/placeholder.svg?height=300&width=300",
    status: "Available",
    seller: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
    description: "Unique digital artwork with vibrant colors",
  },
  {
    id: "2",
    title: "Vintage Bitcoin Poster",
    price: 12.0,
    image: "/placeholder.svg?height=300&width=300",
    status: "Sold",
    seller: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE",
    description: "Classic Bitcoin promotional poster from 2017",
  },
  {
    id: "3",
    title: "Crypto Trading Course",
    price: 45.0,
    image: "/placeholder.svg?height=300&width=300",
    status: "Available",
    seller: "SP1K1A1PMGW2BQ2N4B5N3CHBNYYJSM4DM2F7N6TNH",
    description: "Complete guide to cryptocurrency trading",
  },
  {
    id: "4",
    title: "NFT Marketplace Template",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    status: "Available",
    seller: "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9",
    description: "Ready-to-use NFT marketplace template",
  },
  {
    id: "5",
    title: "Web3 Development Guide",
    price: 33.5,
    image: "/placeholder.svg?height=300&width=300",
    status: "Available",
    seller: "SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335",
    description: "Comprehensive Web3 development tutorial",
  },
  {
    id: "6",
    title: "Stacks Logo Design Pack",
    price: 18.75,
    image: "/placeholder.svg?height=300&width=300",
    status: "Available",
    seller: "SP1WTA0YBPC5R6GDMPPJCEDEA6Z2ZEPNMQ4C8TSNW",
    description: "Professional Stacks blockchain logo designs",
  },
  {
    id: "7",
    title: "DeFi Analytics Dashboard",
    price: 67.25,
    image: "/placeholder.svg?height=300&width=300",
    status: "Sold",
    seller: "SP4H8RX0RJKD2NKZN2K5PQRST6UVWXYZ1234ABCD",
    description: "Real-time DeFi analytics and tracking tool",
  },
  {
    id: "8",
    title: "Smart Contract Audit Report",
    price: 156.0,
    image: "/placeholder.svg?height=300&width=300",
    status: "Available",
    seller: "SP5I9SY1SKLE3OLZO3L6QRSTU7VWXYZ2345BCDE",
    description: "Professional smart contract security audit",
  },
]

export default function HomePage() {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean | null>(null)
  const [userNickname] = useState("Aeztrest")
  const [walletAddress] = useState("SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7")
  const [listings] = useState<Listing[]>(mockListings)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check wallet connection status on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      // Simulate checking wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, randomly determine if wallet is connected
      // In real app, this would check actual wallet connection
      const connected = Math.random() > 0.3 // 70% chance of being connected

      setIsWalletConnected(connected)
      setIsLoading(false)

      // Redirect to login if not connected
      if (!connected) {
        router.push("/login")
      }
    }

    checkWalletConnection()
  }, [router])

  const filteredListings = listings.filter((listing) => listing.title.toLowerCase().includes(searchTerm.toLowerCase()))

  // Show loading state while checking wallet connection
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Checking wallet connection...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if wallet is not connected (will redirect)
  if (!isWalletConnected) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">CG</span>
              </div>
              <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                ChainGo
              </Link>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/create">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Listing
                </Button>
              </Link>

              {/* Wallet Address Display */}
              <div className="flex items-center space-x-3 bg-green-50 px-4 py-2 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                <User className="w-4 h-4 text-green-600" />
                <div className="text-sm">
                  <div className="font-medium text-green-700">{userNickname}</div>
                  <div className="text-xs text-green-600 font-mono">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Welcome, {userNickname}! 👋</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover amazing digital assets and start trading on the decentralized marketplace
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search marketplace..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-200 shadow-sm"
              />
            </div>
            <div className="text-sm text-gray-600">
              {filteredListings.length} {filteredListings.length === 1 ? "item" : "items"} found
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <Link key={listing.id} href={`/listing/${listing.id}`}>
              <Card className="bg-white shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer group">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant={listing.status === "Available" ? "default" : "secondary"}
                      className={
                        listing.status === "Available"
                          ? "bg-green-100 text-green-800 border-green-200 shadow-sm"
                          : "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    >
                      {listing.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {listing.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-blue-600">{listing.price} STX</div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>

                  <div className="text-xs text-gray-500 font-mono">
                    by {listing.seller.slice(0, 8)}...{listing.seller.slice(-6)}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or browse all listings</p>
            <Button
              onClick={() => setSearchTerm("")}
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Clear Search
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Powered by <span className="font-semibold text-orange-600">Stacks</span> blockchain
            </p>
            <p className="text-xs text-gray-500">Secure • Decentralized • Trustless</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
