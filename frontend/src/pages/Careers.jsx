import React from 'react'
import { assets } from '../assets/assets'

const Careers = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-primary to-blue-600 text-white py-20 px-6 sm:px-10 md:px-14 lg:px-20 rounded-lg my-10'>
        <div className='max-w-5xl mx-auto text-center'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6'>Join Our Team</h1>
          <p className='text-xl sm:text-2xl mb-4'>Build the Future of Healthcare Technology</p>
          <p className='text-base sm:text-lg opacity-90 max-w-3xl mx-auto'>
            We're looking for passionate software developers to help revolutionize healthcare delivery in India
          </p>
        </div>
      </div>

      {/* About ArogyaMitra */}
      <div className='my-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-6 text-center'>About ArogyaMitra</h2>
          <p className='text-gray-600 leading-7 text-center max-w-4xl mx-auto mb-12'>
            ArogyaMitra is a cutting-edge healthcare platform connecting patients with doctors and empowering ASHA workers 
            with digital tools. We're on a mission to make quality healthcare accessible to every corner of India through 
            innovative technology solutions.
          </p>

          <div className='grid md:grid-cols-3 gap-8 mb-16'>
            <div className='text-center p-6 bg-blue-50 rounded-lg'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Innovation</h3>
              <p className='text-gray-600 text-sm'>Work on cutting-edge AI and ML solutions for healthcare</p>
            </div>

            <div className='text-center p-6 bg-blue-50 rounded-lg'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Impact</h3>
              <p className='text-gray-600 text-sm'>Make a real difference in millions of lives across India</p>
            </div>

            <div className='text-center p-6 bg-blue-50 rounded-lg'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Growth</h3>
              <p className='text-gray-600 text-sm'>Rapid career growth in a fast-scaling startup environment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className='bg-gray-50 py-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-8 text-center'>Open Positions</h2>
          
          <div className='space-y-6'>
            {/* Full Stack Developer */}
            <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-primary'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                <div>
                  <h3 className='text-2xl font-semibold text-gray-800 mb-2'>Full Stack Developer</h3>
                  <div className='flex flex-wrap gap-2 mb-3'>
                    <span className='bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-medium'>Full Time</span>
                    <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>Remote</span>
                    <span className='bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium'>2-5 Years</span>
                  </div>
                </div>
              </div>
              <p className='text-gray-600 mb-4 leading-7'>
                Build scalable web applications using React, Node.js, and MongoDB. Work on features that directly impact 
                healthcare delivery to rural communities.
              </p>
              <div className='mb-4'>
                <h4 className='font-semibold text-gray-800 mb-2'>Key Skills:</h4>
                <div className='flex flex-wrap gap-2'>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>React.js</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Node.js</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>MongoDB</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Express.js</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>REST APIs</span>
                </div>
              </div>
            </div>

            {/* Frontend Developer */}
            <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-primary'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                <div>
                  <h3 className='text-2xl font-semibold text-gray-800 mb-2'>Frontend Developer</h3>
                  <div className='flex flex-wrap gap-2 mb-3'>
                    <span className='bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-medium'>Full Time</span>
                    <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>Hybrid</span>
                    <span className='bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium'>1-3 Years</span>
                  </div>
                </div>
              </div>
              <p className='text-gray-600 mb-4 leading-7'>
                Create beautiful, responsive user interfaces for our healthcare platform. Focus on user experience and 
                accessibility for diverse user groups.
              </p>
              <div className='mb-4'>
                <h4 className='font-semibold text-gray-800 mb-2'>Key Skills:</h4>
                <div className='flex flex-wrap gap-2'>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>React.js</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Tailwind CSS</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>JavaScript</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>HTML/CSS</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Responsive Design</span>
                </div>
              </div>
            </div>

            {/* Backend Developer */}
            <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-primary'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                <div>
                  <h3 className='text-2xl font-semibold text-gray-800 mb-2'>Backend Developer</h3>
                  <div className='flex flex-wrap gap-2 mb-3'>
                    <span className='bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-medium'>Full Time</span>
                    <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>Remote</span>
                    <span className='bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium'>2-4 Years</span>
                  </div>
                </div>
              </div>
              <p className='text-gray-600 mb-4 leading-7'>
                Design and implement robust backend systems, APIs, and databases. Ensure security, scalability, and 
                performance of our healthcare platform.
              </p>
              <div className='mb-4'>
                <h4 className='font-semibold text-gray-800 mb-2'>Key Skills:</h4>
                <div className='flex flex-wrap gap-2'>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Node.js</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Express.js</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>MongoDB</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>PostgreSQL</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Microservices</span>
                </div>
              </div>
            </div>

            {/* AI/ML Engineer */}
            <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-primary'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                <div>
                  <h3 className='text-2xl font-semibold text-gray-800 mb-2'>AI/ML Engineer</h3>
                  <div className='flex flex-wrap gap-2 mb-3'>
                    <span className='bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-medium'>Full Time</span>
                    <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>On-site</span>
                    <span className='bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium'>3-6 Years</span>
                  </div>
                </div>
              </div>
              <p className='text-gray-600 mb-4 leading-7'>
                Develop AI-powered features like AIVaidya for symptom analysis and disease prediction. Work with Gemini API 
                and other ML frameworks.
              </p>
              <div className='mb-4'>
                <h4 className='font-semibold text-gray-800 mb-2'>Key Skills:</h4>
                <div className='flex flex-wrap gap-2'>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Python</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>TensorFlow</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Gemini API</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>NLP</span>
                  <span className='bg-gray-100 px-3 py-1 rounded text-sm'>Computer Vision</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className='my-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-8 text-center'>Why Join ArogyaMitra?</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='flex gap-4'>
              <div className='flex-shrink-0'>
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center'>
                  <svg className='w-6 h-6 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>Competitive Salary</h3>
                <p className='text-gray-600'>Industry-leading compensation packages with performance bonuses and stock options</p>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='flex-shrink-0'>
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center'>
                  <svg className='w-6 h-6 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>Learning & Development</h3>
                <p className='text-gray-600'>Access to courses, conferences, and certifications to enhance your skills</p>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='flex-shrink-0'>
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center'>
                  <svg className='w-6 h-6 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>Work-Life Balance</h3>
                <p className='text-gray-600'>Flexible working hours, remote options, and generous leave policies</p>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='flex-shrink-0'>
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center'>
                  <svg className='w-6 h-6 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>Health Benefits</h3>
                <p className='text-gray-600'>Comprehensive health insurance for you and your family</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Section */}
      <div className='bg-gradient-to-r from-primary to-blue-600 text-white py-16 px-6 sm:px-10 md:px-14 lg:px-20 rounded-lg my-10'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-6'>Ready to Make an Impact?</h2>
          <p className='text-lg mb-8 opacity-90'>
            Send us your resume and tell us why you'd be a great fit for ArogyaMitra
          </p>
          
          <div className='bg-white/10 backdrop-blur-sm p-8 rounded-lg mb-6'>
            <h3 className='text-2xl font-semibold mb-4'>How to Apply</h3>
            <div className='text-left max-w-2xl mx-auto space-y-4'>
              <div className='flex items-start gap-3'>
                <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <span className='font-bold'>1</span>
                </div>
                <p className='text-base'>Prepare your updated resume (PDF format preferred)</p>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <span className='font-bold'>2</span>
                </div>
                <p className='text-base'>Write a brief cover letter explaining your interest and relevant experience</p>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <span className='font-bold'>3</span>
                </div>
                <p className='text-base'>Include links to your GitHub, portfolio, or any relevant projects</p>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                  <span className='font-bold'>4</span>
                </div>
                <p className='text-base'>Mention the position you're applying for in the subject line</p>
              </div>
            </div>
          </div>

          <div className='bg-white text-gray-800 p-6 rounded-lg inline-block'>
            <p className='text-sm text-gray-600 mb-2'>Send your application to:</p>
            <a href='mailto:careers@arogyamitra.com' className='text-2xl font-bold text-primary hover:text-blue-700 transition-colors flex items-center justify-center gap-2'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
              careers@arogyamitra.com
            </a>
          </div>

          <p className='text-sm mt-6 opacity-75'>
            We review all applications carefully and will get back to you within 2 weeks
          </p>
        </div>
      </div>

      {/* Company Culture */}
      <div className='my-16 px-6 sm:px-10 md:px-14 lg:px-20'>
        <div className='max-w-6xl mx-auto text-center'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-6'>Our Values</h2>
          <div className='grid md:grid-cols-4 gap-6'>
            <div className='p-6'>
              <div className='text-4xl mb-3'>🚀</div>
              <h3 className='font-semibold text-gray-800 mb-2'>Innovation First</h3>
              <p className='text-sm text-gray-600'>We embrace new technologies and creative solutions</p>
            </div>
            <div className='p-6'>
              <div className='text-4xl mb-3'>🤝</div>
              <h3 className='font-semibold text-gray-800 mb-2'>Collaboration</h3>
              <p className='text-sm text-gray-600'>We believe in teamwork and knowledge sharing</p>
            </div>
            <div className='p-6'>
              <div className='text-4xl mb-3'>💡</div>
              <h3 className='font-semibold text-gray-800 mb-2'>Continuous Learning</h3>
              <p className='text-sm text-gray-600'>We invest in growth and skill development</p>
            </div>
            <div className='p-6'>
              <div className='text-4xl mb-3'>🎯</div>
              <h3 className='font-semibold text-gray-800 mb-2'>Impact Driven</h3>
              <p className='text-sm text-gray-600'>We measure success by the lives we improve</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Careers
