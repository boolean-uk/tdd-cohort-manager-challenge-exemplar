const Cohort = require('./cohort')

class CohortManager {
  constructor () {
    this.cohorts = []
  }

  // getters and setters are an important topic in OOP - below are examples for this class ;)

  getCohorts () {
    return this.getCohorts
  }

  setCohorts (cohorts) {
    this.cohorts = cohorts
  }

  createCohort (name) {
    const cohort = new Cohort(name)
    this.cohorts.push(cohort)
    return cohort
  }

  searchForCohort (name) {
    return this.cohorts.find((cohort) => cohort.name === name)
  }

  removeCohort (name) {
    const cohortName = this.searchForCohort(name)
    if (cohortName) {
      const filtered = this.cohorts.filter((cohort) => {
        const thisName = cohort.getName()
        return thisName !== name
      })
      this.cohorts = filtered
      return true
    }
    return false
  }
}

module.exports = CohortManager
