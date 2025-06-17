import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import RoleInfoHeader from './components/RoleInfoHeader';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import moment from "moment"
import { motion, AnimatePresence } from 'framer-motion' // <-- add this import
import QuestionCard from '../../components/Cards/QuestionCard';
import { LuCircleAlert } from 'react-icons/lu';
import AIResponsePreview from './components/AIResponsePreview';
import Drawer from '../../components/Drawer';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';
const InterviewPrep = () => {

  const {sessionId} = useParams();

  const [sessionData, setSessionData] = useState("")
  const [errorMsg,setErrorMsg] = useState("");

  const [openLeanMoreDrawer,setOpenLeanMoreDrawer] = useState(false)
  const [explanation,setExplanation] = useState(null)

  const [isLoading,setIsLoading] = useState(false)
  const [isUpdateLoader,setUpdateLoader] = useState(false)

  //Fetch session data by session id
  const fetchSessionDetailsById = async ()=>{
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId))
      if(response.data && response.data.session){
        setSessionData(response.data.session)
      }
    } catch (error) {
      console.log("Error",error);
    }
  }

  //Generate concept explanation 
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);
  
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );
  
      // ✅ Fix: Extract from correct keys
      if (response.data && response.data.title && response.data.answer) {
        setExplanation({
          title: response.data.title,
          explanation: response.data.answer, // use 'answer' here
        });
      } else {
        setErrorMsg("Invalid response structure.");
      }
  
    } catch (error) {
      setErrorMsg("Failed to generate explanation. Please try again later.");
      console.log("Error in explanation generation:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  //Pin question 
  const toggleQuestionPinStatus = async(questionId)=>{
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId))
      console.log(response);

      if(response.data && response.data.question){
        fetchSessionDetailsById();
      }

    } catch (error) {
      console.log("Error",error);
    }
  }

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
      question={sessionData?.questions?.length || "-"}
      description={sessionData?.description || ""}
      lastUpdate={
        sessionData?.updatedAt
        ? moment(sessionData.updatedAt).format("D MM YYYY")
        : ""
      }
     />

     <div className='container mx-auto pt-4 pb-4 px-4 md:px-0'>
      <h2 className='text-lg font-semibold color-black'>Interview Q & A</h2>

      <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
        <div
        className={`col-span-12 ${
          openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
        }`}
        >
          <AnimatePresence>
            {sessionData?.questions?.map((data, index) => {
              return (
                <motion.div 
                key={data._id || index}
                initial={{opacity:0, y:-20}}
                animate={{opacity:1, y:0}}
                exit={{opacity:0, scale:0.95}}
                transition={{
                  duration: 0.4,
                  type:"spring",
                  stiffness:100,
                  delay:index * 0.1,
                  damping: 15,
                }}
                layout
                layoutId={`question-${data._id || index}`}
                >
                  <>
                  <QuestionCard
                  question={data?.question}
                  answer={data?.answer}
                  onLearnMore={()=>
                    generateConceptExplanation(data.question)
                  }
                  isPinned={data?.isPinned}
                  onTogglePin={()=>toggleQuestionPinStatus(data._id)}
                  />
                  </>
                </motion.div>
              );
            })};
          </AnimatePresence>
        </div>
      </div>
      <div>
      <Drawer
  isOpen={openLeanMoreDrawer}
  onClose={() => setOpenLeanMoreDrawer(false)}
  title={!isLoading && explanation?.title}
>
  {errorMsg && (
    <p className='flex gap-2 text-sm text-amber-600 font-medium'>
      <LuCircleAlert /> {errorMsg}
    </p>
  )}

  {isLoading && <SkeletonLoader />}

  {!isLoading && explanation && (
    <AIResponsePreview content={explanation.explanation} />
  )}
</Drawer>

      </div>
     </div>
    </DashboardLayout>
  )
}

export default InterviewPrep
