export interface TerminalMessage {
  timestamp: string
  color: string
  text: string
}

export interface DriveErrorMessage {
  message: string
  plural: string
}

export interface Drive {
  isDisabled: boolean
  title: string
  message: string
}

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface TimerData {
  isActivated: boolean
  dateActivated: Date | null
}

export type TMessage = {
  timestamp: string
  color: string
  text: string
}
