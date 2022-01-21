const Cohort = require('../src/cohort')
const Student = require('../src/student')

describe('Cohort', () => {
  let cohort

  beforeEach(() => {
    cohort = new Cohort('Cohort 4')
  })
  it('can set its initial values', () => {
    // set up
    const expected = {
      name: 'Cohort 4'
    }
    // execute
    const result = new Cohort(expected.name)
    // verify
    expect(result.name).toEqual(expected.name)
  })
  it('can add a student to the cohort', () => {
    // set up
    const expectedLength = 1
    const student = new Student(
      'id',
      'lewis',
      'campbell',
      'auenc',
      'some@email.email'
    )
    // execute
    const result = cohort.addStudent(student)
    // verify
    expect(result).toEqual(result)
    expect(cohort.students.length).toEqual(expectedLength)
  })
  it('can remove a student from the cohort', () => {
    // set up
    const student = new Student(
      'id',
      'lewis',
      'campbell',
      'auenc',
      'some@email.email'
    )
    cohort.addStudent(student)
    // execute
    cohort.removeStudent(student)
    // verify
    expect(cohort.students.length).toEqual(0)
  })
  it('can get student and student index by id', () => {
    // set up
    const student = new Student(
      'id',
      'lewis',
      'campbell',
      'auenc',
      'some@email.email'
    )
    cohort.addStudent(student)
    // execute
    const result = cohort.getStudentAndIndexByID(student.id)
    // verify
    expect(result).toEqual([student, 0])
  })
  it("will throw an error if searching for a student that doesn't exist", () => {
    expect(() => cohort.getStudentAndIndexByID('some student')).toThrowError(
      'Student not found'
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
    cohort.addStudent(student)
    // execute
    const result = cohort.getStudentByID(student.id)
    // verify
    expect(result).toEqual(student)
  })
  it('it returns true if cohort has a student with a particular id', () => {
    // set up
    const student = new Student(
      'id',
      'lewis',
      'campbell',
      'auenc',
      'some@email.email'
    )
    cohort.addStudent(student)
    // execute
    const result = cohort.hasStudentWithID(student.id)
    // verify
    expect(result).toEqual(true)
  })
  it('it returns true if cohort has a student with a particular id', () => {
    // execute
    const result = cohort.hasStudentWithID('some-id')
    // verify
    expect(result).toEqual(false)
  })
})
