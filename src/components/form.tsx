'use client'

import { useState, FormEvent } from 'react'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { subscribeToWaitlist } from '@/app/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardContent, CardFooter } from "@/components/ui/card"

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must not exceed 100 characters" }),
})

type FormData = z.infer<typeof schema>

export default function WaitlistForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<{ success: boolean; message: string } | null>(null)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

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
      setErrors({});
      setNameValue("");
      setEmailValue("");
    }
  }

  return (
    <>
      <CardContent>
        <form onSubmit={handleSubmit} className="pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="John Doe" 
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="john@example.com" 
              value={emailValue} 
              onChange={(e) => setEmailValue(e.target.value)}
            />
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
    </>
  )
}