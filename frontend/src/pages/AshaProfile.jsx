import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Row = ({ title, value }) => (
  <div className='flex justify-between py-2 border-b'>
    <span className='text-gray-600'>{title}</span>
    <span className='font-medium'>{value || '-'}</span>
  </div>
)

const AshaProfile = () => {
  const { ashaData, ashaToken, backendUrl, loadAshaData } = useContext(AppContext)
  const [isEditingVillages, setIsEditingVillages] = useState(false)
  const [village1, setVillage1] = useState(ashaData?.village1 || '')
  const [village2, setVillage2] = useState(ashaData?.village2 || '')
  const [village3, setVillage3] = useState(ashaData?.village3 || '')

  const handleSaveVillages = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/asha/update-villages', 
        { village1, village2, village3 }, 
        { headers: { token: ashaToken } }
      )
      if (data.success) {
        toast.success('Villages updated successfully!')
        setIsEditingVillages(false)
        if (loadAshaData) loadAshaData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to update villages')
    }
  }

  if (!ashaData) {
    return <div className='min-h-[70vh] flex items-center justify-center'>Loading...</div>
  }
  
  return (
    <div className='min-h-[70vh] flex items-center py-8'>
      <div className='max-w-2xl m-auto w-full bg-white shadow-md rounded-2xl p-8'>
        <p className='text-2xl font-semibold mb-4'>ASHA Profile</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <Row title='Name' value={ashaData.name} />
          <Row title='Email' value={ashaData.email} />
          <Row title='Phone' value={ashaData.phone} />
        </div>

        {/* Villages Section */}
        <div className='mt-6 border-t pt-4'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg font-semibold'>Assigned Villages</h3>
            {!isEditingVillages && (
              <button 
                onClick={() => {
                  setVillage1(ashaData.village1 || '')
                  setVillage2(ashaData.village2 || '')
                  setVillage3(ashaData.village3 || '')
                  setIsEditingVillages(true)
                }} 
                className='bg-primary text-white px-4 py-2 rounded-md text-sm'
              >
                Edit Villages
              </button>
            )}
          </div>
          
          {isEditingVillages ? (
            <div className='space-y-3'>
              <div>
                <p className='font-medium text-sm mb-1'>Village 1 (Primary) *</p>
                <input 
                  value={village1} 
                  onChange={(e) => setVillage1(e.target.value)} 
                  className='border border-gray-300 rounded w-full p-2' 
                  type='text' 
                  required 
                />
              </div>
              <div>
                <p className='font-medium text-sm mb-1'>Village 2 (Optional)</p>
                <input 
                  value={village2} 
                  onChange={(e) => setVillage2(e.target.value)} 
                  className='border border-gray-300 rounded w-full p-2' 
                  type='text' 
                />
              </div>
              <div>
                <p className='font-medium text-sm mb-1'>Village 3 (Optional)</p>
                <input 
                  value={village3} 
                  onChange={(e) => setVillage3(e.target.value)} 
                  className='border border-gray-300 rounded w-full p-2' 
                  type='text' 
                />
              </div>
              <div className='flex gap-3 pt-2'>
                <button onClick={handleSaveVillages} className='bg-primary text-white px-6 py-2 rounded-md'>Save</button>
                <button onClick={() => setIsEditingVillages(false)} className='border border-gray-300 px-6 py-2 rounded-md'>Cancel</button>
              </div>
            </div>
          ) : (
            <div className='space-y-2'>
              <Row title='Village 1 (Primary)' value={ashaData.village1 || ashaData.village} />
              <Row title='Village 2' value={ashaData.village2} />
              <Row title='Village 3' value={ashaData.village3} />
            </div>
          )}
        </div>

        {/* Other Details */}
        <div className='mt-6 border-t pt-4'>
          <h3 className='text-lg font-semibold mb-4'>Other Details</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Row title='Sub-center' value={ashaData.subcenter} />
            <Row title='Block' value={ashaData.block} />
            <Row title='District' value={ashaData.district} />
            <Row title='State' value={ashaData.state} />
            <Row title='Date of Joining' value={ashaData.dateOfJoining} />
            <Row title='ID Number' value={ashaData.idNumber} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AshaProfile


