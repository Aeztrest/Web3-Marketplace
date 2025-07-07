"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Wallet, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type ConnectionState = "idle" | "connecting" | "connected"

export default function LoginPage() {
  const [connectionState, setConnectionState] = useState<ConnectionState>("idle")
  const [userNickname] = useState("Aeztrest")
  const router = useRouter()

  const handleConnectWallet = async () => {
    setConnectionState("connecting")

    // Mock wallet connection delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Simulate successful wallet connection
    setConnectionState("connected")
  }

  // Auto-redirect after successful connection
  useEffect(() => {
    if (connectionState === "connected") {
      const timer = setTimeout(() => {
        router.push("/")
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [connectionState, router])

  const getButtonContent = () => {
    switch (connectionState) {
      case "connecting":
        return (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Connecting...
          </>
        )
      case "connected":
        return (
          <>
            <CheckCircle className="w-5 h-5 mr-2" />
            Connected!
          </>
        )
      default:
        return (
          <>
            <Wallet className="w-5 h-5 mr-2" />
            Connect with Wallet
          </>
        )
    }
  }

  const getButtonStyles = () => {
    switch (connectionState) {
      case "connected":
        return "bg-green-600 hover:bg-green-700 text-white"
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-8 sm:p-10 text-center space-y-8">
            {/* Logo/Brand */}
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <span className="text-2xl font-bold text-white">CG</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 tracking-tight">ChainGo</div>
            </div>

            {/* Headlines */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">Welcome to ChainGo</h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-sm mx-auto">
                Connect your wallet to start trading securely
              </p>
            </div>

            {/* Connection Status */}
            {connectionState === "connected" && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Logged in as {userNickname}</span>
                </div>
                <p className="text-sm text-green-600">Redirecting to marketplace...</p>
              </div>
            )}

            {/* Connect Button */}
            <div className="space-y-4">
              <Button
                onClick={handleConnectWallet}
                disabled={connectionState !== "idle"}
                className={`w-full py-4 px-8 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${getButtonStyles()}`}
              >
                {getButtonContent()}
              </Button>

              {/* Powered by text */}
              <p className="text-sm text-gray-500 flex items-center justify-center space-x-1">
                <span>Powered by</span>
                <span className="font-semibold text-orange-600">Stacks</span>
                <span>blockchain</span>
              </p>
            </div>

            {/* Loading Animation */}
            {connectionState === "connecting" && (
              <div className="space-y-4">
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">Connecting to Hiro Wallet...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-sm text-gray-500">
            New to Web3?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
              Learn about wallets
            </a>
          </p>
          <p className="text-xs text-gray-400">Secure • Decentralized • Trustless</p>
        </div>
      </div>
    </div>
  )
}
