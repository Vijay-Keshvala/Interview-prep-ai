import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Home/Dashboard'
import InterviewPrep from './pages/InterviewPrep/InterviewPrep'
import UserProvider from './context/userContext'
import MockInterviewPage from './pages/mock-interview'
import MockInterviewForm from './pages/mock-interview/MockInterviewForm'
import Summary from '../src/pages/mock-interview/Summary'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <UserProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <Router>
          <Routes>
            {/* Default Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
            {/* <Route path='/mock-interview1' element={<MockInterview />} /> */}
            <Route path='/mock-interview' element={<MockInterviewPage />} />
            <Route path='/summary' element={<Summary />} />

          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px"
            }
          }}
        />
      </div>
    </UserProvider>
  )
}

export default App