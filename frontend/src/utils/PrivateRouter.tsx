import { useSelector } from "react-redux"
import { getCurrentUser } from "../../redux/AuthSlice/AuthSlice"
import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRouter() {
    const User = useSelector(getCurrentUser)
    return (
        User ? <Outlet /> : <Navigate to='/signIn' />
    )
}