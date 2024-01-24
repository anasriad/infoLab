import Prisma from "../prisma/Generator";
import log from "./logger";

const getRandomUser = async () => {
    try {
        const User = await Prisma.user.findFirst({
            where: {
                Role: 'Teacher'
            },
            select: {
                Email: true,
                Password: true
            }
        })
        console.log(User)
        log.info('This Data has been provided RANDOMLY to test with in the Frontend')
    } catch (error) {
        log.error('Error has Occurred')
    }
}

getRandomUser()