import { useState } from 'react'

const useToggle = (defaultValue: boolean): [boolean, (newValue?: boolean) => void] => {
  const [value, setValue] = useState(defaultValue)

  const toggleValue = (newValue?: boolean): void => {
    setValue((prev) => (typeof newValue === 'boolean' ? newValue : !prev))
  }

  return [value, toggleValue]
}

export default useToggle
