import { IconType } from "react-icons"
import { useNavigate } from "react-router-dom"

interface Props {
    Array: {
        title: string
        link: string
        icon: IconType
        PerformAction?: () => void
    }[]
}
export default function Dropdown(Data: Props) {
    const { Array } = Data
    const Navigate = useNavigate()
    return <>
        <div className=" bg-gray-100 flex flex-col gap-3">
            {Array.map((data, index) => {
                const { PerformAction } = data
                return <div key={index} onClick={() => data.link.length ? Navigate(data.link) : PerformAction && PerformAction()} className=" p-2 hover:bg-blue-600 hover:duration-300 flex items-center hover:cursor-pointer hover:text-white gap-2">{data.icon({})}<b>{data.title}</b></div>
            })}
        </div>
    </>
}