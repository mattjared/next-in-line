// This example uses Redis from Upstash but you can use any KV store
// See the README.md for more examples and documentation

'use server'
import { z } from 'zod'
import { Redis } from '@upstash/redis'

export async function subscribeToWaitlist(formData: FormData) {
  const redis = new Redis({
    url: process.env.KV_API_URL!,
    token: process.env.KV_API_TOKEN!
  })

  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(2).max(100),
  })
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
  })

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid input. Please check your entries.' }
  }

  const { email, name } = validatedFields.data

  try {
    // Check if the email already exists
    const exists = await redis.sismember('waitlist:emails', email)
    if (exists) {
      return { success: false, message: 'This email is already on the waitlist.' }
    }

    // Add email to the set of waitlist emails
    await redis.sadd('waitlist:emails', email)

    // Store the full entry as a hash
    await redis.hset(`waitlist:entry:${email}`, {
      name,
      email,
      joinedAt: new Date().toISOString()
    })

    console.log(`Subscribed: ${name} (${email})`)
    return { success: true, message: 'Thank you for joining our waitlist!' }
  } catch (error) {
    console.error('Error adding to waitlist:', error)
    return { success: false, message: 'An error occurred. Please try again later.' }
  }
}

// Utils
export const checkKVAvailability = async () => !!process.env.KV_API_TOKEN;