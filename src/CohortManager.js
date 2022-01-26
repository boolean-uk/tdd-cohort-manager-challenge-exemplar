const Cohort = require('./Cohort')

const CohortNotFoundError = 'Cohort not found'
const CohortNameInUseError = 'Cohort name already in use'
const StudentInCohortError = 'Student exists in another cohort'

class CohortManager {
  constructor () {
    this.cohorts = []
  }

  createCohort (cohortName) {
    if (this.exists(cohortName)) {
      return CohortNameInUseError
    }

    const cohort = new Cohort(cohortName)
    this.cohorts.push(cohort)

    return cohort
  }

  exists (cohortName) {
    return this.search(cohortName) !== CohortNotFoundError
  }

  search (cohortName) {
    for (const cohort of this.cohorts) {
      if (cohort.name === cohortName) {
        return cohort
      }
    }

    return CohortNotFoundError
  }

  addStudentToCohort (cohortName, student) {
    const cohort = this.search(cohortName)
    if (cohort === CohortNotFoundError) {
      return cohort
    }

    for (const cohort of this.cohorts) {
      if (cohort.hasStudent(student.studentID)) {
        return StudentInCohortError
      }
    }

    cohort.students.push(student)
  }

  removeCohort (cohortName) {
    for (const cohort of this.cohorts) {
      if (cohort.name === cohortName) {
        this.cohorts.splice(this.cohorts.indexOf(cohort), 1)
      }
    }

    return CohortNotFoundError
  }

  removeStudentFromCohort (cohortName, studentID) {
    const cohort = this.search(cohortName)
    if (cohort === CohortNotFoundError) {
      return cohort
    }

    return cohort.removeStudent(studentID)
  }
}

module.exports = CohortManager
