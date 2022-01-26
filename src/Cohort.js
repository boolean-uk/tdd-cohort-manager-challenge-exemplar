const StudentNotFoundError = "Student not found"

class Cohort {
  constructor(cohortName) {
    this.name = cohortName
    this.students = []
  }

  hasStudent(studentID) {
    for (const student of this.students) {
      if (student.studentID === studentID) {
        return true
      }
    }

    return false
  }

  removeStudent(studentID) {
    for (const student of this.students) {
      if (student.studentID === studentID) {
        this.students.splice(this.students.indexOf(student), 1)
        return
      }
    }

    return StudentNotFoundError
  }
}

module.exports = Cohort
