import syncAttendeesWithStudents from './src/syncAttendeesWithStudents.mjs'

// run it!
(async () => {

    const allStudents = await syncAttendeesWithStudents()
    console.log(allStudents)

    debugger
})()
