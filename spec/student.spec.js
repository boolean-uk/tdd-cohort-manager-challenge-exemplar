const Student = require('../src/student')

describe('Student', () => {
  it('can save values for id, first name, last name, github, and email', () => {
    // set up
    const expected = {
      id: 'some-id',
      firstname: 'lewis',
      lastname: 'campbell',
      github: 'github.com/auenc',
      email: 'some.email@email.com'
    }
    // execute
    const student = new Student(
      expected.id,
      expected.firstname,
      expected.lastname,
      expected.github,
      expected.email
    )
    // verify
    expect(student.id).toEqual(expected.id)
    expect(student.firstname).toEqual(expected.firstname)
    expect(student.lastname).toEqual(expected.lastname)
    expect(student.github).toEqual(expected.github)
    expect(student.email).toEqual(expected.email)
  })
})
