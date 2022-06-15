class Student {
  constructor (studentDetails) {
    const { id, first, last, email, githubUser } = studentDetails
    this.id = id
    this.first = first
    this.last = last
    this.email = email
    this.githubUser = githubUser
  }

  // getters and setters are an important topic in OOP - below are examples for this class ;)

  setId (id) {
    this.id = id
  }

  setFirst (first) {
    this.first = first
  }

  setLast (last) {
    this.last = last
  }

  setEmail (email) {
    this.email = email
  }

  setGithubUser (githubUser) {
    this.githubUser = githubUser
  }

  getId () {
    return this.id
  }

  getFirst () {
    return this.first
  }

  getLast () {
    return this.last
  }

  getEmail () {
    return this.email
  }

  getGithubUser () {
    return this.githubUser
  }
}

module.exports = Student
