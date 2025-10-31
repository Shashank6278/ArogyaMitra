import React from 'react'
import { useNavigate } from 'react-router-dom'

const CommunityMobilization = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-br from-primary via-blue-600 to-indigo-700 text-white py-20 px-6 sm:px-10 md:px-14 lg:px-20 rounded-lg my-10 overflow-hidden'>
        <div className='absolute inset-0 bg-black/10'></div>
        <div className='relative max-w-5xl mx-auto text-center z-10'>
          <div className='w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6'>
            <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' />
            </svg>
          </div>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6'>Community Mobilization</h1>
          <p className='text-xl sm:text-2xl mb-4 opacity-90'>Building Healthier Communities Together</p>
          <p className='text-base sm:text-lg opacity-80 max-w-3xl mx-auto'>
            Empowering communities through awareness, education, and collective action for better health outcomes
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className='my-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-semibold text-gray-800 mb-6'>What is Community Mobilization?</h2>
              <p className='text-gray-600 leading-7 mb-4'>
                Community mobilization is the cornerstone of ASHA workers' responsibilities. It involves engaging with community members, creating awareness about health issues, and motivating them to take collective action for better health outcomes.
              </p>
              <p className='text-gray-600 leading-7 mb-4'>
                ASHA workers act as catalysts for change, bridging the gap between healthcare systems and rural communities. They organize meetings, conduct awareness campaigns, and facilitate community participation in health planning.
              </p>
              <p className='text-gray-600 leading-7'>
                Through effective mobilization, ASHA workers help communities identify their health needs, prioritize interventions, and work together towards sustainable health improvements.
              </p>
            </div>
            <div className='bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl'>
              <h3 className='text-2xl font-semibold text-gray-800 mb-6'>Key Impact Areas</h3>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800'>Health Awareness</h4>
                    <p className='text-sm text-gray-600'>Educating communities about diseases, prevention, and healthy practices</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800'>Community Participation</h4>
                    <p className='text-sm text-gray-600'>Encouraging active involvement in health programs and initiatives</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800'>Behavioral Change</h4>
                    <p className='text-sm text-gray-600'>Promoting adoption of healthy behaviors and lifestyle modifications</p>
                  </div>
                </div>
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
            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow'>
              <div className='w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center mb-4'>
                <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>Health Campaigns</h3>
              <p className='text-gray-600 text-sm leading-6'>
                Organizing and conducting health awareness campaigns on topics like sanitation, nutrition, immunization, and disease prevention in villages and communities.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow'>
              <div className='w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center mb-4'>
                <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>Community Meetings</h3>
              <p className='text-gray-600 text-sm leading-6'>
                Facilitating regular village health meetings to discuss health issues, share information, and plan community-level health interventions and activities.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow'>
              <div className='w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center mb-4'>
                <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>IEC Activities</h3>
              <p className='text-gray-600 text-sm leading-6'>
                Implementing Information, Education, and Communication activities using posters, pamphlets, street plays, and other creative methods to spread health messages.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow'>
              <div className='w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center mb-4'>
                <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>Social Determinants</h3>
              <p className='text-gray-600 text-sm leading-6'>
                Addressing social determinants of health like water supply, sanitation, housing, and education that impact community health and wellbeing.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow'>
              <div className='w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center mb-4'>
                <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>Health Planning</h3>
              <p className='text-gray-600 text-sm leading-6'>
                Involving community members in identifying local health priorities, planning interventions, and monitoring progress towards health goals.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow'>
              <div className='w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center mb-4'>
                <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>Capacity Building</h3>
              <p className='text-gray-600 text-sm leading-6'>
                Training community volunteers, forming health committees, and building local capacity for sustained health improvements and self-reliance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className='my-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-12 text-center'>Success Stories</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center'>
                  <span className='text-white font-bold text-xl'>1</span>
                </div>
                <h3 className='text-xl font-semibold text-gray-800'>Sanitation Drive Success</h3>
              </div>
              <p className='text-gray-600 leading-7 mb-4'>
                In a village in Uttar Pradesh, ASHA worker Sunita mobilized the community to construct household toilets. Through persistent awareness campaigns and community meetings, she achieved 100% toilet coverage in her village within 18 months.
              </p>
              <div className='flex items-center gap-2 text-primary font-semibold'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                </svg>
                <span>100% Toilet Coverage Achieved</span>
              </div>
            </div>

            <div className='bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 bg-green-600 rounded-full flex items-center justify-center'>
                  <span className='text-white font-bold text-xl'>2</span>
                </div>
                <h3 className='text-xl font-semibold text-gray-800'>Immunization Campaign</h3>
              </div>
              <p className='text-gray-600 leading-7 mb-4'>
                ASHA worker Lakshmi organized door-to-door campaigns and community meetings to address vaccine hesitancy. Her efforts resulted in 95% immunization coverage in her village, preventing several disease outbreaks.
              </p>
              <div className='flex items-center gap-2 text-green-600 font-semibold'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                </svg>
                <span>95% Immunization Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Tools Section */}
      <div className='bg-gradient-to-r from-primary to-blue-600 text-white py-16 px-6 sm:px-10 md:px-14 lg:px-20 rounded-lg my-10'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-semibold mb-8 text-center'>Digital Tools for Mobilization</h2>
          <p className='text-center text-lg mb-12 opacity-90 max-w-3xl mx-auto'>
            ArogyaMitra platform provides ASHA workers with modern digital tools to enhance community mobilization efforts
          </p>
          <div className='grid md:grid-cols-3 gap-6'>
            <div className='bg-white/10 backdrop-blur-sm p-6 rounded-xl'>
              <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-2'>SMS Alerts</h3>
              <p className='text-sm opacity-90'>Send bulk SMS to community members about health camps, meetings, and important health information</p>
            </div>

            <div className='bg-white/10 backdrop-blur-sm p-6 rounded-xl'>
              <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-2'>Activity Tracking</h3>
              <p className='text-sm opacity-90'>Track and report community mobilization activities, attendance, and outcomes digitally</p>
            </div>

            <div className='bg-white/10 backdrop-blur-sm p-6 rounded-xl'>
              <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-2'>Resource Library</h3>
              <p className='text-sm opacity-90'>Access digital IEC materials, videos, and resources for effective health communication</p>
            </div>
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

export default CommunityMobilization
