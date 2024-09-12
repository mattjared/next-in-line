// app/actions.ts
'use server'

import { Redis } from '@upstash/redis'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
})

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

export async function subscribeToWaitlist(formData: FormData) {
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