import { useState, useReducer, useEffect } from 'react'
import { ACTIONS, driveReducer, initialDriveState } from './reducers/deviceReducer'
import { TerminalMessage, DriveErrorMessage, TimerData } from './types'
import ConnectedBtn from './assets/thunder.png'
import DisconnectedBtn from './assets/off.png'
import Terminal from './components/Terminal'
import useToggle from './hooks/useToggle'
import moment from 'moment'
import Header from './components/Header'
import Message from './components/Message'
import Devices from './components/Devices'
import Timer from './components/Timer'

const { ipcRenderer } = window.electron

const dateNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
const initialMessageState = [
  {
    timestamp: dateNow,
    color: `text-green-500`,
    text: `Welcome to LIS File Watcher`
  }
]

function App(): JSX.Element {
  const startToggle = (): void => ipcRenderer.send('startFileWatcher')
  const stopToggle = (): void => ipcRenderer.send('stopFileWatcher')
  const [isOn, toggleIsOn] = useToggle(false)
  const [messages, setMessages] = useState<TerminalMessage[]>(initialMessageState)
  const [drive, dispatchDrive] = useReducer(driveReducer, initialDriveState)
  const [timerData, setTimerData] = useState<TimerData>({
    isActivated: false,
    dateActivated: null
  })

  ipcRenderer.on('receiveData', (_, data: string) => {
    console.log(data)
  })

  const startFileWatcher = (): void => {
    toggleIsOn()
    startToggle()
    setTimerData({
      isActivated: true,
      dateActivated: new Date()
    })
  }

  const stopFileWatcher = async (): Promise<void> => {
    toggleIsOn()
    stopToggle()
    setTimerData({
      isActivated: false,
      dateActivated: null
    })
  }

  const clearTerminal = (): void => {
    const resetMessage = {
      timestamp: dateNow,
      color: `text-white`,
      text: `The terminal was automatically cleared.`
    } satisfies TerminalMessage

    setMessages([resetMessage])
  }

  useEffect(() => {
    const errorDrive = (data: DriveErrorMessage): void => {
      dispatchDrive({ type: ACTIONS.DISABLE_DRIVE, payload: data })
    }

    const handleData = (_: unknown, data: TerminalMessage): void => {
      console.log('data received in react component', data)
      setMessages((message) => [...message, data])
    }

    const handleDriveData = (_: unknown, data: DriveErrorMessage): void => {
      console.log('data drive-not-found', data)
      errorDrive(data)
    }

    ipcRenderer.on('data-to-component', handleData)
    ipcRenderer.on('drive-not-found', handleDriveData)

    let intervalId: NodeJS.Timeout | null = null

    const startInterval = (): void => {
      if (intervalId) {
        clearInterval(intervalId)
      }

      intervalId = setInterval(() => {
        clearTerminal()
      }, moment.duration(2, 'hours').asMilliseconds())
    }

    const stopInterval = (): void => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }

    let restartIntervalId: NodeJS.Timeout | null = null

    const stopStart = async (): Promise<void> => {
      try {
        console.log('Stopping file watcher')
        await stopFileWatcher()
        console.log('Attempting to start file watcher')
        setTimeout(() => {
          startFileWatcher()
        }, 500)
        console.log('File Watcher restarted.')
      } catch (error) {
        if (error instanceof Error) {
          console.log(`Error restarting file watcher: ${error.message}`)
          return
        }
        console.log(`Error occurred: ${error}`)
      }
    }

    const stopAutoRestart = (): void => {
      if (restartIntervalId) {
        clearInterval(restartIntervalId)
        restartIntervalId = null
      }
    }

    const autoRestart = (): void => {
      stopAutoRestart()

      restartIntervalId = setInterval(() => {
        console.log('Auto restart running')
        stopStart()
      }, moment.duration(1, 'hours').asMilliseconds())
    }

    autoRestart()
    startInterval()

    return (): void => {
      ipcRenderer.removeListener('data-to-component', handleData)
      ipcRenderer.removeListener('drive-not-found', handleDriveData)
      stopInterval()
      stopAutoRestart()
    }
  }, [])

  return (
    <div className="bg-primaryBg  w-full text-white">
      {drive.isDisabled && <Message message={drive.message} title={drive.title} />}
      <div className="container grid gap-5 md:gap-8 grid-cols-1 md:grid-cols-2 pt-5 md:mt-5">
        <div className="space-y-4">
          <Header isOn={isOn} />
          <Timer isActivated={timerData.isActivated} dateActivated={timerData.dateActivated} />
          <Devices deviceConnected={!drive.isDisabled} />
          <div className="flex pt-3 justify-center items-center btn-container">
            <img
              src={isOn ? ConnectedBtn : DisconnectedBtn}
              className="bg-primary rounded-full cursor-pointer btn-pulse h-auto w-[150px] z-10"
              alt="btn"
              onClick={isOn ? stopFileWatcher : startFileWatcher}
            />
            {isOn && <div className="btn-shadow"></div>}
          </div>
        </div>
        <div className="flex flex-col items-center justify-start">
          <div className="hidden md:block w-full">
            {/* <img src={WatcherImg} className="h-auto w-[630px]" alt="asd" /> */}
            <Terminal messages={messages} />
          </div>
          <div className="flex justify-center items-center md:hidden mt-5 w-full">
            <Terminal messages={messages} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
