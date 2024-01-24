import express from 'express'
import { GetUserTestsController } from '../controllers/Tests.Controller'
import ValidateRequest from '../middlewares/ValidateRequest'
import { GetAllCoursesController } from '../controllers/Course.controller'
const TestRouter = express()

TestRouter.get('/getOptions', ValidateRequest, GetAllCoursesController)
TestRouter.get('/:Email/getUserTests', GetUserTestsController)
export default TestRouter
