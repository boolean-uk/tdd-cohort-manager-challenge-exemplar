class Cohort {
  constructor(name) {
    this.name = name
    this.students = []
  }

  addStudent(student) {
    this.students.push(student)
  }

  removeStudent(student) {
    const index = this.students.findIndex((s) => s.id === student.id)
    this.students.splice(index, 1)
  }

  getStudentAndIndexByID(id) {
    const index = this.students.findIndex((s) => s.id === id)
    if (index === -1) {
      throw new Error('Student not found')
    }
    return [this.students[index], index]
  }

  getStudentByID(id) {
    const [student] = this.getStudentAndIndexByID(id)
    return student
  }

  hasStudentWithID(id) {
    let hasStudent = false
    try {
      hasStudent = this.getStudentByID(id) !== null
    } catch (e) {
      hasStudent = false
    }
    return hasStudent
  }
}

module.exports = Cohort
