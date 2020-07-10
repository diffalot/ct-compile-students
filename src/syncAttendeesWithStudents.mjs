export default async ({ students, attendance }) => {
    console.log('Compiling list of all students')
    const allStudents = new Map()

    // find student by email address, so no multiples exist upon setting a student, should become a method used when inserting students from the attendance array
    const findStudentsByEmail = (email) => {
        if (email.length === 0) return []
        const foundStudents = []
        allStudents.forEach((student) => {
            if (student.emailAddresses.indexOf(email.toLowerCase()) >= 0) {
                foundStudents.push(student)
            }
        })
        return foundStudents
    }

    // loop through students and add them to the map first because students is the authoratiative source
    students.forEach((student) => {
        let emailAddress = student['Emails'].toLowerCase()
        let emailAddresses = [emailAddress]

        if (emailAddress.indexOf(',') >= 0) {
            // student has multiple email addresses

            emailAddresses = emailAddress
                .split(',')
                .map(s => s.trim().toLowerCase())

            // use first email listed as the key
            emailAddress = emailAddresses[0]
        }


        // TODO: only set student if there is no other email address for this student in `allStudents`.  Halt and error if key exists
        if (emailAddress.length > 0 && student.Notes.indexOf('NEEDS INVESTIGATION') < 0) {
            if (allStudents.get(emailAddress)) {
                throw (new Error(`${emailAddress} already exists: \n ${JSON.stringify(allStudents.get(emailAddress))}`))
            }
            allStudents.set(emailAddress, {
                ...student,
                emailAddresses
            })
        }
    })


    // TODO: Insert students found in the `attendance.csv`
    const missingStudents = []
    attendance.forEach((logEntry) => {
       
        const foundStudents = findStudentsByEmail(logEntry['Email Address'])

        if (foundStudents.length === 0 && logEntry['Email Address'].length > 0) {
            missingStudents.push(logEntry)
        }
    }) 

    missingStudents.forEach((logEntry) => {
        console.log(`could not find ${logEntry['Full Name']} as ${logEntry['Email Address']} in ${logEntry['Are you a member of the Morning or Afternoon Class']} class`)
    })

    if (missingStudents.length > 0) throw new Error(`found ${missingStudents.length} missing students`)

    return allStudents
}