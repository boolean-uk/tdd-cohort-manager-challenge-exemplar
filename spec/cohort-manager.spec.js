const CohortManager = require('../src/cohort-manager')
const Student = require('../src/student')

describe('CohortManager', () => {
  let manager

  beforeEach(() => {
    manager = new CohortManager()
  })

  it('can create a cohort', () => {
    // set up
    const expected = 'Cohort 4'
    // execute
    const result = manager.createCohort(expected)
    // verify
    expect(result.name).toEqual(expected)
  })
  it('can remove a cohort by name', () => {
    // set up
    const expected = manager.createCohort('Cohort 4')
    // execute
    const result = manager.removeCohortByName('Cohort 4')
    // verify
    expect(result).toEqual(expected)
    expect(manager.cohorts.length).toEqual(0)
  })
  it('can get a cohort and cohort index by name', () => {
    // set up
    const expected = [manager.createCohort('Cohort 4'), 0]
    // execute
    const result = manager.getCohortAndIndexByName('Cohort 4')
    // verify
    expect(result).toEqual(expected)
  })
  it('can get cohort by name', () => {
    // set up
    const expected = manager.createCohort('Cohort 4')
    // execute
    const result = manager.getCohortByName('Cohort 4')
    // verify
    expect(result).toEqual(expected)
  })
  it('will throw an error if cohort not found', () => {
    expect(() => manager.getCohortByName('Cohort 4')).toThrowError(
      'Cohort not found'
    )
  })
  it('can get student by id', () => {
    // set up
    const student = new Student(
      'id',
      'lewis',
      'campbell',
      'auenc',
      'some@email.email'
    )
    const cohort = manager.createCohort('Cohort 4')
    cohort.addStudent(student)
    // execute
    const result = manager.getStudentByID(student.id)
    // verify
    expect(result).toEqual(student)
  })
  it("returns an error if the student doesn't exist", () => {
    expect(() => manager.getStudentByID('some-id')).toThrowError(
      'Student not found'
    )
  })
  it('ensures a cohort has a name', () => {
    expect(() => manager.createCohort('')).toThrowError(
      'Cohort requires a name'
    )
    expect(() => manager.createCohort(null)).toThrowError(
      'Cohort requires a name'
    )
    expect(() => manager.createCohort(undefined)).toThrowError(
      'Cohort requires a name'
    )
  })
  it('ensures cohorts have a unique name', () => {
    // set up
    const name = 'Cohort 4'
    manager.createCohort(name)
    // verify
    expect(() => manager.createCohort(name)).toThrowError(
      'Cohort requires a unique name'
    )
  })
  it("throws an error when trying to add a student to a cohort that doesn't exist", () => {
    // set up
    const student = new Student(
      'id',
      'lewis',
      'campbell',
      'auenc',
      'some@email.email'
    )

    // verify
    expect(() => manager.addStudentToCohort(student, 'Cohort 4')).toThrowError(
      'Cohort does not exist'
    )
  })
  it('throws an error when trying to add a student to a cohort whilst the student is enrolled in another cohort', () => {
    // set up
    const student = new Student(
      'id',
      'lewis',
      'campbell',
      'auenc',
      'some@email.email'
    )
    manager.createCohort('Cohort 3')
    const cohort = manager.createCohort('Cohort 4')
    cohort.addStudent(student)

    // verify
    expect(() => manager.addStudentToCohort(student, 'Cohort 3')).toThrowError(
      'Student is already in a cohort'
    )
  })
  it('can add a student to a cohort', () => {
    // set up
    const student = new Student(
      'id',
      'lewis',
      'campbell',
      'auenc',
      'some@email.email'
    )
    const cohort = manager.createCohort('Cohort 4')

    // execute
    manager.addStudentToCohort(student, 'Cohort 4')

    // verify
    expect(cohort.students.length).toEqual(1)
  })
})
