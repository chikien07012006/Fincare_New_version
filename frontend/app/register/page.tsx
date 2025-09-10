"use client"

import type React from "react"

import { useState } from "react"
import { Building2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Thêm các state để quản lý dữ liệu từ form
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    if (!firstName || !lastName || !email || !password) {
      console.error("All fields are required");
      return;
    }

    // Combine first and last name to get full name
    const fullName = `${firstName} ${lastName}`

    try {
      // Gọi API đăng ký từ backend Django
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          password: password, // Assuming username is the same as email
        }),
      })

      const data = await response.json()
      console.log("Response Status:", response.status); // Log status code
      console.log("Response Data:", data); // Log dữ liệu trả về

      console.log("Response:", data);
      if (response.ok) {
        // Đăng ký thành công, chuyển hướng đến trang đăng nhập
        console.log("Registration successful!")
        // Using window.location.href for local testing since Next.js router might not be available
        window.location.href = "/login"
      } else {
        // Xử lý lỗi từ backend
        const errorMessage = Object.values(data).flat().join(" ")
        setError(errorMessage || "Registration failed. Please try again.")
      }
    } catch (err) {
      // Xử lý lỗi mạng hoặc lỗi không mong muốn
      console.error("Registration failed:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <a href="/" className="flex items-center gap-2 font-bold text-xl">
              <Building2 className="h-6 w-6 text-primary" />
              <span>FinCare</span>
            </a>
          </div>
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create your FinCare account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="text-sm text-red-500 text-center">{error}</div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={3}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline">
                Log in
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
