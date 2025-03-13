import { useState } from 'react'
import { FaNetworkWired } from 'react-icons/fa6'
import { BsFillDeviceHddFill } from 'react-icons/bs'
import useEventListener from '@renderer/hooks/useEventListener'

const Devices = ({ deviceConnected }: { deviceConnected: boolean }): JSX.Element => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const handleOnline = (): void => setIsOnline(true)
  const handleOffline = (): void => setIsOnline(false)

  useEventListener({
    eventName: 'online',
    handler: handleOnline,
    element: window
  })

  useEventListener({
    eventName: 'offline',
    handler: handleOffline,
    element: window
  })

  const style = {
    network: {
      class: isOnline ? `text-green-400` : `text-red-400`,
      text: isOnline ? 'Connected' : 'Disconnected'
    },
    device: {
      class: deviceConnected ? `text-green-400` : `text-red-400`,
      text: deviceConnected ? 'Connected' : 'Disconnected'
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="border border-primaryBg border-r-textSecondary pr-10 flex gap-3">
        <FaNetworkWired className="text-primary text-3xl" />
        <div>
          <h4 className="font-semibold">Network</h4>
          <span className={`${style.network.class} text-sm`}>{style.network.text}</span>
        </div>
      </div>
      <div className="border border-primaryBg border-l-textSecondary pl-10 flex gap-3">
        <BsFillDeviceHddFill className="text-primary text-3xl" />
        <div>
          <h4 className="font-semibold">Drives</h4>
          <span className={`${style.device.class} text-sm`}>{style.device.text}</span>
        </div>
      </div>
    </div>
  )
}

export default Devices
