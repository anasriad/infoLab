import Prisma from "../../prisma/Generator";
import { faker } from '@faker-js/faker'
import log from "../../utils/logger";
const Roles = ['Teacher', 'Learner']
const Fields = ['Finance', 'Astronomy', 'Mathematics', 'Biology', 'Physics', 'Chemistry', 'Computer Science', 'Psychology', 'Economics', 'Marketing', 'Management', 'Sociology', 'Geology', 'Neuroscience']
const Seeder = async () => {
    try {
        await Prisma.user.createMany({
            data: Array.from({ length: 30 }, () => ({
                UserID: faker.string.uuid(),
                FirstName: faker.person.firstName(),
                LastName: faker.person.lastName(),
                Role: faker.helpers.arrayElement(Roles),
                Email: faker.internet.email(),
                Password: faker.internet.password(),
                PhoneNumber: faker.phone.number(),
                ProfilePicture: faker.image.avatar()
            }))
        })
        const Users = await Prisma.user.findMany()
        await Prisma.course.createMany({
            data: Array.from({ length: 50 }, () => ({
                CourseID: faker.string.uuid(),
                Name: faker.person.fullName(),
                Field: faker.helpers.arrayElement(Fields),
                TeacherID: faker.helpers.arrayElement(Users).Email,
                Description: faker.lorem.paragraph({ min: 2, max: 5 }),
                Enrollers: faker.number.int({ min: 10, max: 150 })
            }))
        })
        const Courses = await Prisma.course.findMany()
        await Prisma.test.createMany({
            data: Array.from({ length: 20 }, () => ({
                Name: faker.word.noun(),
                CourseID: faker.helpers.arrayElement(Courses).CourseID,
                UserID: faker.helpers.arrayElement(Users).Email,
                PassedAt: faker.date.recent({ days: 40 }),
                GradedAt: faker.date.recent({ days: 4 }),
            }))
        })
        const Tests = await Prisma.test.findMany()
        await Prisma.questions.createMany({
            data: Array.from({ length: 80 }, () => ({
                QuestionID: faker.string.uuid(),
                Question: faker.commerce.productDescription(),
                Answer: faker.commerce.productName(),
                Points: faker.number.float({ min: 1, max: 10, precision: 0.1 }),
                Test: faker.helpers.arrayElement(Tests).TestID
            }))
        })
        await Prisma.feedback.createMany({
            data: Array.from({ length: 10 }, () => ({
                Rate: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
                Comment: faker.lorem.sentences({ min: 3, max: 5 }),
                UserID: faker.helpers.arrayElement(Users).Email
            }))
        })
        await Prisma.grade.createMany({
            data:Array.from({length:5}, ()=>({
                GradeID: faker.number.int({min:1, max:70}),
                grade: faker.number.float({min:1, max:100, precision:0.1}),
                Test: faker.helpers.arrayElement(Tests).TestID,
                Student: faker.helpers.arrayElement(Users).UserID
            }))
        })
        log.info('Data Seeded Successfully')
    } catch (error) {
        log.error(`cannot Seed Data due to ${error}`)
    }
}
Seeder()