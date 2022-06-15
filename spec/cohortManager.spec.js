/* eslint-disable no-undef */
const CohortManager = require('../src/cohortManager')

describe('Cohort', () => {
  // eslint-disable-next-line no-unused-vars
  let cohortManager
  beforeEach(() => {
    cohortManager = new CohortManager()
  })

  it('can create a cohort with a cohort name', () => {
    const expected = {
      name: 'Cohort 6',
      students: []
    }
    const result = cohortManager.createCohort(expected.name)

    // console.log('cohort', result)

    // two ways to test.
    /* expect(result).toEqual(
      jasmine.objectContaining({
        name: expected.name,
        students: expected.students
      })
    ) */
    // or
    expect(result.name).toEqual(expected.name)
    expect(result.students).toEqual(expected.students)
  })

  it('can remove a cohort by name', () => {
    // set up
    const expected = true
    // execute
    cohortManager.createCohort('Cohort 6')
    const result = cohortManager.removeCohort('Cohort 6')
    const thisCohorts = cohortManager.getCohorts()
    // verify
    expect(result).toEqual(expected)
    expect(thisCohorts.length).toEqual(0)
  })

  it('can get cohort by name', () => {
    // set up
    const expected = cohortManager.createCohort('Cohort 6')
    // execute
    const result = cohortManager.searchForCohort('Cohort 6')
    // verify
    expect(result).toEqual(expected)
  })

  it('can add a student to a cohort', () => {
    // create required data structures
    const student = {
      id: 1,
      first: 'Steve',
      last: 'Huckle',
      email: 'steve@blah.com',
      githubUser: 'glowkeeper'
    }

    const cohortName = 'Cohort 6'

    const expected = {
      name: cohortName,
      students: [student]
    }

    // execute code
    const thisCohort = cohortManager.createCohort(expected.name)
    // console.log('my cohort', thisCohort)
    const thisStudent = thisCohort.addStudent(student)

    const thisName = thisCohort.getName()
    const cohortStudents = thisCohort.getStudents()

    const id = thisStudent.getId()
    const first = thisStudent.getFirst()
    const last = thisStudent.getLast()
    const email = thisStudent.getEmail()
    const githubUser = thisStudent.getGithubUser()

    // match expectations
    expect(thisName).toEqual(expected.name)
    expect(id).toEqual(student.id)
    expect(first).toEqual(student.first)
    expect(last).toEqual(student.last)
    expect(email).toEqual(student.email)
    expect(githubUser).toEqual(student.githubUser)
    expect(cohortStudents[0].email).toEqual(student.email)
    expect(cohortStudents[0].githubUser).toEqual(student.githubUser)
  })

  it('can remove a student from a cohort', () => {
    // set up
    const student = {
      id: 1,
      first: 'Steve',
      last: 'Huckle',
      email: 'steve@blah.com',
      githubUser: 'glowkeeper'
    }

    const cohortName = 'Cohort 6'

    const expected = {
      name: cohortName,
      students: []
    }

    // execute code
    const thisCohort = cohortManager.createCohort(expected.name)
    // console.log('my cohort', thisCohort)
    thisCohort.addStudent(student)
    thisCohort.removeStudent(student)

    const thisName = thisCohort.getName()
    const cohortStudents = thisCohort.getStudents()

    // console.log('cohort students', cohortStudents)
    // verify
    expect(thisName).toEqual(expected.name)
    expect(cohortStudents.length).toEqual(expected.students.length)
  })

  it('can search for student', () => {
    // set up
    const student = {
      id: 1,
      first: 'Steve',
      last: 'Huckle',
      email: 'steve@blah.com',
      githubUser: 'glowkeeper'
    }

    const cohortName = 'Cohort 6'
    const expected = true

    // execute code
    const thisCohort = cohortManager.createCohort(cohortName)
    // console.log('my cohort', thisCohort)
    thisCohort.addStudent(student)
    const foundStudent = thisCohort.searchForStudent(student)
    // verify
    expect(expected).toEqual(foundStudent)
  })

  it('can return error if student not found', () => {
    // set up
    const addedStudent = {
      name: 'Steve',
      email: 'steve@blah.com',
      githubUser: 'glowkeeper'
    }

    const searchedStudent = {
      name: 'John',
      email: 'john@blah.com',
      githubUser: 'johnblah'
    }

    const cohortName = 'Cohort 6'
    const expected = false

    // execute code
    const thisCohort = cohortManager.createCohort(cohortName)
    // console.log('my cohort', thisCohort)
    thisCohort.addStudent(addedStudent)
    const foundStudent = thisCohort.searchForStudent(searchedStudent)
    // verify
    expect(expected).toEqual(foundStudent)
  })
})
