import { useEffect, useState } from "react"
import axiosAPI from "../utils/API/api.config"
import { feedback } from "../utils/types"
import StarRatings from 'react-star-ratings'
interface Props {
    isLoaded: () => void
}
export default function Feedback(Properties: Props) {
    const { isLoaded } = Properties
    const [Feedback, setFeedback] = useState<feedback[]>()
    useEffect(() => {
        async function getFeedbacks() {
            try {
                const { data } = await axiosAPI.get('Feedback/getBestFeedbacks')
                setFeedback(data)
                isLoaded()
            } catch (error) {
                
            }
        }
        getFeedbacks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <>
        <div className=" flex flex-row gap-4 flex-wrap">
            {Feedback?.map((feedback) => {
                return <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center pb-10">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`${feedback.User.ProfilePicture}`} alt="Bonnie image" />
                        <h5 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{feedback.User.FirstName}</h5>
                        <div className=" flex  items-center gap-2">
                            <StarRatings rating={feedback.Rate} starRatedColor="orange" numberOfStars={5} name="rating" starDimension="30px" />
                            <h3>( {feedback.Rate} )</h3>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">{feedback.User.Role}</span>
                        <div className=" p-4 text-sm text-center">
                            <p>
                                {feedback.Comment}
                            </p>
                        </div>
                    </div>
                </div>
            })}
        </div>


    </>
}