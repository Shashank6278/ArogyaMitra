import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { Users, UserCheck, TrendingUp, MapPin } from 'lucide-react'

const RuralStatistics = () => {
  const { backendUrl } = useContext(AppContext)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      const [usersRes, ashaRes] = await Promise.all([
        axios.get(backendUrl + '/api/user/rural-count'),
        axios.get(backendUrl + '/api/asha/count')
      ])

      const ruralUsers = usersRes.data.count || 0
      const ashaWorkers = ashaRes.data.count || 0
      const ratio = ashaWorkers > 0 ? (ruralUsers / ashaWorkers).toFixed(2) : 0

      setStats({
        ruralUsers,
        ashaWorkers,
        ratio,
        villages: ashaRes.data.villages || 0
      })
    } catch (error) {
      console.error('Error fetching statistics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading statistics...</div>
  }

  const statCards = [
    {
      title: 'Total Rural Users',
      value: stats?.ruralUsers || 0,
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      description: 'Registered rural healthcare users'
    },
    {
      title: 'ASHA Workers',
      value: stats?.ashaWorkers || 0,
      icon: UserCheck,
      color: 'from-blue-500 to-indigo-600',
      description: 'Active ASHA healthcare workers'
    },
    {
      title: 'User-to-ASHA Ratio',
      value: `${stats?.ratio || 0}:1`,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600',
      description: 'Average users per ASHA worker'
    },
    {
      title: 'Villages Covered',
      value: stats?.villages || 0,
      icon: MapPin,
      color: 'from-orange-500 to-red-600',
      description: 'Total villages with coverage'
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            Rural Healthcare Statistics
          </h1>
          <p className='text-lg text-gray-600'>
            Comprehensive overview of rural healthcare system
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
          {statCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div key={index} className='bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300'>
                <div className={`bg-gradient-to-br ${card.color} p-6`}>
                  <div className='flex items-center justify-between mb-4'>
                    <Icon className='w-10 h-10 text-white' strokeWidth={2} />
                  </div>
                  <h3 className='text-white text-opacity-90 text-sm font-medium mb-2'>
                    {card.title}
                  </h3>
                  <p className='text-4xl font-bold text-white'>
                    {card.value}
                  </p>
                </div>
                <div className='p-4 bg-gray-50'>
                  <p className='text-sm text-gray-600'>{card.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Detailed Analysis */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Coverage Analysis */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Coverage Analysis</h2>
            <div className='space-y-4'>
              <div className='flex justify-between items-center p-4 bg-green-50 rounded-lg'>
                <span className='font-medium text-gray-700'>Rural User Registration Rate</span>
                <span className='text-2xl font-bold text-green-600'>
                  {stats?.ruralUsers > 0 ? '100%' : '0%'}
                </span>
              </div>
              <div className='flex justify-between items-center p-4 bg-blue-50 rounded-lg'>
                <span className='font-medium text-gray-700'>ASHA Worker Coverage</span>
                <span className='text-2xl font-bold text-blue-600'>
                  {stats?.ashaWorkers > 0 ? '100%' : '0%'}
                </span>
              </div>
              <div className='flex justify-between items-center p-4 bg-purple-50 rounded-lg'>
                <span className='font-medium text-gray-700'>Average Load per ASHA</span>
                <span className='text-2xl font-bold text-purple-600'>
                  {stats?.ratio || 0} users
                </span>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Key Insights</h2>
            <div className='space-y-4'>
              <div className='border-l-4 border-green-500 pl-4 py-2'>
                <h3 className='font-semibold text-gray-800 mb-1'>System Growth</h3>
                <p className='text-sm text-gray-600'>
                  {stats?.ruralUsers || 0} rural users have registered for healthcare services
                </p>
              </div>
              <div className='border-l-4 border-blue-500 pl-4 py-2'>
                <h3 className='font-semibold text-gray-800 mb-1'>ASHA Network</h3>
                <p className='text-sm text-gray-600'>
                  {stats?.ashaWorkers || 0} ASHA workers are actively serving communities
                </p>
              </div>
              <div className='border-l-4 border-purple-500 pl-4 py-2'>
                <h3 className='font-semibold text-gray-800 mb-1'>Workload Distribution</h3>
                <p className='text-sm text-gray-600'>
                  Each ASHA worker manages approximately {stats?.ratio || 0} rural users
                </p>
              </div>
              <div className='border-l-4 border-orange-500 pl-4 py-2'>
                <h3 className='font-semibold text-gray-800 mb-1'>Geographic Reach</h3>
                <p className='text-sm text-gray-600'>
                  Healthcare services available across {stats?.villages || 0} villages
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className='mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white'>
          <h2 className='text-2xl font-bold mb-4'>Recommendations</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <h3 className='font-semibold mb-2'>✓ Optimal Ratio</h3>
              <p className='text-sm text-white text-opacity-90'>
                Maintain 20-30 users per ASHA worker for best service quality
              </p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>✓ Expand Coverage</h3>
              <p className='text-sm text-white text-opacity-90'>
                Recruit more ASHA workers in high-density areas
              </p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>✓ Regular Training</h3>
              <p className='text-sm text-white text-opacity-90'>
                Ensure continuous skill development for ASHA workers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RuralStatistics
