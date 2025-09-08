import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MockInterviewForm from "./MockInterviewForm";
import InterviewSession from "./InterviewSession";

export default function MockInterviewPage() {
    const [config, setConfig] = useState(null);
    const navigate = useNavigate();

    // fake auth check - replace with your real login state
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/"); // redirect to index page
        }
    }, [isLoggedIn, navigate]);

    return config ? (
        <InterviewSession config={config} onExit={() => setConfig(null)} />
    ) : (
        <MockInterviewForm onStart={(data) => setConfig(data)} />
    );
}
