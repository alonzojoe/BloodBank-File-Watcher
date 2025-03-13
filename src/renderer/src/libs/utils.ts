type ReturnValue = [string, string, string]

export const extractFileName = <T extends string>(fileName: T): ReturnValue => {
  const parts = fileName.split('&')
  const getLisTemplateCode = `LAB-FM-${parts[4]}`
  const getRenderNumberWithExtension = parts[5]
  const getRenderNumber = getRenderNumberWithExtension.split('.')[0]

  const rawPatientName = parts[3]
  const patientNameParts = rawPatientName.split('^')
  const formattedPatientName = `${patientNameParts[0]}, ${patientNameParts.slice(1).join(' ')}`

  return [getLisTemplateCode, getRenderNumber, formattedPatientName]
}
