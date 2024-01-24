import { useEffect, useState } from "react"
import { Course } from "../../utils/types"
import axiosAPI from "../../utils/API/api.config"
import { useSelector } from "react-redux"
import { getCurrentUser } from "../../../redux/AuthSlice/AuthSlice"
import { motion } from 'framer-motion'
import { RingLoader } from "react-spinners"
import { AxiosError, isAxiosError } from "axios"
import toast from "react-hot-toast"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
export default function MyCourses() {
    const [Courses, setCourses] = useState<Course[]>()
    const { Email, FirstName } = useSelector(getCurrentUser)
    const [isLoading, setLoading] = useState(true)
    console.log(document.cookie)
    useEffect(() => {
        async function GetUserCourses() {
            try {
                const { data } = await axiosAPI.get(`Course/${Email}/GetFilteredCourses`)
                setCourses(data)
                setLoading(false)
            } catch (error) {
                if (isAxiosError(error)) {
                    const { response } = error as AxiosError
                    toast.error(`${response?.status == 401 ? `Dear ${FirstName}, following our efforts to protect your data we would ask you to log in again to make sure that it is you who make all the preferred operations` : response?.data}`)
                }
            }
        }
        GetUserCourses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (isLoading) return <div className=" flex justify-center"><RingLoader />{isLoading}</div>
    return <>
        <div className=" p-4 flex flex-wrap gap-16">
            {Courses?.map((course, index) => {
                return <motion.div
                    key={course.CourseID}
                    initial={{ translateX: -100, rotate: -50, opacity: 0 }}
                    animate={{ translateX: 0, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <div className=" bg-white rounded-xl shadow-md border-2 border-blue-400 p-7 flex flex-col gap-4 font-Dosis w-96 items-center h-80">
                        <div>
                            <h1 className=" font-extrabold text-3xl">{course.Field}</h1>
                            <h1>{course.Name}</h1>
                        </div>
                        <div className=" text-sm w-28">
                            <CircularProgressbar value={course.Enrollers} maxValue={100} text={course.Enrollers>=50?'Engaged':'Poor'} styles={buildStyles({
                                strokeLinecap: 'round',
                                textSize: '16px',
                                pathColor: `orange`,
                                textColor: 'blue',
                            })} />
                        </div>
                        <div>
                            <button className=" bg-blue-600 rounded-xl p-3 text-white hover:duration-300 hover:bg-indigo-600 hover:scale-125">Check</button>
                        </div>
                    </div>
                </motion.div>
            })}
        </div>
    </>
}