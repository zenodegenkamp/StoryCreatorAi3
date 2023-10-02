"use client"

import Form from '../../sections/Form';
import Output from '../../sections/Output'
import Navbar from '../../components/Navbar';

import React, { useState } from 'react';

export default function Page() {
    const [feedbackData, setFeedbackData] = useState({
        mainCharacter: "",
        plot: "",
    })
    const [aiWaitingResponse, setAiWaitingReponse] = useState('')

    return (
        <div className="bg-primary-black overflow-hidden">
            <Navbar />
            <div className="relative">
                <div className="gradient-04 z-0" />
                <Form setFeedbackData={setFeedbackData} aiWaitingResponse={aiWaitingResponse} />
                <Output FeedbackData={feedbackData} setAiWaitingReponse={setAiWaitingReponse} />
            </div>
        </div>
    );
};

