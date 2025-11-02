import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Shield, Flame, Ambulance, Heart, Users, AlertTriangle, Home } from 'lucide-react'

const Helpline = () => {
  const navigate = useNavigate()

  const emergencyNumbers = [
    {
      name: 'Police',
      number: '100',
      icon: Shield,
      color: 'bg-blue-500',
      description: 'For law enforcement emergencies'
    },
    {
      name: 'Fire Department',
      number: '101',
      icon: Flame,
      color: 'bg-red-500',
      description: 'For fire emergencies'
    },
    {
      name: 'Ambulance',
      number: '102',
      icon: Ambulance,
      color: 'bg-green-500',
      description: 'For medical emergencies'
    },
    {
      name: 'National Emergency',
      number: '112',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      description: 'Single emergency number for all services'
    },
    {
      name: 'Women Helpline',
      number: '1091',
      icon: Users,
      color: 'bg-pink-500',
      description: 'For women in distress'
    },
    {
      name: 'Child Helpline',
      number: '1098',
      icon: Heart,
      color: 'bg-purple-500',
      description: 'For child protection and welfare'
    },
    {
      name: 'Senior Citizen Helpline',
      number: '14567',
      icon: Home,
      color: 'bg-indigo-500',
      description: 'For senior citizens in need'
    },
    {
      name: 'Mental Health Helpline',
      number: '08046110007',
      icon: Heart,
      color: 'bg-teal-500',
      description: 'For mental health support (NIMHANS)'
    }
  ]

  const healthHelplines = [
    {
      name: 'National Health Helpline',
      number: '1800-180-1104',
      description: 'General health queries and information'
    },
    {
      name: 'COVID-19 Helpline',
      number: '1075',
      description: 'COVID-19 related queries and support'
    },
    {
      name: 'Ayushman Bharat',
      number: '14555',
      description: 'Health insurance scheme queries'
    },
    {
      name: 'National Tobacco Quitline',
      number: '1800-11-2356',
      description: 'Support for tobacco cessation'
    }
  ]

  return (
    <div className='min-h-[80vh] py-8 px-4'>
      <div className='max-w-6xl m-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-3'>
            Emergency Helpline Numbers
          </h1>
          <p className='text-gray-600 mb-4'>
            Quick access to emergency services - Save these numbers
          </p>
          <button 
            onClick={() => navigate('/')} 
            className='text-primary hover:underline font-medium'
          >
            ← Back to Home
          </button>
        </div>

        {/* Emergency Numbers Grid */}
        <div className='mb-12'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
            <AlertTriangle className='text-red-500' />
            Emergency Services
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {emergencyNumbers.map((service, index) => {
              const Icon = service.icon
              return (
                <div 
                  key={index}
                  className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'
                >
                  <div className={`${service.color} p-4 flex items-center gap-3`}>
                    <div className='bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2'>
                      <Icon className='w-6 h-6 text-white' />
                    </div>
                    <h3 className='text-white font-bold text-lg'>{service.name}</h3>
                  </div>
                  <div className='p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Phone className='w-5 h-5 text-gray-600' />
                      <a 
                        href={`tel:${service.number}`}
                        className='text-2xl font-bold text-gray-800 hover:text-primary'
                      >
                        {service.number}
                      </a>
                    </div>
                    <p className='text-sm text-gray-600'>{service.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Health Helplines */}
        <div>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
            <Heart className='text-green-500' />
            Health Helplines
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {healthHelplines.map((helpline, index) => (
              <div 
                key={index}
                className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5'
              >
                <h3 className='font-bold text-lg text-gray-800 mb-2'>{helpline.name}</h3>
                <div className='flex items-center gap-2 mb-2'>
                  <Phone className='w-4 h-4 text-green-600' />
                  <a 
                    href={`tel:${helpline.number}`}
                    className='text-xl font-semibold text-green-600 hover:text-green-700'
                  >
                    {helpline.number}
                  </a>
                </div>
                <p className='text-sm text-gray-600'>{helpline.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className='mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded'>
          <p className='text-yellow-800 font-medium'>
            <strong>Important:</strong> In case of emergency, dial 112 for immediate assistance. 
            This single number connects you to police, fire, and medical services.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Helpline
