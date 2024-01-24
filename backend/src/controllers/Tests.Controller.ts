import { Request, Response } from 'express'
import Prisma from '../../prisma/Generator'
import { GetTestWithAverageGrade } from '../../utils/Queries'
import { Test } from '../../utils/Types'


export async function GetUserTestsController(req: Request, res: Response) {
    const { Email } = req.params
    try { 
        const Tests: Array<Test> = await Prisma.$queryRaw(GetTestWithAverageGrade(Email))
        console.log(Tests)
        if (!Tests) return res.status(405).send('You Have no Tests at this point')
        res.status(200).send(Tests)
    } catch (error) {
        res.status(500).send(error)
    }
}

