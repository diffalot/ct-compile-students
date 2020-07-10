import moment from 'moment'

import syncAttendeesWithStudents from './src/syncAttendeesWithStudents.mjs'
import processSignIns from './src/processSignIns.mjs'

import { readCSV } from './src/util.mjs'



(async () => {
    const students = await readCSV('data/students.csv')
    const attendance = await readCSV('data/attendance.csv')
    
    let allStudents
    try {
        // TODO: load all students from the csvs here and send them as arguments into syncAttendees...
        allStudents = await syncAttendeesWithStudents({ students, attendance })
    } catch (e) {
        console.error(e.message)
    }

    console.log('All Students:')
    allStudents.forEach((student, email) => { console.log(`${student['Full Name']}: ${email}`)})
    console.log('')

    let processedSignIns
    try {
        // TODO: load all students from the csvs here and send them as arguments into syncAttendees...
        const targetDateString = '2020-07-09T14:59:48-07:00' // targetDate is any ISO-8601 date string from monday to friday of the week to process attendance for
        processSignIns = await processSignIns({allStudents, attendance, targetDateString})
        debugger
    } catch (e) {
        console.error(e.message)
    }

    console.log('Attendance:')
    processedSignIns.forEach((student, email) => { console.log(`${student['Full Name']}: ${email}`)})
    console.log('')

})()
