import { NextFunction, Request, Response } from "express"
import { VerifyToken } from "../../utils/JWT"
export default function ValidateRequest(req: Request, res: Response, next: NextFunction) {

    if (!req?.cookies?.accessToken) {

        const token = req?.cookies?.refreshToken

        if (!token) return res.status(405).send('Your Session Has Expired')

        try {

            VerifyToken(token, process.env.REFRESH_PRIVATE_TOKEN_KEY!)

        } catch (error) {

            return res.status(401).send('Unauthorized')
        }
    }

    else {

        try {

            VerifyToken(req.cookies.accessToken, process.env.ACCESS_PRIVATE_TOKEN_KEY!)

        } catch (error) {

            return res.status(401).send('Unauthorized')

        }
        
    }

    return next()

}