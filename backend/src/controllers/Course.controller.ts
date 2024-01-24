import { Request, Response } from "express";
import Prisma from "../../prisma/Generator";
import log from "../../utils/logger";

export async function GetAllCoursesController(req: Request, res: Response) {
    try {
        const Courses = await Prisma.course.findMany()
        res.status(200).send(Courses)
    } catch (error) {
        res.status(500).send('Error has occurred')
    }
}

export async function GetFilteredCoursesController(req: Request, res: Response) {
    const { Email } = req.params
    try {
        const Courses = await Prisma.course.findMany({
            where: {
                TeacherID: Email
            },
            select: {
                CourseID: true,
                Name: true,
                Field: true,
                Tests: true,
                Enrollers: true
            }
        })
        res.status(200).send(Courses)
    } catch (error) {
        res.status(500).send('Something Weird Happened!! Try Again')
    }
}

export async function GetFieldsOptionsController(req: Request, res: Response) {
    try {
        const Fields = Prisma.course.findMany({
            distinct: 'Field',
            select: {
                Field: true
            }
        })
        res.status(200).send(Fields)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}
