import Header from "../components/Header";
import TypewriterComponent from "typewriter-effect";
import Feedback from "../components/Feedbacks";
import Animation from "../components/Background";
import { useState } from "react";
import HorizontalLine from "../components/CutLine";
import { RiCommunityFill } from 'react-icons/ri'
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
    const [Loading, setLoading] = useState(true)
    const Navigate = useNavigate()
    return <>
        {Loading &&
            <div className=" flex flex-col">
                <div>
                    <Header />
                </div>
                <div className=" font-Dosis flex justify-center text-center px-20 mt-6">
                    <Animation Color="#1a3aad" />
                    <div className=" flex flex-col py-28 gap-6">
                        <div className=" flex flex-col gap-2 w-72">
                            <div className="font-extrabold text-3xl">
                                <TypewriterComponent onInit={(typewriter) => {
                                    typewriter.typeString('Learn, Educate, & Enhance Your Skills')
                                        .changeDeleteSpeed(5)
                                        .pauseFor(60000)
                                        .start()
                                }} />
                            </div>
                            <div className=" mt-3">
                                <p>Join The Community to expand your knowledge, learn from the expert, and excel at what you love the mostt</p>
                            </div>
                        </div>
                        <div className=" flex justify-center">
                            <div><button className=" bg-green-500 text-white p-3 rounded-2xl hover:scale-105 hover:duration-300 hover:bg-indigo-600" onClick={() => Navigate('/join')}>Join Us</button></div>
                        </div>
                    </div>
                </div>
                <div>
                    <HorizontalLine />
                </div>
                <div className=" px-20">
                    <Feedback isLoaded={() => setLoading(true)} />
                </div>
                <div>
                    <HorizontalLine />
                </div>
                <div className=" flex flex-col gap-4 items-center p-6 font-semibold text-2xl">
                    <div className=" w-fit text-center">
                        <h1><i className=" text-blue-500">Enrich Yourself,</i> Don't Waste a <i className=" text-yellow-500">Golden</i> Opportunity</h1>
                    </div>
                    <div>
                        <button className=" bg-green-500 text-white p-3 rounded animate-pulse flex gap-2 items-center text-sm">
                            Join The Community Now
                            <RiCommunityFill /></button>
                    </div>
                </div>
                <div className=" mt-14">
                    <Footer />
                </div>
            </div>}
    </>
}