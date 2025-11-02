import React from 'react'
import { useNavigate } from 'react-router-dom'

const RuralAuth = () => {
  const navigate = useNavigate()
  
  return (
    <div className='min-h-[70vh] flex items-center'>
      <div className='max-w-md m-auto w-full bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4'>
        <p className='text-2xl font-semibold text-center text-green-700'>Rural Healthcare Access</p>
        <p className='text-center text-gray-600'>Choose your role to continue</p>
        
        <div className='bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800'>
          <p className='font-medium mb-1'>For Rural Users & ASHA Workers Only</p>
          <p className='text-xs'>Access health dashboard and rural healthcare services</p>
        </div>

        <button 
          onClick={() => navigate('/login?type=rural')} 
          className='bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-md font-medium transition-colors'
        >
          I am a Rural User
        </button>
        
        <button 
          onClick={() => navigate('/asha-login')} 
          className='border-2 border-green-600 text-green-600 hover:bg-green-50 w-full py-3 rounded-md font-medium transition-colors'
        >
          I am an ASHA Worker
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

export default RuralAuth
