
Project Scope:
- Search for cohort by cohort name
- Search for student by student ID
- Create a cohort with a cohort name
- Remove a Cohort by cohort name
- Add student to a specific cohort
- Remove student from a specific cohort
- Return errors if student or cohort not found



Domain Model
- CohortManager class
  - Properties:
    - cohorts: [Cohort]
  - Methods:
    - createCohort(name: String): boolean
    - removeCohort(name: String): boolean
    - getCohort(name: String): Cohort or CohortNotFoundError
    - getStudent(id: String): Student or StudentNotFoundError
    - addStudentToCohort(cohortName: String, student: Student)
    - removeStudentFromCohort(cohortName: String, student: Student)
- Cohort class
  - Properties
    - name: String
  - Methods:
    - getName(): String
    - getStudent(id: String) : Student or StudentNotFoundError
    - addStudent(cohortName: String, student: Student): boolean
- Student class
  - Properties
    - studentId: String
    - firstName: String
    - lastName: String
    - githubUsername: String
    - email: String
