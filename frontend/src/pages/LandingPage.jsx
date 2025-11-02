import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Users, Phone, Compass } from 'lucide-react'
import { LanguageContext } from '../context/LanguageContext'

const LandingPage = () => {
  const navigate = useNavigate()
  const { t } = useContext(LanguageContext)

  const options = [
    {
      titleKey: 'landing.rural',
      descKey: 'landing.rural.desc',
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700',
      path: '/rural-auth'
    },
    {
      titleKey: 'landing.urban',
      descKey: 'landing.urban.desc',
      icon: Heart,
      color: 'from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700',
      path: '/urban-auth'
    },
    {
      titleKey: 'landing.helpline',
      descKey: 'landing.helpline.desc',
      icon: Phone,
      color: 'from-red-500 to-rose-600',
      hoverColor: 'hover:from-red-600 hover:to-rose-700',
      path: '/helpline'
    },
    {
      titleKey: 'landing.explore',
      descKey: 'landing.explore.desc',
      icon: Compass,
      color: 'from-purple-500 to-violet-600',
      hoverColor: 'hover:from-purple-600 hover:to-violet-700',
      path: '/home'
    }
  ]

  return (
    <div className='min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4'>
      <div className='max-w-6xl w-full'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            {t('landing.title')}
          </h1>
          <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
            {t('landing.subtitle')}
          </p>
        </div>

        {/* Options Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
          {options.map((option, index) => {
            const Icon = option.icon
            return (
              <div
                key={index}
                onClick={() => navigate(option.path)}
                className={`group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden`}
              >
                <div className={`bg-gradient-to-br ${option.color} ${option.hoverColor} p-8 transition-all duration-300`}>
                  <div className='flex items-center justify-center mb-4'>
                    <div className='bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4'>
                      <Icon className='w-12 h-12 text-white' strokeWidth={2} />
                    </div>
                  </div>
                  <h2 className='text-2xl font-bold text-white text-center mb-2'>
                    {t(option.titleKey)}
                  </h2>
                  <p className='text-white text-opacity-90 text-center text-sm'>
                    {t(option.descKey)}
                  </p>
                </div>
                <div className='p-6 bg-white'>
                  <button className='w-full bg-gray-100 group-hover:bg-primary group-hover:text-white text-gray-700 font-semibold py-3 rounded-lg transition-all duration-300'>
                    {t('landing.getstarted')} →
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Info */}
        <div className='mt-12 text-center'>
          <p className='text-gray-600 text-sm'>
            Empowering communities with accessible healthcare solutions
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
