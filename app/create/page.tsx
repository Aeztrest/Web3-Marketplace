"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Upload, LinkIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreateListingPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    imageFile: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [walletAddress] = useState("SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, imageFile: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Listing created:", formData)
    setIsSubmitting(false)

    // Reset form
    setFormData({
      title: "",
      description: "",
      price: "",
      imageUrl: "",
      imageFile: null,
    })
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
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Create New Listing</CardTitle>
            <p className="text-gray-600">Fill out the details below to list your item on ChainGo</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter listing title"
                  className="bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your item in detail"
                  rows={4}
                  className="bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                  Price (STX) *
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Image (Optional)</Label>

                <Tabs defaultValue="url" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="url" className="flex items-center space-x-2">
                      <LinkIcon className="w-4 h-4" />
                      <span>Image URL</span>
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Upload File</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="url" className="mt-4">
                    <Input
                      name="imageUrl"
                      type="url"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                    />
                  </TabsContent>

                  <TabsContent value="upload" className="mt-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</div>
                      <div className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</div>
                      <Input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              >
                {isSubmitting ? "Publishing..." : "Publish Listing"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
