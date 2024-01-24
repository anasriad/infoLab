import { useEffect, useState } from "react"
import { Test } from "../../utils/types"
import { motion } from "framer-motion"
import axiosAPI from "../../utils/API/api.config"
import { useSelector } from "react-redux"
import { getCurrentUser } from "../../../redux/AuthSlice/AuthSlice"
import toast from "react-hot-toast"
import { RingLoader } from "react-spinners"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'
import { AxiosError, isAxiosError } from "axios"
export default function MyTests() {

    const { Email } = useSelector(getCurrentUser)
    const [isLoading, setLoading] = useState(true)
    const [Tests, setTests] = useState<Test[]>()
    useEffect(() => {
        async function GetTests() {
            try {
                const { data } = await axiosAPI.get(`Test/${Email}/getUserTests`)
                setTests(data)
                setLoading(false)
            } catch (error) {
                if (isAxiosError(error)) {
                    const { response } = error as AxiosError
                    toast.error(`${response?.data}`)
                }
            }
        }
        GetTests()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (isLoading) return <div className=" flex justify-center"><RingLoader />{isLoading}</div>
    return <>
        <div className=" p-4 flex flex-wrap gap-16">
            {Tests?.map((Test, index) => {
                return <motion.div
                    key={Test.TestID}
                    initial={{ translateX: -100, rotate: -50, opacity: 0 }}
                    animate={{ translateX: 0, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <div className=" bg-white rounded-xl shadow-md border-2 border-blue-400 p-7 flex flex-col gap-4 font-Dosis w-96 items-center h-80">
                        <div>
                            <h1>{Test.Name}</h1>
                        </div>
                        <div className=" flex flex-col items-center gap-1">
                            <h3 className=" text-sm">Current Grade Average...:</h3>
                            <div className=" w-28">
                                <CircularProgressbar value={Test.averagegrade} styles={buildStyles({
                                strokeLinecap: 'round',
                                textSize: '16px',
                                pathColor: `${Test.averagegrade <= 70 ? (Test.averagegrade < 30 ? 'black' : 'red') : (Test.averagegrade < 80 ? 'orange' : 'green')}`,
                                textColor: `${Test.averagegrade <= 70 ? (Test.averagegrade < 30 ? 'black' : 'red') : (Test.averagegrade < 80 ? 'orange' : 'green')}`,
                            })} text={Test.averagegrade >= 70 ? 'Fair' : 'Problem'} />
                            </div>
                            
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