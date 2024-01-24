import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LandingPage from "./pages/Landing"
import './App.css'
import SignIn from "./pages/SignIn"
import Home from "./components/Home"
import PrivateRouter from "./utils/PrivateRouter"
import AllCourses from "./components/Cards/AllCourses"
import MyCourses from "./components/Cards/myCourses"
import { useSelector } from "react-redux"
import { getCurrentUser } from "../redux/AuthSlice/AuthSlice"
import { useEffect } from "react"
import MyTests from "./components/Cards/myTests"
function App() {

  const User = useSelector(getCurrentUser)

  useEffect(() => {

    !User ? <Navigate to='/' /> : <Navigate to='/account/Home' />

  }, [User])

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/signIn" element={<SignIn />} />

          {/*Private Routes */}
          <Route element={<PrivateRouter />}>
            <Route path="account">
              <Route index element={<Navigate to='/account/Home' />} />
              <Route path="Home" element={<Home />}>
                <Route index element={<AllCourses />} />
                <Route path="MyCourses" element={<MyCourses />} />
                <Route path="myTests" element={<MyTests />} />
              </Route>
            </Route>
          </Route>


        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
