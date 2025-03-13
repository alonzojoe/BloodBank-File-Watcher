type ReturnValue = [string, string, string]

export const extractFileName = <T extends string>(fileName: T): ReturnValue => {
  const parts = fileName.split('&')
  const extractNames = parts[5]
  const extractParts = extractNames.split('^')
  const renderNumber = extractParts[0]
  const templateCodeWithExtenstion = extractParts[1]
  const templateCode = templateCodeWithExtenstion.split('.')[0]

  const rawPatientName = parts[3]
  const patientNameParts = rawPatientName.split('^')
  const formattedPatientName = `${patientNameParts[0]}, ${patientNameParts.slice(1).join(' ')}`

  return [renderNumber, templateCode, formattedPatientName]
}
