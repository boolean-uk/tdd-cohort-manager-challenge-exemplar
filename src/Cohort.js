class Cohort {
  constructor(name) {
    this.name = name
    this.students = []
  }

  addStudent(student) {
    if(student !== null) {
      this.students.push(student)
      return true;
    }
    return false;
  }
}

module.exports = Cohort