import { useState } from "react"
import { UserCredentials } from "../utils/types"
import Animation from "../components/Background"
import axiosAPI from "../utils/API/api.config"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Login, getCurrentUser } from "../../redux/AuthSlice/AuthSlice"
import { AxiosError, isAxiosError } from "axios"
import toast from "react-hot-toast"
export default function SignIn() {
    const Navigate = useNavigate()
    const user = useSelector(getCurrentUser)
    user ? Navigate('/account/Home') : undefined
    const dispatch = useDispatch()
    const [Values, setValues] = useState<UserCredentials>({ email: '', password: '' })
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            const { data } = await axiosAPI.post('User/SignInUser', Values)
            dispatch(Login({ user: data }))
            Navigate('/account/Home')
        } catch (error) {
            if (isAxiosError(error)) {
                const { response } = error as AxiosError
                toast.error(`${response?.data}`)
            }
        }
    }
    return <>
        <div className="flex justify-center mt-24 font-bold text-center">
            <Animation Color="" />
            <div className=" font-Dosisflex flex flex-col gap-8 items-center border border-blue-900 rounded-xl p-9 bg-white">
                <div>
                    <h1>Login to Your Account</h1>
                </div>
                <div>
                    <form className=" flex flex-col gap-11" onSubmit={handleSubmit}>
                        <div className=" flex flex-col">
                            <label>Email:</label>
                            <input type="email" className=" border-b-2 border-green-500 p-2 w-80 focus:border-green-200 focus:outline-none focus:duration-300" placeholder="username@infolab.info " onChange={(e) => setValues({ ...Values, email: e.target.value })}></input>
                        </div>
                        <div className=" flex flex-col">
                            <label>Password:</label>
                            <input type="password" className=" border-b-2 border-green-500 p-2 w-80 focus:border-green-200 focus:outline-none focus:duration-300" placeholder="Well,..your password here" onChange={(e) => setValues({ ...Values, password: e.target.value })}></input>
                        </div>
                        <div>
                            <button className="  bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-400 hover:duration-300 w-44" type="submit">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}