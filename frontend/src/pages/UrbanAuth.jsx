import React from 'react'
import { useNavigate } from 'react-router-dom'

const UrbanAuth = () => {
  const navigate = useNavigate()
  
  return (
    <div className='min-h-[70vh] flex items-center'>
      <div className='max-w-md m-auto w-full bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4'>
        <p className='text-2xl font-semibold text-center text-blue-700'>Urban Healthcare Access</p>
        <p className='text-center text-gray-600'>Choose your role to continue</p>
        
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800'>
          <p className='font-medium mb-1'>For Urban Users & Doctors</p>
          <p className='text-xs'>Book appointments and access healthcare services</p>
        </div>

        <button 
          onClick={() => navigate('/login?type=urban')} 
          className='bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-md font-medium transition-colors'
        >
          I am a User / Patient
        </button>
        
        <button
          onClick={() => navigate('/doctor-auth')}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-medium text-lg flex items-center justify-center gap-3 transition-colors shadow-md'
        >
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
          </svg>
          I am a Doctor
        </button>

        <div className='text-center mt-2'>
          <button 
            onClick={() => navigate('/')} 
            className='text-sm text-gray-600 hover:text-gray-800 underline'
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default UrbanAuth
