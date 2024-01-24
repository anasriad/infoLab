import argon from 'argon2'
import bycrypt from 'bcryptjs'
import log from './logger'
import { generateKey } from 'crypto'
import Prisma from '../prisma/Generator'
const GenerateSecretKet = async () => {
    var SecretKey
    try {
        const salt = await bycrypt.genSalt(10)
        generateKey('hmac', { length: 60 }, (err, key) => {
            bycrypt.hash(key.export().toString(), salt).then((secKey) => SecretKey = argon.hash(secKey))
        })
        return SecretKey
    } catch (error) {
        log.error('Found Error in Generating a Secret key due to ' + error)
    }
}

