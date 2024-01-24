import express from 'express'
import { GetBestFeedbacksController } from '../controllers/Feedback.controller'
const FeedbackRoute = express()
FeedbackRoute.get('/getBestFeedbacks', GetBestFeedbacksController)
export default FeedbackRoute