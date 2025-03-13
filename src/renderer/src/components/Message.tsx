import { Drive } from '@renderer/types'
type MessageProps = Pick<Drive, 'title' | 'message'>
const Message = ({ message, title }: MessageProps): JSX.Element => {
  const show = true

  return (
    <div className="App">
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-red-500 w-12 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-3 text-lg font-semibold text-red-500">{title}</h3>
                <h4 className="mb-5 text-md font-normal text-gray-100">{message}</h4>
                <p className="mb-5 text-red-500 font-semibold">Please restart the File Watcher</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Message
