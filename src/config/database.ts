import sql from 'mssql'

const config = {
  user: 'sa',
  password: 'EmedP@ssw0rd',
  server: '192.163.10.70\\SQL2K14',
  database: 'MedixDB_Live',
  options: {
    enableArithAbort: true,
    trustServerCertificate: true
  }
}

export const connectDB = async (): Promise<void> => {
  try {
    await sql.connect(config)
    console.log('Database Connected Successfully')
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Couldn't connect to database ${error.message}`)
    } else {
      console.log(`Couldn't connect to database ${error}`)
    }
  }
}

export const updateDocumentPath = async (
  templateCode: string,
  renderNumber: string,
  documentPath: string
): Promise<void> => {
  const trimmedPath = documentPath.replace(/^[A-Z]:/, '')
  console.log('trimmed path', trimmedPath)
  const updatePath = `
  UPDATE rd
  SET rd.DocumentPath = '${trimmedPath}'
  FROM RenderDetails rd
  JOIN RenderHeader rh
      ON rd.RenderID = rh.ID
  JOIN LISItemInterface li
      ON rd.ItemCode = li.MedixItemCode
  WHERE rh.RenderNumber = '${renderNumber}'
      AND li.TemplateCode = '${templateCode}'`

  try {
    await sql.query(updatePath)
    console.log(`Document Updated Successfully`)
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Query failed Error Trace: ${error.message}`)
    } else {
      console.log(`Query failed Error Trace: ${error}`)
    }
  }
}
