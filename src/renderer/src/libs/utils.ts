import axios from 'axios'

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

type ResponseHL7 = {
  statusCode: number
  message: string
}

export const processHL7Content = async (fileName: string): Promise<number> => {
  try {
    const response = await axios(
      `http://192.163.10.131/edifylive/lis-bcu-end-point/hl7-parser-end-point.php`,
      {
        params: {
          file: fileName
        }
      }
    )
    const res = (await response.data) as ResponseHL7
    console.log('Response processHL7Content: ', res)
    return res.statusCode
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error while processing HL7 content:', error.message)
    } else {
      console.log(`Error while processing HL7 content:`, error)
    }
    return 500
  }
}
