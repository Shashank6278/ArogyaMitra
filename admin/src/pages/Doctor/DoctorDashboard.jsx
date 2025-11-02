import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment, profileData, getProfileData } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
      getProfileData()
    }
  }, [dToken])

  return dashData && (
    <div className='m-5 md:m-10'>
      {/* Welcome Header */}
      <div className='bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-lg'>
        <h1 className='text-3xl md:text-4xl font-bold mb-2'>Welcome back, Dr. {profileData?.name || 'Doctor'}! 👋</h1>
        <p className='text-blue-100 text-lg'>Here's your dashboard overview for today</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-green-200'>
          <div className='flex items-center justify-between mb-4'>
            <div className='bg-green-500 p-3 rounded-xl'>
              <img className='w-8 h-8' src={assets.earning_icon} alt="" />
            </div>
          </div>
          <p className='text-3xl font-bold text-gray-800 mb-1'>{currency} {dashData.earnings}</p>
          <p className='text-green-700 font-medium'>Total Earnings</p>
        </div>
        <div className='bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-blue-200'>
          <div className='flex items-center justify-between mb-4'>
            <div className='bg-blue-500 p-3 rounded-xl'>
              <img className='w-8 h-8' src={assets.appointments_icon} alt="" />
            </div>
          </div>
          <p className='text-3xl font-bold text-gray-800 mb-1'>{dashData.appointments}</p>
          <p className='text-blue-700 font-medium'>Total Appointments</p>
        </div>
        <div className='bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-purple-200'>
          <div className='flex items-center justify-between mb-4'>
            <div className='bg-purple-500 p-3 rounded-xl'>
              <img className='w-8 h-8' src={assets.patients_icon} alt="" />
            </div>
          </div>
          <p className='text-3xl font-bold text-gray-800 mb-1'>{dashData.patients}</p>
          <p className='text-purple-700 font-medium'>Total Patients</p>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
        <div className='bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-5'>
          <div className='flex items-center gap-3'>
            <div className='bg-white bg-opacity-20 p-2 rounded-lg'>
              <img className='w-6 h-6' src={assets.list_icon} alt="" />
            </div>
            <h2 className='text-xl font-bold text-white'>Latest Appointments</h2>
          </div>
        </div>

        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments.length === 0 ? (
            <div className='px-6 py-12 text-center'>
              <p className='text-gray-400 text-lg'>No appointments yet</p>
            </div>
          ) : (
            dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div className='flex items-center px-6 py-4 gap-4 hover:bg-blue-50 transition-colors' key={index}>
                <img className='rounded-full w-12 h-12 object-cover border-2 border-blue-200' src={item.userData.image} alt="" />
                <div className='flex-1'>
                  <p className='text-gray-900 font-semibold text-base'>{item.userData.name}</p>
                  <p className='text-gray-500 text-sm'>📅 {slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled
                  ? <span className='px-4 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-full'>Cancelled</span>
                  : item.isCompleted
                    ? <span className='px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full'>Completed</span>
                    : <div className='flex gap-2'>
                      <button 
                        onClick={() => cancelAppointment(item._id)} 
                        className='p-2 hover:bg-red-100 rounded-lg transition-colors'
                        title='Cancel Appointment'
                      >
                        <img className='w-8 h-8' src={assets.cancel_icon} alt="" />
                      </button>
                      <button 
                        onClick={() => completeAppointment(item._id)} 
                        className='p-2 hover:bg-green-100 rounded-lg transition-colors'
                        title='Mark as Completed'
                      >
                        <img className='w-8 h-8' src={assets.tick_icon} alt="" />
                      </button>
                    </div>
                }
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard