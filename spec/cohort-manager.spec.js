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
    expect(() => manager.getCohortByName('Cohort 4')).toThrowError('Cohort not found')
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
  it('returns an error if the student doesn\'t exist', () => {
    expect(() => manager.getStudentByID('some-id')).toThrowError('Student not found')
  })
})
