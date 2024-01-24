import Prisma from "../../prisma/Generator"
import log from "../../utils/logger"

const CleanDatabase = async () => {
    try {
        await Promise.all([
            Prisma.test.deleteMany({}),
            Prisma.course.deleteMany({}),
            Prisma.user.deleteMany({}),
            Prisma.questions.deleteMany({}),
            Prisma.feedback.deleteMany({}),
            Prisma.grade.deleteMany({})
        ])
        log.info('Database is Cleaned Successfully!')
    } catch (error) {
        log.error('Cannot Clean Database due to '+ error)
    }
}
CleanDatabase()