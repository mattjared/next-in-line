'use client'

import { useState, FormEvent } from 'react'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { subscribeToWaitlist } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Icons } from "@/components/ui/icons"

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must not exceed 100 characters" }),
})

type FormData = z.infer<typeof schema>

export default function WaitlistForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<{ success: boolean; message: string } | null>(null)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
    }

    const validationResult = schema.safeParse(data)

    if (!validationResult.success) {
      const fieldErrors: Partial<FormData> = {}
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0] === 'email' || issue.path[0] === 'name') {
          fieldErrors[issue.path[0]] = issue.message
        }
      })
      setErrors(fieldErrors)
      setIsLoading(false)
      return
    }

    const result = await subscribeToWaitlist(formData)
    setResponse(result)
    setIsLoading(false)

    if (result.success) {
      e.currentTarget.reset()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Join Our Waitlist</CardTitle>
          <CardDescription className="text-center">Be the first to know when we launch!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="John Doe" />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="john@example.com" />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  {/* <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
                  Please wait
                </>
              ) : (
                'Join Waitlist'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center w-full ${response.success ? 'text-green-600' : 'text-red-600'}`}
            >
              {response.message}
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}