import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets.js";
import { createContext, useEffect, useState } from "react";
import CourseCart from "../components/student/CourseCart";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

    const [allCourses,setAllCourses] = useState([])
    const [isEducator,setIsEducator] = useState(true)
    const [enrolledCourses,setEnrolledCourses] = useState([])

    const calculateRating = (course) => {
        if (!course?.courseRatings?.length) {
            return 0
        }
        let totalRating = course.courseRatings.reduce((acc, rating) => acc + rating.rating, 0)
        return totalRating / course.courseRatings.length
    }

    //  fetch usr enrolled courses

    const  FetchUserEnrolledCourses = async ()=> {
        setEnrolledCourses(dummyCourses)
    }

    // Function to calculate course chapter time

    const calculateChapterTime = (chapter) => {
        let time = 0
        chapter.chapterContent.map((lecture)=>{
            time+= lecture.lectureDuration
        })
        return humanizeDuration(time * 60 * 1000,{units: ["h","m"]})
    }

    // Course Duration

    const calculateCourseDuration = (course) => {
        let time = 0

        course.courseContent.map((chapter)=> chapter.chapterContent.map(
            (lecture) => time += lecture.lectureDuration
        ))
        return humanizeDuration(time * 60 * 1000,{units: ["h","m"]})
    }

    // number of lectures
    const calculateNoOfLectures = (course)=> {
        let totalLecture = 0
        course.courseContent.forEach(chapter=>{
            if(Array.isArray(chapter.chapterContent)){
                totalLecture+=chapter.chapterContent.length
            }
        })
        return totalLecture;
    }
    

    const fetchAllCourses = async ()=> {
        setAllCourses(dummyCourses)
    }

    useEffect(()=>{
        fetchAllCourses()
        FetchUserEnrolledCourses()
    },[])

    const value = {
        currency,allCourses,navigate,calculateRating,isEducator,setIsEducator,calculateChapterTime,calculateCourseDuration
        ,calculateNoOfLectures,enrolledCourses,FetchUserEnrolledCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}