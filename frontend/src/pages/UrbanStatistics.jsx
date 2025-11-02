import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { Stethoscope, Users, Calendar, TrendingUp, BarChart3 } from 'lucide-react'

const UrbanStatistics = () => {
  const { backendUrl } = useContext(AppContext)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      const [doctorsRes, appointmentsRes] = await Promise.all([
        axios.get(backendUrl + '/api/doctor/stats'),
        axios.get(backendUrl + '/api/appointment/stats')
      ])

      setStats({
        totalDoctors: doctorsRes.data.totalDoctors || 0,
        specializations: doctorsRes.data.specializations || {},
        specializationCount: Object.keys(doctorsRes.data.specializations || {}).length,
        totalAppointments: appointmentsRes.data.totalAppointments || 0,
        dailyAverage: appointmentsRes.data.dailyAverage || 0,
        urbanUsers: appointmentsRes.data.urbanUsers || 0
      })
    } catch (error) {
      console.error('Error fetching statistics:', error)
      // Set default values if API fails
      setStats({
        totalDoctors: 15,
        specializationCount: 6,
        specializations: {
          'General physician': 3,
          'Gynecologist': 2,
          'Dermatologist': 2,
          'Pediatricians': 2,
          'Neurologist': 3,
          'Gastroenterologist': 3
        },
        totalAppointments: 0,
        dailyAverage: 0,
        urbanUsers: 0
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading statistics...</div>
  }

  const statCards = [
    {
      title: 'Total Doctors',
      value: stats?.totalDoctors || 0,
      icon: Stethoscope,
      color: 'from-blue-500 to-indigo-600',
      description: 'Registered medical professionals'
    },
    {
      title: 'Specializations',
      value: stats?.specializationCount || 0,
      icon: BarChart3,
      color: 'from-purple-500 to-pink-600',
      description: 'Different medical specialties'
    },
    {
      title: 'Total Appointments',
      value: stats?.totalAppointments || 0,
      icon: Calendar,
      color: 'from-green-500 to-emerald-600',
      description: 'Appointments booked to date'
    },
    {
      title: 'Daily Average',
      value: stats?.dailyAverage || 0,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600',
      description: 'Average appointments per day'
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            Urban Healthcare Statistics
          </h1>
          <p className='text-lg text-gray-600'>
            Comprehensive overview of urban healthcare system
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

        {/* Specialization Breakdown */}
        <div className='bg-white rounded-2xl shadow-lg p-8 mb-8'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Doctors by Specialization</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {Object.entries(stats?.specializations || {}).map(([specialization, count]) => (
              <div key={specialization} className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-semibold text-gray-800'>{specialization}</p>
                    <p className='text-sm text-gray-600'>Available doctors</p>
                  </div>
                  <div className='text-3xl font-bold text-blue-600'>
                    {count}
                  </div>
                </div>
                <div className='mt-3 bg-blue-200 rounded-full h-2'>
                  <div 
                    className='bg-blue-600 h-2 rounded-full' 
                    style={{width: `${(count / stats.totalDoctors) * 100}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Metrics */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          {/* Appointment Trends */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Appointment Trends</h2>
            <div className='space-y-4'>
              <div className='flex justify-between items-center p-4 bg-green-50 rounded-lg'>
                <span className='font-medium text-gray-700'>Total Appointments</span>
                <span className='text-2xl font-bold text-green-600'>
                  {stats?.totalAppointments || 0}
                </span>
              </div>
              <div className='flex justify-between items-center p-4 bg-blue-50 rounded-lg'>
                <span className='font-medium text-gray-700'>Daily Average</span>
                <span className='text-2xl font-bold text-blue-600'>
                  {stats?.dailyAverage || 0}
                </span>
              </div>
              <div className='flex justify-between items-center p-4 bg-purple-50 rounded-lg'>
                <span className='font-medium text-gray-700'>Urban Users</span>
                <span className='text-2xl font-bold text-purple-600'>
                  {stats?.urbanUsers || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Key Insights</h2>
            <div className='space-y-4'>
              <div className='border-l-4 border-blue-500 pl-4 py-2'>
                <h3 className='font-semibold text-gray-800 mb-1'>Doctor Availability</h3>
                <p className='text-sm text-gray-600'>
                  {stats?.totalDoctors || 0} qualified doctors across {stats?.specializationCount || 0} specializations
                </p>
              </div>
              <div className='border-l-4 border-green-500 pl-4 py-2'>
                <h3 className='font-semibold text-gray-800 mb-1'>Appointment Volume</h3>
                <p className='text-sm text-gray-600'>
                  {stats?.totalAppointments || 0} appointments booked by urban users
                </p>
              </div>
              <div className='border-l-4 border-purple-500 pl-4 py-2'>
                <h3 className='font-semibold text-gray-800 mb-1'>Daily Activity</h3>
                <p className='text-sm text-gray-600'>
                  Average of {stats?.dailyAverage || 0} appointments scheduled per day
                </p>
              </div>
              <div className='border-l-4 border-orange-500 pl-4 py-2'>
                <h3 className='font-semibold text-gray-800 mb-1'>User Trust</h3>
                <p className='text-sm text-gray-600'>
                  {stats?.urbanUsers || 0} urban users trust ArogyaMitra for healthcare
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* System Performance */}
        <div className='bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white'>
          <h2 className='text-2xl font-bold mb-4'>System Performance</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <h3 className='font-semibold mb-2'>✓ High Availability</h3>
              <p className='text-sm text-white text-opacity-90'>
                24/7 access to {stats?.totalDoctors || 0} doctors across multiple specializations
              </p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>✓ Growing Network</h3>
              <p className='text-sm text-white text-opacity-90'>
                {stats?.urbanUsers || 0} users actively using the platform for healthcare
              </p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>✓ Efficient Service</h3>
              <p className='text-sm text-white text-opacity-90'>
                Average {stats?.dailyAverage || 0} appointments handled daily
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UrbanStatistics
