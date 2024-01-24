import express from 'express'
import FeedbackRoute from './Feedback.Router'
import UserRouter from './User.Router'
import CourseRouter from './Course.Router'
import TestRouter from './Tests.Router'

const Router = express()

Router.use('/Feedback', FeedbackRoute)
Router.use('/User', UserRouter)
Router.use('/Course', CourseRouter)
Router.use('/Test', TestRouter)

export default Router