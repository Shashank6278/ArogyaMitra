import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { roleDataConfig } from './roleDataConfig'

const AshaRoleDetail = () => {
  const { roleId } = useParams()
  const navigate = useNavigate()
  const role = roleDataConfig[roleId]

  if (!role) {
    return <div>Role not found</div>
  }

  return (
    <div>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-br from-primary via-blue-600 to-indigo-700 text-white py-20 px-6 sm:px-10 md:px-14 lg:px-20 rounded-lg my-10 overflow-hidden'>
        <div className='absolute inset-0 bg-black/10'></div>
        <div className='relative max-w-5xl mx-auto text-center z-10'>
          <div className='w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6'>
            <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={role.icon} />
            </svg>
          </div>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6'>{role.title}</h1>
          <p className='text-xl sm:text-2xl mb-4 opacity-90'>{role.subtitle}</p>
          <p className='text-base sm:text-lg opacity-80 max-w-3xl mx-auto'>{role.description}</p>
        </div>
      </div>

      {/* Overview Section */}
      <div className='my-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-semibold text-gray-800 mb-6'>Overview</h2>
              <p className='text-gray-600 leading-7 mb-4'>{role.overview.main}</p>
            </div>
            <div className='bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl'>
              <h3 className='text-2xl font-semibold text-gray-800 mb-6'>Key Impact Areas</h3>
              <div className='space-y-4'>
                {role.overview.points.map((point, idx) => (
                  <div key={idx} className='flex items-start gap-3'>
                    <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0'>
                      <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                      </svg>
                    </div>
                    <div>
                      <h4 className='font-semibold text-gray-800'>{point.title}</h4>
                      <p className='text-sm text-gray-600'>{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Activities */}
      <div className='bg-gray-50 py-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-12 text-center'>Core Activities</h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {role.activities.map((activity, idx) => (
              <div key={idx} className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow'>
                <div className='w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center mb-4'>
                  <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={activity.icon} />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold text-gray-800 mb-3'>{activity.title}</h3>
                <p className='text-gray-600 text-sm leading-6'>{activity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className='my-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-12 text-center'>Success Stories</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            {role.stories.map((story, idx) => (
              <div key={idx} className={`bg-gradient-to-br from-${story.color}-50 to-${story.color}-100 p-8 rounded-2xl`}>
                <div className='flex items-center gap-3 mb-4'>
                  <div className={`w-12 h-12 bg-${story.color}-600 rounded-full flex items-center justify-center`}>
                    <span className='text-white font-bold text-xl'>{idx + 1}</span>
                  </div>
                  <h3 className='text-xl font-semibold text-gray-800'>{story.title}</h3>
                </div>
                <p className='text-gray-600 leading-7 mb-4'>{story.desc}</p>
                <div className={`flex items-center gap-2 text-${story.color}-600 font-semibold`}>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                  </svg>
                  <span>{story.achievement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className='text-center my-12'>
        <button 
          onClick={() => { navigate('/asha-about'); scrollTo(0, 0) }}
          className='bg-primary text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors inline-flex items-center gap-2'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
          </svg>
          Back to ASHA Roles
        </button>
      </div>
    </div>
  )
}

export default AshaRoleDetail
