const Cohort = require('./Cohort')
const Student = require('./Student')

class CohortManager {
  constructor () {
    this.cohorts = []
    this._lastStudentId = -1
  }

  canCreateCohortWithName(name) {
    let canCreate = true
    if(name === undefined) {
      canCreate = false
    }
    else if(typeof(name) !== typeof(String(""))) {
      canCreate = false
    }
    else if(name.length === 0) {
      canCreate = false
    }
    else {
      // check for duplicate cohort name
      for(var i = 0; i < this.cohorts.length; i++) {
        if(this.cohorts[i].name === name) {
          canCreate = false;
          break;
        }
      }
    }
    return canCreate
  }

  createCohort(name) {
    let cohort = null
    if(this.canCreateCohortWithName(name)) {
      cohort = new Cohort(name)
      this.cohorts.push(cohort)
    }
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
      student = new Student(this._lastStudentId, firstName, lastName, githubAccount, email)  
      if(!cohort.addStudent(student)) {
        student = null
        this._lastStudentId -= 1;
      }
    }
    return student
  }
  
  removeStudentFromCohort(cohortName, studentId) {
    const cohort = this.getCohort(cohortName);
    if(cohort !== null) {
      return cohort.removeStudent(studentId);
    }
    return false;
  }
}

module.exports = CohortManager
