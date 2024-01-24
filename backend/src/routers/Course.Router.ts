import express from 'express'
import { GetAllCoursesController, GetFieldsOptionsController, GetFilteredCoursesController } from '../controllers/Course.controller'
import ValidateRequest from '../middlewares/ValidateRequest'

const CourseRouter = express()

CourseRouter.get('/getAllCourses', ValidateRequest, GetAllCoursesController)
CourseRouter.get(`/:UserID/GetFilteredCourses`, ValidateRequest, GetFilteredCoursesController)
CourseRouter.get('/getOptions', GetFieldsOptionsController)

export default CourseRouter