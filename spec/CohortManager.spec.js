const Cohort = require("../src/Cohort.js")
const CohortManager = require("../src/CohortManager.js")

describe("CohortManager", () => {
  let cohortManager

  beforeEach(() => {
    cohortManager = new CohortManager()
  })


  it("createCohort adds a new cohort to cohort list", () => {
    
    cohortManager.createCohort("Cohort 4 - The best cohort")

    const expected = [
      new Cohort("Cohort 4 - The best cohort")
    ]

    expect(cohortManager.cohorts).toEqual(expected)
  })

  it("createCohort returns new cohort", () => {
    
    const result = cohortManager.createCohort("Cohort 4 - The best cohort")

    const expected = new Cohort("Cohort 4 - The best cohort")

    expect(result).toEqual(expected)
  })

  it("search returns found cohort", () => {
    cohortManager.createCohort("Cohort 1")
    cohortManager.createCohort("Cohort 2")
    cohortManager.createCohort("Cohort 3")
    cohortManager.createCohort("Cohort 4")

    const result = cohortManager.search("Cohort 2")

    const expected = new Cohort("Cohort 2")

    expect(result).toEqual(expected)
  })

  it("search returns error when cohort not found", () => {
    cohortManager.createCohort("Cohort 1")
    cohortManager.createCohort("Cohort 2")
    cohortManager.createCohort("Cohort 3")
    cohortManager.createCohort("Cohort 4")

    const result = cohortManager.search("Cohort 5")

    const expected = "Cohort not found"

    expect(result).toEqual(expected)
  })

  it("addStudentToCohort adds student object to cohorts student array", () => {
    
    cohortManager.createCohort("Cohort 1")

    const student = {
      studentID :1,
      firstName : "Mike",
      lastName : "Herron",
      githubUsername: "Mikeh",
      email : "mike@boolean.com"
    }

    cohortManager.addStudentToCohort("Cohort 1", student)

    const expected = [
      student 
    ]

    const cohort = cohortManager.search("Cohort 1")
    expect(cohort.students).toEqual(expected)
  })

  it("addStudentToCohort returns error when cohort not found", () => {
    
    cohortManager.createCohort("Cohort 1")

    const student = {
      studentID :1,
      firstName : "Mike",
      lastName : "Herron",
      githubUsername: "Mikeh",
      email : "mike@boolean.com"
    }

    const result = cohortManager.addStudentToCohort("Cohort 4", student)

    const expected = "Cohort not found"

    expect(result).toEqual(expected)
  })

  it("removeCohort removes cohort from Cohort list", () => {
    
    const cohort1 = cohortManager.createCohort("Cohort 1")
    cohortManager.createCohort("Cohort 2")
    const cohort3 = cohortManager.createCohort("Cohort 3")

    cohortManager.removeCohort("Cohort 2")

    const expected = [
      cohort1, 
      cohort3
    ]

    expect(cohortManager.cohorts).toEqual(expected)
  })

  it("removeCohort returns error when cohort not found", () => {
    
    cohortManager.createCohort("Cohort 1")
    cohortManager.createCohort("Cohort 2")
    cohortManager.createCohort("Cohort 3")

    const result = cohortManager.removeCohort("Cohort 4")

    const expected = "Cohort not found"

    expect(result).toEqual(expected)
  })

  it("removeStudentFromCohort removes student from Cohort", () => {
    
    const student1 = {
      studentID :1,
      firstName : "Mike",
      lastName : "Herron",
      githubUsername: "Mikeh",
      email : "mike@boolean.com"
    }

    const student2 = {
      studentID :2,
      firstName : "Bob",
      lastName : "Smith",
      githubUsername: "BobS",
      email : "bob@boolean.com"
    }

    cohortManager.createCohort("Cohort 1")
    cohortManager.addStudentToCohort("Cohort 1", student1)
    cohortManager.addStudentToCohort("Cohort 1", student2)

    expect(cohortManager.removeStudentFromCohort("Cohort 1", student1.studentID)).toBeUndefined()

    const expected = [student2]

    const cohort = cohortManager.search("Cohort 1")

    expect(cohort.students).toEqual(expected)
  })

  it("removeStudentFromCohort returns error when cohort not found", () => {
    
    const student1 = {
      studentID :1,
      firstName : "Mike",
      lastName : "Herron",
      githubUsername: "Mikeh",
      email : "mike@boolean.com"
    }

    const student2 = {
      studentID :2,
      firstName : "Bob",
      lastName : "Smith",
      githubUsername: "BobS",
      email : "bob@boolean.com"
    }

    cohortManager.createCohort("Cohort 1")
    cohortManager.addStudentToCohort("Cohort 1", student1)
    cohortManager.addStudentToCohort("Cohort 1", student2)

    const result = cohortManager.removeStudentFromCohort("Cohort 3", student1.studentID)

    const expected = "Cohort not found"

    expect(result).toEqual(expected)
  })

  it("removeStudentFromCohort returns error when student not found", () => {
    
    const student1 = {
      studentID :1,
      firstName : "Mike",
      lastName : "Herron",
      githubUsername: "Mikeh",
      email : "mike@boolean.com"
    }

    const student2 = {
      studentID :2,
      firstName : "Bob",
      lastName : "Smith",
      githubUsername: "BobS",
      email : "bob@boolean.com"
    }

    cohortManager.createCohort("Cohort 1")
    cohortManager.addStudentToCohort("Cohort 1", student1)
    cohortManager.addStudentToCohort("Cohort 1", student2)

    const result = cohortManager.removeStudentFromCohort("Cohort 1", 999999) 

    const expected = "Student not found"

    expect(result).toEqual(expected)
  })



  it("createCohort returns an error when already a cohort with the provided name", () => {
    
    cohortManager.createCohort("Cohort 4")

    const result = cohortManager.createCohort("Cohort 4")

    const expected = 'Cohort name already in use'

    expect(result).toEqual(expected)
  })

  it("createCohort does not add cohort when a cohort already exists with the provided name", () => {
    
    const cohort4 = cohortManager.createCohort("Cohort 4")
    cohortManager.createCohort("Cohort 4")

    const expected = [ cohort4 ]

    expect(cohortManager.cohorts).toEqual(expected)
  })

  it("addStudentToCohort returns error when student exists in another cohort", () => {
    
    cohortManager.createCohort("Cohort 1")
    cohortManager.createCohort("Cohort 2")

    const student = {
      studentID :1,
      firstName : "Mike",
      lastName : "Herron",
      githubUsername: "Mikeh",
      email : "mike@boolean.com"
    }

    cohortManager.addStudentToCohort("Cohort 1", student)
    const result = cohortManager.addStudentToCohort("Cohort 2", student)

    const expected = 'Student exists in another cohort'

    expect(result).toEqual(expected)
  })
})
