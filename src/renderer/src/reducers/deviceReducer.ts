import { Drive, DriveErrorMessage } from '../types'

export const initialDriveState: Drive = {
  isDisabled: false,
  title: '',
  message: ''
}

export const ACTIONS = {
  DISABLE_DRIVE: 'disable-drive',
  ENABLE_DRIVE: 'enable-drive'
}

type Action =
  | { type: typeof ACTIONS.DISABLE_DRIVE; payload: DriveErrorMessage }
  | { type: typeof ACTIONS.ENABLE_DRIVE; payload: { params: Drive } }

export const driveReducer = (state: Drive, action: Action): Drive => {
  switch (action.type) {
    case ACTIONS.DISABLE_DRIVE:
      if ('message' in action.payload && 'plural' in action.payload) {
        const { message, plural } = action.payload
        return {
          ...state,
          isDisabled: true,
          title: `Missing Drive${plural}`,
          message: message
        }
      }

      return state

    case ACTIONS.ENABLE_DRIVE:
      return {
        ...initialDriveState
      }

    default:
      return state
  }
}
