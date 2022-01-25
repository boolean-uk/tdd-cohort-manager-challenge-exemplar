const CohortManager = require('./../src/CohortManager')
const Student = require('./../src/Student')

describe('Test Cohort Manager', () => {
  let cohortManager

  beforeEach(() => {
    cohortManager = new CohortManager()
  })

  it('should create a cohort with a name', () => {
    // set up
    const cohortName = 'cohort x'

    // execute
    const cohort = cohortManager.createCohort(cohortName)

    // verify
    expect(cohortManager.cohorts.length).toBe(1)
    expect(cohort.name).toBe(cohortName)
    expect(cohort.students).toEqual([])
  })

  it('should remove a cohort with a name', () => {
    // set up
    const cohortName = 'cohort x'
    cohortManager.createCohort(cohortName)

    // execute
    const result = cohortManager.removeCohort(cohortName)

    // verify
    expect(result).toBe(true);
    expect(cohortManager.cohorts.length).toBe(0)
  })

  it('should return a cohort by name', () => {
    // set up
    const cohortName = 'cohort x'
    const inexistentName = 'some name'
    cohortManager.createCohort(cohortName)
    
    // execute
    const cohort = cohortManager.getCohort(cohortName)
    const noCohort = cohortManager.getCohort(inexistentName)
    // verify
    expect(noCohort).toBeNull();
    expect(cohort).not.toBeNull();
    expect(cohort.name).toBe(cohortName);    
  })

  it('adds a student to an existent cohort', () => {
    // set up
    const cohortName = 'Cohort X'
    const cohort = cohortManager.createCohort(cohortName)

    // execute
    const student = cohortManager.addStudentToCohort(cohortName, 'Giorgio', 'Rossi', '@github', 'mario@example.com')

    // verify
    expect(student).not.toBeNull()
    expect(student.studentId).toEqual(0)
    expect(student.firstName).toEqual('Giorgio')
    expect(student.lastName).toEqual('Rossi')
    expect(student.githubAccount).toEqual('@github')
    expect(student.email).toEqual('mario@example.com')

    expect(cohort.students.length).toBe(1)
    expect(cohort.students).toEqual([student])
  })

  it('cannot add a student to an inexistent cohort', () => {
    // set up
    const cohortName = 'Cohort X'

    // execute
    const student = cohortManager.addStudentToCohort(cohortName, 'Mario', 'Rossi', '@github', 'mario@example.com')

    // verify
    expect(student).toBeNull()

  })

  // req: both for basic / extended
  it('cannot remove an inexisting student', () => {
    // set up
    const cohortName = 'Cohort X'
    const studentId = 0

    const cohort = cohortManager.createCohort(cohortName);

    // execute
    const result = cohortManager.removeStudentFromCohort(cohortName, studentId)

    // verify
    expect(result).toEqual(false)
  })

  it('cannot remove a student from inexistent cohort', () => {
    // set up
    const cohortName = 'Cohort X'
    const studentId = 0

    // execute
    const result = cohortManager.removeStudentFromCohort(cohortName, studentId)

    // verify
    expect(result).toEqual(false)
  })

  it('remove a student from a cohort', () => {
    // set up
    const cohortName = 'Cohort X'
    const cohort = cohortManager.createCohort(cohortName)

    // create 2 students
    const student1 = cohortManager.addStudentToCohort(cohortName, 'John', 'Petrucci', '@petrucci', 'petrucci@dt.com');
    const student2 = cohortManager.addStudentToCohort(cohortName, 'Mike', 'Mangini', '@mangini', 'mangini@dt.com');

    // execute
    const result = cohortManager.removeStudentFromCohort(cohortName, student1.studentId)

    // verify
    expect(result).toEqual(true)
    expect(cohort.students.length).toBe(1)
    expect(cohort.students[0].studentId).toBe(student2.studentId)
  })

  /* EXTENDED */
  // req: cohorts have fixed capacity at 24 students
  // req: adding students is not possible beyond 24
  it('should not allow cohorts to have more than 24 students', () => {
    // setup
    const cohortName = 'Cohort X'
    cohortManager.createCohort(cohortName)
    
    // execute
    // try add 30 students, should get error for students # 25, 26, 27, 28, 29, 30
    for(var i = 1; i <= 30; i++) {
      const student = cohortManager.addStudentToCohort(cohortName, `firstName${i}`, `lastName${i}`, `@github${i}`, `${i}@example.com`)
      if(i <= 24) {
        expect(student).not.toBeNull();
        expect(student.studentId).toEqual(i - 1);
      }
      else {
        expect(student).toBeNull();
      }
    }
  })

  // req: cohorts can't exist without a name
  it('should not create a cohort without a name', () => {
    // setup
    const cohortName = ''
    // execute
    const cohort = cohortManager.createCohort(cohortName)
    // verify
    expect(cohort).toBeNull()
  })

  // req: cohorts can't have the same name
  it('should not create a cohort with the same name', () => {
    // setup
    const cohortName = 'Cohort X'
    const cohort1 = cohortManager.createCohort(cohortName)
    // execute
    const cohort2 = cohortManager.createCohort(cohortName)
    // verify
    expect(cohort1).not.toBeNull()
    expect(cohort2).toBeNull()
  })

  // req: the same student can't exist in multiple cohorts
  // note: this means the student with firstName, lastName, githubAccount, email, should be unique
  it('should not allow a student to exist in multiple cohorts', () => {
      // setup
      const cohortName = 'Cohort X'
      const studentData = {
        firstName: 'first',
        lastName: 'last',
        githubAccount: '@github',
        email: 'email@example.com'
      }

      // add student to cohort
      const cohort = cohortManager.createCohort(cohortName)
      const student = cohortManager.addStudentToCohort(cohortName, studentData.firstName, studentData.lastName, studentData.githubAccount, studentData.email)

      // execut
      const duplicate = cohortManager.addStudentToCohort(cohortName, studentData.firstName, studentData.lastName, studentData.githubAccount, studentData.email)

      // verify
      expect(student).not.toBeNull()
      expect(duplicate).toBeNull()
  })

  // req: find all students that match first & last names
  it('should find all students that have same first & last names', () => {
    // setup
    const cohortName = 'Cohort X'
    const studentData = {
      firstName: 'first',
      lastName: 'last',
    }

    const cohort = cohortManager.createCohort(cohortName)

    // create 3 students with the same name
    let newstudent = null
    for(var i = 0; i < 3; i++) {
      newstudent = cohortManager.addStudentToCohort(cohortName, studentData.firstName, studentData.lastName, `@github${i}`, `${i}@example.com`)
      expect(newstudent).not.toBeNull()
    }

    // add a couple of other students
    newstudent = cohortManager.addStudentToCohort(cohortName, 'a', 'b', `@githubab`, `ab@example.com`)
    expect(newstudent).not.toBeNull()

    newstudent = cohortManager.addStudentToCohort(cohortName, 'c', 'd', `@githubcd`, `cd@example.com`)
    expect(newstudent).not.toBeNull()

    // execute
    let foundStudents = cohortManager.findStudents(studentData.firstName, studentData.lastName)

    // verify
    expect(cohort.students.length).toEqual(5)
    expect(foundStudents.length).toEqual(3)
  })
})
