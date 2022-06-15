const Student = require('./student')

class Cohort {
  constructor (name) {
    this.name = name
    this.students = []
  }

  // getters and setters are an important topic in OOP - below are examples for this class ;)

  getName () {
    return this.name
  }

  getStudents () {
    return this.students
  }

  setName (name) {
    this.name = name
  }

  setStudents (students) {
    this.students = students
  }

  addStudent (studentDetails) {
    const student = new Student(studentDetails)
    this.students.push(student)
    return student
  }

  searchForStudent (studentDetails) {
    const found = this.students.some((student) => {
      const id = student.getId()
      const first = student.getFirst()
      const last = student.getLast()
      const email = student.getEmail()
      const githubUser = student.getGithubUser()

      return (
        id === studentDetails.id &&
        first === studentDetails.first &&
        last === studentDetails.last &&
        email === studentDetails.email &&
        githubUser === studentDetails.githubUser
      )
    })
    return found
  }

  removeStudent (studentDetails) {
    const found = this.searchForStudent(studentDetails)
    if (found) {
      const filtered = this.students.filter((student) => {
        const id = student.getId()
        const first = student.getFirst()
        const last = student.getLast()
        const email = student.getEmail()
        const githubUser = student.getGithubUser()

        return (
          id !== studentDetails.id &&
          first !== studentDetails.first &&
          last !== studentDetails.last &&
          email !== studentDetails.email &&
          githubUser !== studentDetails.githubUser
        )
      })
      this.students = filtered
    }
    return found
  }
}

module.exports = Cohort
