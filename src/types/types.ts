export type MappedDrives = {
  orders_directory: string
  target_directory: string
}

export type TFileStable = {
  filepath: string
  interval: number
  retries: number
}

export type TMessage = {
  timestamp: string
  color: string
  text: string
}
