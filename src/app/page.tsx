import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CountdownTimer from '@/components/countdown-timer'
import EnvCard from '@/components/envcard'
import Form from "@/components/form";

export default function Home() {
  
  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col items-center justify-center p-4 inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-800 animate-shift">
      <EnvCard />
        <Card className="w-full max-w-md bg-black bg-opacity-30 p-8 rounded-2xl shadow-2xl backdrop-blur-md z-10 border-0">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-white">Join Our Waitlist</CardTitle>
            <CardDescription className="text-center text-gray-400 pb-4">Be the first to know when we launch!</CardDescription>
          </CardHeader>
          <CountdownTimer />
          <Form />
        </Card>
    </div>
  )
}