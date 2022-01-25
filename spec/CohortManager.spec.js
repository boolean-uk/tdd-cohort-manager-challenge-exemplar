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

  it('returns a cohort by name', () => {
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
    const student = cohortManager.addStudentToCohort(cohortName, 'Mario', 'Rossi', '@github', 'mario@example.com')

    // verify
    expect(student).not.toBeNull()
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

  it('cannot remove an inexisting student', () => {
    // set up
    const cohortName = 'Cohort X'
    const studentId = 1

    // execute
    const result = cohortManager.removeStudentFromCohort(cohortName, studentId)

    // verify
    expect(result).toEqual(false)
  })
})
