import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import CountdownTimer from '@/components/countdown-timer'
import EnvCard from '@/components/envcard'
import Form from "@/components/form";

export default function Home() {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      <EnvCard />
      <Card className="w-full max-w-md">
        <CardHeader>
          {/* <CountdownTimer /> */}
          <CardTitle className="text-2xl font-bold text-center">Join Our Waitlist</CardTitle>
          <CardDescription className="text-center">Be the first to know when we launch!</CardDescription>
          <Form />
        </CardHeader>
      </Card>
    </div>
  )
}