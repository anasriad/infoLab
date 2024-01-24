import express from 'express'
import { LogoutUserController, UserSignInController } from '../controllers/User.controller'
const UserRouter = express()
UserRouter.post('/SignInUser', UserSignInController)
UserRouter.delete('/logout', LogoutUserController)
export default UserRouter