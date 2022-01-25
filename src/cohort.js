const CAPACITY_DEFAULT = 24

class Cohort {
  constructor(name) {
    this.name = name
    this.students = []
    this.capacity = CAPACITY_DEFAULT
  }

  addStudent(student) {
    if (this.students.length === this.capacity) {
      throw new Error('Cohort is full')
    }
    this.students.push(student)
  }

  removeStudent(student) {
    if (!this.hasStudentWithID(student.id)) {
      throw new Error('Student does not exist in the cohort')
    }
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

  findStudentsByFullName(name) {
    return this.students.filter(
      (student) =>
        `${student.firstname} ${student.lastname}`.toLowerCase() ===
        name.toLowerCase()
    )
  }
}

module.exports = Cohort
