// Reads csv exports from the `data/students.csv` and `data/attendance.csv` spreadsheets and generates a unified, deduplicated list of all students in `data/all-students.csv`

import fs from 'fs'
import { join } from 'path'
import csvSync from 'csv/lib/sync.js'

const { readFile } = fs.promises
const { parse } = csvSync

export const readCSV = async (path /* TODO: needs a better name or to be an already normalized path */ ) => {
    const fileLocation = join(process.cwd(), path)
    const file = await readFile(fileLocation)
    return await parse(file, {
        columns: true
    })
}