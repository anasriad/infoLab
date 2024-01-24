import { Request, Response } from "express"
import Prisma from "../../prisma/Generator"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { GenerateRefreshToken, GenerateWebToken } from "../../utils/JWT"
import log from "../../utils/logger"
import dotenv from 'dotenv'

dotenv.config()

export async function UserSignInController(req: Request, res: Response) {
    const { email, password } = req.body
    try {
        const User = await Prisma.user.findUniqueOrThrow({
            where: {
                Email: email,
            },
            select: {
                UserID: true,
                FirstName: true,
                LastName: true,
                Email: true,
                Password: true,
                PhoneNumber: true,
                ProfilePicture: true,
                Role: true,
            }
        })
        if (User.Password === password) {

            res.cookie
                (
                    'accessToken',

                    GenerateWebToken
                        (

                            { ID: User.UserID, Role: User.Role },

                            process.env.ACCESS_PRIVATE_TOKEN_KEY!
                        ),

                    { maxAge: 900000 }
                )

            res.cookie
                (
                    'refreshToken',

                    GenerateRefreshToken
                        (
                            { ID: User.UserID, Role: User.Role },

                            process.env.REFRESH_PRIVATE_TOKEN_KEY!
                        ),

                    { maxAge: 9000000 }
                )

            res.status(200).send(User)
        }
    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) {

            if (error.code === "P2025") res.status(501).send('No Matching Credentials')
        }

        else {
            
            res.status(500).send('Backend Server Because of Token')
            log.error(error)
        }

    }
}

export function LogoutUserController(req: Request, res: Response) {

    res.clearCookie('accesstoken')

    res.clearCookie('refreshtoken')

    res.send('User Logged Out')
}