import { useSelector } from "react-redux"
import { getCurrentUser } from "../../../redux/AuthSlice/AuthSlice"
import { useEffect, useState } from "react"
import { Course } from "../../utils/types"
import axiosAPI from "../../utils/API/api.config"
import { CheckForValueIfExists } from "../../utils/Helpers"
import TypewriterComponent from "typewriter-effect"
import { motion } from "framer-motion"
import { RingLoader } from "react-spinners"
import { AxiosError, isAxiosError } from "axios"
import toast from "react-hot-toast"
export default function AllCourses() {
    const User = useSelector(getCurrentUser)
    const [Courses, setCourses] = useState<Course[]>()
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        async function getCourses() {
            try {
                const { data } = await axiosAPI.get('Course/getAllCourses')
                setCourses(data)
                setLoading(false)
            } catch (error) {
                if (isAxiosError(error)) {
                    const { response } = error as AxiosError
                    toast.error(`${response?.status == 401 ? `Dear ${User.FirstName}, following our efforts to protect your data we would ask you to log in again to make sure that it is you who make all the preferred operations` : response?.data}`)
                }
            }
        }
        getCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) return <div className=" flex justify-center"><RingLoader /></div>

    return <>
        <div className=" font-bold flex justify-center">
            <TypewriterComponent onInit={(typeWriter) => {
                typeWriter.typeString('Engage To Many Courses')
                    .changeDeleteSpeed(5)
                    .pauseFor(6000)
                    .start()
            }} />
        </div>
        <div className=" p-4 flex flex-wrap gap-16">

            {Courses?.map((course, index) => {
                return <motion.div
                    key={course.CourseID}
                    initial={{ translateX: -100, rotate: -50, opacity: 0 }}
                    animate={{ translateX: 0, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <div className=" bg-white rounded-xl shadow-md border-2 border-blue-400 p-7 flex flex-col gap-4 font-Dosis w-96 items-center h-80 justify-between">
                        <div>
                            <h1 className=" font-extrabold text-3xl">{course.Field}</h1>
                            <h1>{course.Name}</h1>
                        </div>
                        <div className=" text-sm">
                            <p>{course.Description}</p>
                        </div>
                        <div className=" text-xl flex gap-10">
                            <button className=" bg-green-600 text-white p-2 rounded-xl">{
                                CheckForValueIfExists(course.CourseID, User.Courses) ? 'Enroll' : 'Already Enrolled In'
                            }</button>
                            <button className=" bg-blue-600 text-white p-2 rounded-xl">Save</button>
                        </div>
                    </div>
                </motion.div>
            })}
        </div>
    </>
}