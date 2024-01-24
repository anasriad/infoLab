import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser, logout } from "../../redux/AuthSlice/AuthSlice"
import { useEffect, useState } from "react"
import { FaSearch, FaUserGraduate } from 'react-icons/fa'
import { IoSettings, IoLogOut, IoAddCircle } from 'react-icons/io5'
import Dropdown from "./Dropdown"
import { motion } from 'framer-motion'
import { NavLink, Navigate, Outlet } from "react-router-dom"
import axiosAPI from "../utils/API/api.config"
import Select from "react-select"
import toast from "react-hot-toast"
export default function Home() {
  const [Options, setOptions] = useState<string[]>()
  const [Message, setMessage] = useState<string>('Welcome')
  const [Root, setRoot] = useState<string>('Course')
  const [Text, setText] = useState('Fields')
  setInterval(() => {
    setMessage('Enjoy')
  }, 100000)

  useEffect(() => {
    async function GetOptions() {
      try {
        const { data } = await axiosAPI.get(`/${Root}/getOptions`)
        setOptions(data)
      } catch (error) {
        toast.error('Cannot get options for select')
      }
    }
    GetOptions()
  }, [Root])

  const handleLogout = async () => {
    try {
      await axiosAPI.delete('User/logout')
    } catch (error) {
      console.log('nothing')
    }
  }
  const User = useSelector(getCurrentUser)

  if (!User) { <Navigate to='/SignIn' /> }

  const dispatch = useDispatch()

  const handleNavChange = async (Root: string) => {
    Root === 'Course' ? setText('Fields') : setText('Course')
    setRoot(Root)
  }

  const [DropDown, setDropDown] = useState(false)

  return <>

    <div className=" flex flex-col gap-12">
      <div>
        <header>
          <nav className="bg-blue-400 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <a href="/account/Home" className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap text-white">InfoLab</span>
              </a>
              <div className=" flex gap-4 items-center">
                <div>
                  <NavLink to='/account/Home' className={({ isActive }) => isActive ? "text-black bg-orange p-2 rounded-xl" : "text-white hover:bg-white hover:text-black p-2 rounded-xl hover:cursor-pointer"}>Home</NavLink></div>
                <div onClick={() => {
                  handleNavChange('Test')
                }}>
                  <NavLink to='/account/Home/myTests' className={({ isActive }) => isActive ? "text-black bg-white p-2 rounded-xl" : "text-white hover:bg-white hover:text-black p-2 rounded-xl hover:cursor-pointer"}>My Tests</NavLink></div>
                <div onClick={() => {
                  handleNavChange('Course')
                }}>
                  <NavLink to='/account/Home/myCourses' className={({ isActive }) => isActive ? "text-black bg-white p-2 rounded-xl" : "text-white hover:bg-white hover:text-black p-2 rounded-xl hover:cursor-pointer"}>My Courses</NavLink></div>
                {
                  User.Role == 'Teacher' && <>
                    <div>
                      <NavLink to='no' className={({ isActive }) => isActive ? "text-black bg-white p-2 rounded-xl flex items-center" : " text-white hover:bg-white hover:text-black p-2 rounded-xl hover:cursor-pointer gap-2 flex items-center"}><IoAddCircle /> Create a Test</NavLink>
                    </div>
                  </>
                }

              </div>
              <div className="flex items-center lg:order-2 gap-5" onMouseEnter={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
                <button><img src={User?.ProfilePicture} className="rounded-full w-9"></img></button>
                <motion.div initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: DropDown ? 1 : 0, y: DropDown ? 0 : 10 }}
                  transition={{ duration: 0.3 }}>
                  <div className=" absolute right-3 top-14 z-50">
                    {DropDown && <Dropdown Array={[{ title: 'Profile', icon: FaUserGraduate, link: 'account/Profile' }, { title: 'Account Settings', icon: IoSettings, link: '/account/settings' }, {
                      title: 'Logout', icon: IoLogOut, link: '', PerformAction: () => {

                        handleLogout()

                        dispatch(logout())

                      }
                    }]} />
                    }
                  </div>
                </motion.div>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <div className=" p-4 font-extrabold text-2xl flex flex-col gap-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className=" flex justify-between">
            <div>
              <h1>{`${Message}!, ... ${User?.FirstName} ${User?.LastName}`}</h1>
            </div>
            <div className=" flex gap-3 items-center">
              <FaSearch />
              <input type="search" className=" border-b border-blue-500 focus:outline-none text-sm w-52 p-2" placeholder="Search Courses"></input>
            </div>
            <div className=" flex items-center gap-4 font-bold text-sm">
              <h2>Filter by {Text}</h2>
              <div className=" w-48">
                <Select options={Options} />
              </div>
            </div>
          </div>
        </motion.div>
        <div>
          <hr className=" border-2"></hr>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>

  </>
}