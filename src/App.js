import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'

export default function App() {
  return (
    <>
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}
