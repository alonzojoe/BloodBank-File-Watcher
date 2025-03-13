import { useState, useEffect } from 'react'
import { TimeLeft } from '../types/index'
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds
} from 'date-fns'

type TimerProps = {
  dateActivated: Date | null
  isActivated: boolean
}

const getManilaTime = (): Date => {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }))
}

const Timer = ({ dateActivated, isActivated }: TimerProps): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = getManilaTime()

      if (isActivated && dateActivated) {
        const days = Math.abs(differenceInDays(now, dateActivated))
        const hours = Math.abs(differenceInHours(now, dateActivated) % 24)
        const minutes = Math.abs(differenceInMinutes(now, dateActivated) % 60)
        const seconds = Math.abs(differenceInSeconds(now, dateActivated) % 60)

        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return (): void => clearInterval(timer)
  }, [isActivated, dateActivated])

  const DAYS = timeLeft.days.toString().padStart(2, '0')
  const HOURS = timeLeft.hours.toString().padStart(2, '0')
  const MINUTES = timeLeft.minutes.toString().padStart(2, '0')
  const SECONDS = timeLeft.seconds.toString().padStart(2, '0')

  const Formatted_Timer = `${DAYS}:${HOURS}:${MINUTES}:${SECONDS}`

  const timerMessage = isActivated ? `Connecting time` : `Not Connected`

  return (
    <>
      <div className="border border-primary rounded-2xl py-3 text-center">
        <h1 className="font-bold text-5xl">{Formatted_Timer}</h1>
      </div>
      <h2 className="text-center text-textSecondary">{timerMessage}</h2>
    </>
  )
}

export default Timer
