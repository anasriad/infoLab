export interface feedback {
    Rate: number
    Comment: string
    CreatedAt: string
    User: {
        FirstName: string
        LastName: string
        ProfilePicture: string
        Role: string
    }
}

export interface Course {
    CourseID: string
    Name: string
    Field: string
    Description: string
    Enrollers: number
}

export interface User {
    UserID: string
    FirstName: string,
    LastName: string
    Email: string
    Password: string
    Role: string
    Phone_Number: string
    ProfilePicture: string
    Courses: Course[]

}

export interface Question {
    QuestionID: string
    Question: string
    Answer: string
    Points: number
    Test: number
    test: Test
}

export interface Test {
    TestID: number
    Name: string
    PassedAt: string
    GradedAt: string
    CourseID: string
    Course: Course
    UserID: string
    User: User
    Questions: Question[]
    Average: number

}
