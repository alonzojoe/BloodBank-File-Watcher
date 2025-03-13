import { useEffect, type RefObject } from 'react'

type EventListenerProps<ObjectType> = {
  eventName: string
  handler: EventListenerOrEventListenerObject
  element: RefObject<ObjectType> | Window | Document
}

type TargetElementType<T> = T | Window | Document | null

const useEventListener = <T extends HTMLElement = HTMLDivElement>({
  eventName,
  handler,
  element
}: EventListenerProps<T>): void => {
  useEffect(() => {
    const targetElement: TargetElementType<T> =
      element && 'current' in element ? element.current : element

    if (!targetElement) return

    targetElement.addEventListener(eventName, handler)

    return (): void => {
      targetElement.removeEventListener(eventName, handler)
    }
  }, [eventName, handler, element])
}

export default useEventListener
