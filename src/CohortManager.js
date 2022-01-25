const Cohort = require('./Cohort')
const Student = require('./Student')

class CohortManager {
  constructor () {
    this.cohorts = []
    this._lastStudentId = -1
  }

  createCohort(name) {
    let cohort = new Cohort(name)
    this.cohorts.push(cohort)
    return cohort;
  }

  removeCohort(name) {
    var removed = false
    for(var i = 0; i < this.cohorts.length; i++) {
      if(this.cohorts[i].name === name) {
        this.cohorts.splice(i, 1)
        removed = true
        break
      }
    }
    return removed
  }

  getCohort(name) {
    for(var i = 0; i < this.cohorts.length; i++) {
        if(this.cohorts[i].name === name) {
            return this.cohorts[i];
        }
    }
    return null;
  }

  addStudentToCohort(cohortName, firstName, lastName, githubAccount, email) {
    const cohort = this.getCohort(cohortName)
    let student = null;
    if(cohort !== null) {
      this._lastStudentId += 1
      student = new Student(this._lastStudentId, 'Mario', 'Rossi', '@github', 'mario@example.com')  
      if(!cohort.addStudent(student)) {
        student = null
      }
      else {
        this._lastStudentId -= 1;
      }
    }
    return student
  }
}

module.exports = CohortManager
