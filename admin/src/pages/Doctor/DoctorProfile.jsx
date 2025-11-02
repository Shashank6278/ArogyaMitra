import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-5 md:p-10'>
            {/* Header */}
            <div className='bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-lg'>
                <h1 className='text-3xl md:text-4xl font-bold mb-2'>My Profile 👨‍⚕️</h1>
                <p className='text-blue-100 text-lg'>Manage your professional information</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Profile Image Card */}
                <div className='lg:col-span-1'>
                    <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
                        <div className='bg-gradient-to-br from-blue-500 to-purple-600 p-6'>
                            <h2 className='text-xl font-bold text-white mb-4'>Profile Picture</h2>
                        </div>
                        <div className='p-6'>
                            <img className='w-full rounded-xl shadow-md object-cover aspect-square' src={profileData.image} alt="" />
                            <div className='mt-6 space-y-3'>
                                <div className='flex items-center gap-3 p-3 bg-blue-50 rounded-lg'>
                                    <span className='text-2xl'>🏥</span>
                                    <div>
                                        <p className='text-xs text-gray-500'>Speciality</p>
                                        <p className='font-semibold text-gray-800'>{profileData.speciality}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3 p-3 bg-purple-50 rounded-lg'>
                                    <span className='text-2xl'>🎓</span>
                                    <div>
                                        <p className='text-xs text-gray-500'>Degree</p>
                                        <p className='font-semibold text-gray-800'>{profileData.degree}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3 p-3 bg-green-50 rounded-lg'>
                                    <span className='text-2xl'>⏱️</span>
                                    <div>
                                        <p className='text-xs text-gray-500'>Experience</p>
                                        <p className='font-semibold text-gray-800'>{profileData.experience}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Details Card */}
                <div className='lg:col-span-2'>
                    <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
                        <div className='bg-gradient-to-br from-blue-500 to-purple-600 p-6'>
                            <h2 className='text-2xl font-bold text-white'>Professional Details</h2>
                        </div>
                        <div className='p-8 space-y-6'>

                            {/* Name */}
                            <div className='mb-6'>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Full Name</label>
                                <div className='bg-gray-50 p-4 rounded-xl border border-gray-200'>
                                    <p className='text-xl font-bold text-gray-800'>{profileData.name}</p>
                                </div>
                            </div>

                            {/* About */}
                            <div className='mb-6'>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>About Me</label>
                                {
                                    isEdit
                                        ? <textarea 
                                            onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} 
                                            className='w-full border-2 border-blue-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all' 
                                            rows={6} 
                                            value={profileData.about}
                                            placeholder='Tell patients about yourself...'
                                          />
                                        : <div className='bg-gray-50 p-4 rounded-xl border border-gray-200'>
                                            <p className='text-gray-700 leading-relaxed'>{profileData.about}</p>
                                          </div>
                                }
                            </div>

                            {/* Consultation Fee */}
                            <div className='mb-6'>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Consultation Fee</label>
                                {isEdit ? (
                                    <div className='flex items-center gap-2'>
                                        <span className='text-xl font-bold text-gray-600'>{currency}</span>
                                        <input 
                                            type='number' 
                                            onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} 
                                            value={profileData.fees}
                                            className='flex-1 border-2 border-blue-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold text-lg'
                                        />
                                    </div>
                                ) : (
                                    <div className='bg-green-50 p-4 rounded-xl border border-green-200'>
                                        <p className='text-2xl font-bold text-green-700'>{currency} {profileData.fees}</p>
                                    </div>
                                )}
                            </div>

                            {/* Clinic Address */}
                            <div className='mb-6'>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Clinic Address</label>
                                {isEdit ? (
                                    <div className='space-y-3'>
                                        <input 
                                            type='text' 
                                            onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                            value={profileData.address.line1}
                                            placeholder='Address Line 1'
                                            className='w-full border-2 border-blue-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                                        />
                                        <input 
                                            type='text' 
                                            onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                            value={profileData.address.line2}
                                            placeholder='Address Line 2'
                                            className='w-full border-2 border-blue-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                                        />
                                    </div>
                                ) : (
                                    <div className='bg-gray-50 p-4 rounded-xl border border-gray-200'>
                                        <p className='text-gray-700'>📍 {profileData.address.line1}</p>
                                        {profileData.address.line2 && <p className='text-gray-700 mt-1'>{profileData.address.line2}</p>}
                                    </div>
                                )}
                            </div>

                            {/* Availability Toggle */}
                            <div className='mb-8'>
                                <label className='block text-sm font-semibold text-gray-700 mb-3'>Availability Status</label>
                                <div className='flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200'>
                                    <input 
                                        type="checkbox" 
                                        onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
                                        checked={profileData.available}
                                        className='w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500'
                                        disabled={!isEdit}
                                    />
                                    <label className='text-gray-700 font-medium'>
                                        {profileData.available ? '✅ Available for Appointments' : '❌ Not Available'}
                                    </label>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className='flex gap-4'>
                                {
                                    isEdit ? (
                                        <>
                                            <button 
                                                onClick={updateProfile} 
                                                className='flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all'
                                            >
                                                💾 Save Changes
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setIsEdit(false)
                                                    getProfileData()
                                                }} 
                                                className='px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all'
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button 
                                            onClick={() => setIsEdit(true)} 
                                            className='flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all'
                                        >
                                            ✏️ Edit Profile
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile