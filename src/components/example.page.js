/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jVJ3tM1nuy1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Exclusive Early Access
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Be one of the first to experience our revolutionary new product. Join the waitlist now and get early
                access to exclusive features and pricing.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="w-full max-w-sm space-y-2">
                <form className="flex gap-2">
                  <Input type="text" placeholder="Name" className="max-w-lg flex-1" />
                  <Input type="email" placeholder="Email" className="max-w-lg flex-1" />
                </form>
                <Button type="submit" className="w-full">
                  Join the Waitlist
                </Button>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="underline underline-offset-2" prefetch={false}>
                    Terms &amp; Conditions
                  </Link>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-muted p-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Countdown to Launch</h2>
                  <p className="text-muted-foreground">Don't miss your chance to be an early adopter!</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <ClockIcon className="w-6 h-6 text-primary" />
                  <div className="text-3xl font-bold" />
                </div>
              </div>
            </div>
          </div>
          <img
            src="/placeholder.svg"
            width="550"
            height="310"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  )
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}