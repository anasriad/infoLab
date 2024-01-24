import { Request, Response } from 'express'
import Prisma from '../../prisma/Generator'
import log from '../../utils/logger'
export async function GetBestFeedbacksController(req: Request, res: Response) {
    try {
        const feedbacks = await Prisma.feedback.findMany({
            select: {
                Comment: true,
                Rate: true,
                CreatedAt: true,
                User: {
                    select: {
                        FirstName: true,
                        LastName: true,
                        ProfilePicture:true,
                        Role:true
                    },
                }
            },
            where: {
                Rate: {
                    gte: 3.5
                }
            },
            take: 6
        })

        !feedbacks.length ? log.info('No Records matching your condition') : res.status(200).send(feedbacks)

    } catch (error) {
        res.status(500).send('Error has occured')
    }
}