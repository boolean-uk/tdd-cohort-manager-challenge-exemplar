class Cohort {
  constructor (name) {
    this.name = name
    this.students = []
    this.cohortMaxStudentSize = 24
  }

  addStudent (student) {
    // check if we have enough space
    if (this.students.length < this.cohortMaxStudentSize) {
      // check if we are given a valid student
      if (student !== null) {
        // add student & return true
        this.students.push(student)
        return true
      }
    }
    return false
  }

  removeStudent (studentId) {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].studentId === studentId) {
        this.students.splice(i, 1)
        return true
      }
    }
    return false
  }

  hasStudent (firstName, lastName, githubAccount, email) {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].firstName === firstName &&
        this.students[i].lastName === lastName &&
        this.students[i].githubAccount === githubAccount &&
        this.students[i].email === email) {
        return true
      }
    }
    return false
  }
}

module.exports = Cohort
