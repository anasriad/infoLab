import { IoAddCircle } from "react-icons/io5"
import { MdGrade } from "react-icons/md"
import { NavLink } from "react-router-dom"

export default function TeacherOptions() {
    const Options = [
        {
            text: 'Grade a Test',
            link: '/account/Home/TestGrade',
            icons: <MdGrade />
        },
        {
            text: 'Create a Test',
            link: '/no',
            icons: <IoAddCircle />
        }
    ]
    return <>
        {Options.map((option) => {
            return <div><NavLink to={option.link} className={({ isActive }) => isActive ? "text-black bg-white p-2 rounded-xl flex items-center" : " text-white hover:bg-white hover:text-black p-2 rounded-xl hover:cursor-pointer gap-2 flex items-center"}>{option.icons}{option.text}</NavLink></div>
        })}
    </>
}