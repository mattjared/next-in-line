// app/actions.ts
'use server'

import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
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

  // TODO: Add your own logic here to save the email and name to your database or send to an API
  // This is a mock implementation
  await new Promise(resolve => setTimeout(resolve, 1000))

  console.log(`Subscribed: ${name} (${email})`)

  return { success: true, message: 'Thank you for joining our waitlist!' }
}