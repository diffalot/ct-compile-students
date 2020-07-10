import moment from 'moment'

export default async ({ allStudents, attendance, targetDateString }) => {
    const targetDate = moment(targetDateString)
    console.log('Processing Sign-Ins')

    // duplicate student map as a studentAttendance map
    const studentAttendance = { ...allStudents }

    // morning class start time
    // morning class end time
    // afternoon class start time
    // afternoon class end time
    // pad class start and end with 30 minutes on each side
    // make classMiddle moment halfway between class start and end

    // create the week, monday through friday
    const startOfWeek = moment(targetDate).startOf('week')
    
    const dateString = (time) => moment(time).format('YYYY-MM-DD')

    // create week of attendance for every possible day
    const week = new Map()
    for (const dayOfWeek of [1, 2, 3, 4, 5]) {
        const day = dateString(moment(startOfWeek).day(dayOfWeek))
        week.set(day, {
            day,
            attendedThisDay: false,
            presence: {
                morning: {
                    signIn: false,
                    signOut: false
                },
                afternoon: {
                    signIn: false,
                    signOut: false,
                }
            }
        })
    }

    debugger


    // loop through attendance signIns
        // clone week of attendance to each student of student attendance
        // create sign in / sign out true / false for each class on each day
        // apply rubric to mark presense for a day
        // check out of bounds sign ins as indicator of fraud


    return studentAttendance
}