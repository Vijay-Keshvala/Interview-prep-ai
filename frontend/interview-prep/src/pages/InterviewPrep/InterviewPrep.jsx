import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import RoleInfoHeader from './components/RoleInfoHeader';
import { useParams } from 'react-router-dom';
const InterviewPrep = () => {

  const {sessionId} = useParams();

  const [sessionData, setSessionData] = useState("")
  const [errorMsg,setErrorMsg] = useState("");

  const [openLeanMoreDrawer,setOpenLeanMoreDrawer] = useState(false)
  const [explanation,setExplanation] = useState(null)

  const [isLoading,setIsLoading] = useState(false)
  const [isUpdateLoader,setUpdateLoader] = useState(false)

  //Fetch session data by session id
  const fetchSessionDetailsById = ()=>{}

  //Generate concept explanation 
  const generateConceptExplanation = async (question)=>{}

  //Pin question 
  const toggleQuestionPinStatus = async(questionId)=>{}

  //Add more question to session 
  const uploadMoreQuestion = async()=>{}

  useEffect(()=>{
    if(sessionId){
      fetchSessionDetailsById()
    }
  },[])


  return (
    <DashboardLayout>
      <RoleInfoHeader
      role={sessionData?.role || ""}
      topicsToFocus={sessionData?.topicsToFocus || ""}
      experience={sessionData?.experience || "-"}
      question={sessionData?.question?.length || "-"}
      description={sessionData?.description || ""}
      lastUpdate={
        sessionData?.updatedAt
        ? moment(sessionData.updatedAt).format("D MM YYYY")
        : ""
      }
     />

    </DashboardLayout>
  )
}

export default InterviewPrep
