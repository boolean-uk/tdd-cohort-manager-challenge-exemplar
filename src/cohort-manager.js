const Cohort = require('./cohort')

class CohortManager {
  constructor() {
    this.cohorts = []
  }

  createCohort(name) {
    if (!name) {
      throw new Error('Cohort requires a name')
    }
    if (this.hasCohortWithName(name)) {
      throw new Error('Cohort requires a unique name')
    }
    const cohort = new Cohort(name)
    this.cohorts.push(cohort)
    return cohort
  }

  getCohortByName(name) {
    const [cohort] = this.getCohortAndIndexByName(name)
    return cohort
  }

  removeCohortByName(name) {
    const [cohort, index] = this.getCohortAndIndexByName(name)
    this.cohorts.splice(index, 1)
    return cohort
  }

  getCohortAndIndexByName(name) {
    const index = this.cohorts.findIndex((cohort) => cohort.name === name)
    if (index === -1) {
      throw new Error('Cohort not found')
    }
    const cohort = this.cohorts[index]
    return [cohort, index]
  }

  getStudentByID(id) {
    for (let i = 0; i < this.cohorts.length; i++) {
      if (this.cohorts[i].hasStudentWithID(id)) {
        return this.cohorts[i].getStudentByID(id)
      }
    }
    throw new Error('Student not found')
  }

  hasCohortWithName(name) {
    let cohort
    try {
      cohort = this.getCohortByName(name)
    } catch (e) {}
    // !! coverts the value to a boolean.
    return !!cohort
  }

  addStudentToCohort(student, cohortName) {
    if (!this.hasCohortWithName(cohortName)) {
      throw new Error('Cohort does not exist')
    }
    const cohortWithStudent = this.cohorts.find(cohort => cohort.hasStudentWithID(student.id))
    if (cohortWithStudent) {
      throw new Error('Student is already in a cohort')
    }
    const cohort = this.getCohortByName(cohortName)
    cohort.addStudent(student)
  }
}

module.exports = CohortManager
