import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Building2, TrendingUp, BarChart3 } from 'lucide-react'

const Statistics = () => {
  const navigate = useNavigate()

  const options = [
    {
      title: 'Rural Healthcare Statistics',
      description: 'View rural users, ASHA workers, and their ratios',
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      path: '/statistics/rural',
      stats: ['Rural Users Count', 'ASHA Workers Count', 'User-to-ASHA Ratio', 'Village Coverage']
    },
    {
      title: 'Urban Healthcare Statistics',
      description: 'View doctors, specializations, and appointment metrics',
      icon: Building2,
      color: 'from-blue-500 to-indigo-600',
      path: '/statistics/urban',
      stats: ['Total Doctors', 'Specializations', 'Appointments Booked', 'Daily Average']
    }
  ]

  return (
    <div className='min-h-[80vh] py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='flex items-center justify-center mb-4'>
            <TrendingUp className='w-12 h-12 text-primary' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            Healthcare Statistics
          </h1>
          <p className='text-lg text-gray-600'>
            Comprehensive data insights and analytics
          </p>
        </div>

        {/* Options */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {options.map((option, index) => {
            const Icon = option.icon
            return (
              <div
                key={index}
                onClick={() => navigate(option.path)}
                className='group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden'
              >
                <div className={`bg-gradient-to-br ${option.color} p-8`}>
                  <div className='flex items-center justify-center mb-4'>
                    <div className='bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4'>
                      <Icon className='w-12 h-12 text-white' strokeWidth={2} />
                    </div>
                  </div>
                  <h2 className='text-2xl font-bold text-white text-center mb-2'>
                    {option.title}
                  </h2>
                  <p className='text-white text-opacity-90 text-center text-sm'>
                    {option.description}
                  </p>
                </div>
                
                <div className='p-6'>
                  <div className='mb-4'>
                    <p className='text-sm font-semibold text-gray-700 mb-3'>Available Metrics:</p>
                    <div className='space-y-2'>
                      {option.stats.map((stat, i) => (
                        <div key={i} className='flex items-center text-sm text-gray-600'>
                          <BarChart3 className='w-4 h-4 text-primary mr-2' />
                          {stat}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className='w-full bg-gray-100 group-hover:bg-primary group-hover:text-white text-gray-700 font-semibold py-3 rounded-lg transition-all duration-300'>
                    View Statistics →
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Info Banner */}
        <div className='mt-12 bg-white rounded-xl shadow-md p-6 border-l-4 border-primary'>
          <div className='flex items-start gap-4'>
            <TrendingUp className='w-6 h-6 text-primary flex-shrink-0 mt-1' />
            <div>
              <h3 className='font-semibold text-gray-800 mb-2'>Real-time Data Analytics</h3>
              <p className='text-gray-600 text-sm'>
                All statistics are updated in real-time and reflect the current state of the healthcare system. 
                Data includes user registrations, doctor availability, appointment trends, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
