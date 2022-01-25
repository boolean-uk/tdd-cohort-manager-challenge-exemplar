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

  removeStudent(studentId) {
    for(var i = 0; i < this.students.length; i++) {
      if(this.students[i].studentId === studentId) {
        this.students.splice(i, 1)
        return true;
      }
    }
    return false;
  }
}

module.exports = Cohort