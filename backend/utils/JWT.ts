import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const GenerateWebToken = (payload: object, SecretKey: string) => {

    return jwt.sign(payload, SecretKey, { expiresIn: '15min', algorithm: 'HS384' })
}

export const GenerateRefreshToken = (payload: object, SecretKey: string) => {

    return jwt.sign(payload, SecretKey, { expiresIn: '1h', algorithm: 'HS384' })
}

export const VerifyToken = (ReqToken: string, Key: string) => {

    jwt.verify(ReqToken, Key, (err, decoded) => {

        if (err) {

            throw new Error('Token Do Not Match, This Request Cannot Be Trusted')
        }
        else {
            return true
        }

    })
}

export const GetPayload = (ReqToke: string, Key: string) => {
    jwt.verify(ReqToke, Key, (err, decoded) => {
        if (err) {
            return err
        }
        else {
            return decoded
        }
    })
}
