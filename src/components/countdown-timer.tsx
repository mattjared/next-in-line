'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CountdownTimer() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [inputTime, setInputTime] = useState('')

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsRunning(false)
    }

    return () => clearInterval(interval)
  }, [isRunning, time])

  const handleStart = () => {
    if (time > 0) {
      setIsRunning(true)
    }
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
    setInputTime('')
  }

  const handleSetTime = () => {
    const newTime = parseInt(inputTime)
    if (!isNaN(newTime) && newTime > 0) {
      setTime(newTime)
      setInputTime('')
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Countdown Timer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold tabular-nums" aria-live="polite">
            {formatTime(time)}
          </div>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Set time in seconds"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              className="w-40"
            />
            <Button onClick={handleSetTime}>Set</Button>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleStart} disabled={isRunning || time === 0}>
              Start
            </Button>
            <Button onClick={handlePause} disabled={!isRunning}>
              Pause
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}