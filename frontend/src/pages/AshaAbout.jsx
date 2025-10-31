import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const AshaAbout = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero Section */}
      <div className='bg-primary text-white py-16 px-6 sm:px-10 md:px-14 lg:px-20 rounded-lg my-10'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl sm:text-5xl font-bold mb-4'>ASHA Workers</h1>
          <p className='text-lg sm:text-xl'>Accredited Social Health Activists</p>
          <p className='text-sm sm:text-base mt-2 opacity-90'>Connecting Communities to Healthcare</p>
        </div>
      </div>

      {/* About ASHA Section */}
      <div className='my-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-6'>What is ASHA?</h2>
          <div className='grid md:grid-cols-2 gap-8 items-center'>
            <div>
              <p className='text-gray-600 leading-7 mb-4'>
                ASHA (Accredited Social Health Activist) is a community health worker instituted by the Government of India's Ministry of Health and Family Welfare as part of the National Rural Health Mission (NRHM) in 2005.
              </p>
              <p className='text-gray-600 leading-7 mb-4'>
                ASHA workers are trained female community health activists selected from the village itself and accountable to it. They act as a bridge between the community and the public health system.
              </p>
              <p className='text-gray-600 leading-7'>
                Selected from the community and trained to work in their own villages, ASHA workers are the first point of contact for any health-related demands of deprived sections of the population, especially women and children.
              </p>
            </div>
            <div className='bg-blue-50 p-8 rounded-lg'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4'>Key Statistics</h3>
              <ul className='space-y-3'>
                <li className='flex items-start'>
                  <span className='text-primary font-bold text-2xl mr-3'>10L+</span>
                  <span className='text-gray-600 pt-1'>ASHA workers across India</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-primary font-bold text-2xl mr-3'>1:1000</span>
                  <span className='text-gray-600 pt-1'>Ratio of ASHA to population</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-primary font-bold text-2xl mr-3'>23</span>
                  <span className='text-gray-600 pt-1'>Days of training provided</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Roles and Responsibilities */}
      <div className='bg-gray-50 py-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-8 text-center'>Roles & Responsibilities</h2>
          <div className='grid md:grid-cols-3 gap-6'>
            <div 
              onClick={() => { navigate('/asha-role/community-mobilization'); scrollTo(0, 0) }}
              className='bg-white p-6 rounded-lg shadow-sm hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-primary/10 group-hover:bg-white/20 rounded-full flex items-center justify-center mb-4 transition-colors'>
                <svg className='w-6 h-6 text-primary group-hover:text-white transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 group-hover:text-white mb-3 transition-colors'>Community Mobilization</h3>
              <p className='text-gray-600 group-hover:text-white/90 text-sm leading-6 transition-colors'>
                Creating awareness on health and its social determinants, mobilizing the community towards local health planning, and increasing utilization of health services.
              </p>
            </div>

            <div 
              onClick={() => { navigate('/asha-role/health-services'); scrollTo(0, 0) }}
              className='bg-white p-6 rounded-lg shadow-sm hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-primary/10 group-hover:bg-white/20 rounded-full flex items-center justify-center mb-4 transition-colors'>
                <svg className='w-6 h-6 text-primary group-hover:text-white transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 group-hover:text-white mb-3 transition-colors'>Health Services</h3>
              <p className='text-gray-600 group-hover:text-white/90 text-sm leading-6 transition-colors'>
                Providing basic healthcare services including first aid, treatment for minor ailments, distribution of medicines, and facilitating immunization programs.
              </p>
            </div>

            <div 
              onClick={() => { navigate('/asha-role/emergency-response'); scrollTo(0, 0) }}
              className='bg-white p-6 rounded-lg shadow-sm hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-primary/10 group-hover:bg-white/20 rounded-full flex items-center justify-center mb-4 transition-colors'>
                <svg className='w-6 h-6 text-primary group-hover:text-white transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 group-hover:text-white mb-3 transition-colors'>Emergency Response</h3>
              <p className='text-gray-600 group-hover:text-white/90 text-sm leading-6 transition-colors'>
                Acting as a link between the community and health facilities, facilitating emergency referrals, and ensuring timely access to healthcare services.
              </p>
            </div>

            <div 
              onClick={() => { navigate('/asha-role/maternal-child-health'); scrollTo(0, 0) }}
              className='bg-white p-6 rounded-lg shadow-sm hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-primary/10 group-hover:bg-white/20 rounded-full flex items-center justify-center mb-4 transition-colors'>
                <svg className='w-6 h-6 text-primary group-hover:text-white transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 group-hover:text-white mb-3 transition-colors'>Maternal & Child Health</h3>
              <p className='text-gray-600 group-hover:text-white/90 text-sm leading-6 transition-colors'>
                Counseling women on pregnancy, childbirth, breastfeeding, complementary feeding, and immunization. Accompanying pregnant women to health facilities for delivery.
              </p>
            </div>

            <div 
              onClick={() => { navigate('/asha-role/health-records'); scrollTo(0, 0) }}
              className='bg-white p-6 rounded-lg shadow-sm hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-primary/10 group-hover:bg-white/20 rounded-full flex items-center justify-center mb-4 transition-colors'>
                <svg className='w-6 h-6 text-primary group-hover:text-white transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 group-hover:text-white mb-3 transition-colors'>Health Records</h3>
              <p className='text-gray-600 group-hover:text-white/90 text-sm leading-6 transition-colors'>
                Maintaining village health registers, tracking births, deaths, diseases, and maintaining records of all health-related activities in the village.
              </p>
            </div>

            <div 
              onClick={() => { navigate('/asha-role/medicine-distribution'); scrollTo(0, 0) }}
              className='bg-white p-6 rounded-lg shadow-sm hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer group'
            >
              <div className='w-12 h-12 bg-primary/10 group-hover:bg-white/20 rounded-full flex items-center justify-center mb-4 transition-colors'>
                <svg className='w-6 h-6 text-primary group-hover:text-white transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 group-hover:text-white mb-3 transition-colors'>Medicine Distribution</h3>
              <p className='text-gray-600 group-hover:text-white/90 text-sm leading-6 transition-colors'>
                Distributing essential medicines, contraceptives, ORS packets, iron and folic acid tablets, and other health commodities as per guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why ASHA Workers Matter */}
      <div className='my-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-8 text-center'>Why ASHA Workers Matter</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg'>
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Bridging the Gap</h3>
              <p className='text-gray-600 leading-7 mb-4'>
                ASHA workers serve as the crucial link between rural communities and the formal healthcare system. They understand local languages, customs, and challenges, making healthcare more accessible and culturally appropriate.
              </p>
              <p className='text-gray-600 leading-7'>
                Their presence in villages ensures that even the most remote and underserved populations have access to basic health information and services.
              </p>
            </div>

            <div className='bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg'>
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Empowering Communities</h3>
              <p className='text-gray-600 leading-7 mb-4'>
                Beyond providing health services, ASHA workers empower communities through health education, promoting preventive healthcare practices, and encouraging community participation in health planning.
              </p>
              <p className='text-gray-600 leading-7'>
                They play a vital role in reducing maternal and infant mortality rates, improving immunization coverage, and controlling communicable diseases.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className='bg-primary text-white py-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-semibold mb-8 text-center'>Impact & Achievements</h2>
          <div className='grid md:grid-cols-4 gap-6 text-center'>
            <div className='bg-white/10 backdrop-blur-sm p-6 rounded-lg'>
              <p className='text-4xl font-bold mb-2'>85%</p>
              <p className='text-sm opacity-90'>Institutional Deliveries</p>
            </div>
            <div className='bg-white/10 backdrop-blur-sm p-6 rounded-lg'>
              <p className='text-4xl font-bold mb-2'>90%</p>
              <p className='text-sm opacity-90'>Immunization Coverage</p>
            </div>
            <div className='bg-white/10 backdrop-blur-sm p-6 rounded-lg'>
              <p className='text-4xl font-bold mb-2'>70%</p>
              <p className='text-sm opacity-90'>Antenatal Care Visits</p>
            </div>
            <div className='bg-white/10 backdrop-blur-sm p-6 rounded-lg'>
              <p className='text-4xl font-bold mb-2'>60%</p>
              <p className='text-sm opacity-90'>Disease Prevention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Transformation Section */}
      <div className='my-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-6 text-center'>Digital Transformation</h2>
          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg'>
            <p className='text-gray-600 leading-7 mb-4 text-center max-w-3xl mx-auto'>
              Our platform empowers ASHA workers with digital tools to efficiently manage patient records, track health metrics, schedule appointments, and coordinate with healthcare facilities. This digital transformation enhances their ability to serve communities more effectively.
            </p>
            <div className='grid md:grid-cols-3 gap-6 mt-8'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3'>
                  <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' />
                  </svg>
                </div>
                <h4 className='font-semibold text-gray-800 mb-2'>Mobile Access</h4>
                <p className='text-sm text-gray-600'>Access patient data and health records on-the-go</p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3'>
                  <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                  </svg>
                </div>
                <h4 className='font-semibold text-gray-800 mb-2'>Real-time Tracking</h4>
                <p className='text-sm text-gray-600'>Monitor health metrics and track patient progress</p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3'>
                  <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                  </svg>
                </div>
                <h4 className='font-semibold text-gray-800 mb-2'>Smart Scheduling</h4>
                <p className='text-sm text-gray-600'>Coordinate appointments and follow-ups efficiently</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className='bg-gray-50 py-12 px-6 sm:px-10 md:px-14 lg:px-20 text-center'>
        <div className='max-w-3xl mx-auto'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-4'>Supporting ASHA Workers</h2>
          <p className='text-gray-600 leading-7 mb-6'>
            ASHA workers are the backbone of India's rural healthcare system. By supporting them with better tools, training, and recognition, we can strengthen healthcare delivery to millions of people across the country.
          </p>
          <p className='text-sm text-gray-500 italic'>
            Source: National Health Mission, Ministry of Health and Family Welfare, Government of India
          </p>
        </div>
      </div>
    </div>
  )
}

export default AshaAbout
