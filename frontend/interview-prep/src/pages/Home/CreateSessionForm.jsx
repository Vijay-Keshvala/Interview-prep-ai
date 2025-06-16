import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import SpinnerLoader from '../../components/Loader/SpinnerLoader'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: value
        }));
    }

    const handleCreateSession = async (e) => {
        e.preventDefault();
        const { role, experience, topicsToFocus } = formData

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all the fields")
            return;
        }
        setError("");
        setIsLoading(true)

        try {
            // Call API to generate questions
            const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,{
                role,
                experience,
                topicsToFocus,
                numberOfQuestions:10
            });

            //Should be array like //
            const generateQuestions = aiResponse.data;

            const reponse = await axiosInstance.post(API_PATHS.SESSION.CREATE,{
                ...formData,
                questions: generateQuestions
            });

            if(reponse.data?.session?._id){
                navigate(`/interview-prep/${reponse.data?.session?._id}`)
            }

        } catch (error) {
            if (error.reponse && error.response.data.message) {
                setError(error.response.data.message)
            }else{
                console.log("Something went wrong please try again later");
            }
        }finally{
            setIsLoading(false);
        }
    }
    return (
        <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center'>
            <h3 className='text-lg font-semibold text-black'>
                Start New Interview Journey
            </h3>
            <p className='text-xs text-slate-700 mt-[5px] mb-3'>
                fill out few details quickly and unlock your personalized set of interview questions!
            </p>
            <form action="" onSubmit={handleCreateSession} className='flex flex-col gap-3'>
                <Input
                    value={formData.role}
                    onChange={({ target }) => handleChange("role", target.value)}
                    label="Target Role"
                    placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
                    type="text"
                />

                <Input
                    value={formData.experience}
                    onChange={({ target }) => handleChange("experience", target.value)}
                    label="Experience"
                    placeholder="(e.g., 1 year, 2 year, etc.)"
                    type="text"
                />

                <Input
                    value={formData.topicsToFocus}
                    onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                    label="Topics To Focus On"
                    placeholder="(Comma-seperated e.g., React, JS, HTML etc.)"
                    type="text"
                />

                <Input
                    value={formData.description}
                    onChange={({ target }) => handleChange("description", target.value)}
                    label="Description"
                    placeholder="(Any specific goals or notes for this session)"
                    type="text"
                />

                {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                <button type="submit"
                    className='btn-primary w-full mt-2'
                    disabled={isLoading}
                >
                   {isLoading && <SpinnerLoader/>} Create Session
                    </button>
            </form>
        </div>
    )
}

export default CreateSessionForm
