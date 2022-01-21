const Cohort = require('./cohort')

class CohortManager {
  constructor() {
    this.cohorts = []
  }

  createCohort(name) {
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
}

module.exports = CohortManager
