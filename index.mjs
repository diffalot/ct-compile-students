import syncAttendeesWithStudents from './src/syncAttendeesWithStudents.mjs'

(async () => {
    let allStudents
    try {
        allStudents = await syncAttendeesWithStudents()
    } catch (e) {
        console.error(e.message)
    }

    console.log('All Students:')
    allStudents.forEach((student, email) => { console.log(`${student['Full Name']}: ${email}`)})
    console.log('')

})()
