const Cohort = require('../src/cohort')

describe('Cohort', () => {
  it('can set its initial values', () => {
    // set up
    const expected = {
      name: 'Cohort 4'
    }
    // execute
    const result = new Cohort(expected.name)
    // verify
    expect(result.name).toEqual(expected.name)
  })
})
