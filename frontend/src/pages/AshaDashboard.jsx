import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const AshaDashboard = () => {
  const { backendUrl, ashaToken, ashaData } = useContext(AppContext)
  const [records, setRecords] = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchAllRecords = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/health/all-records', { headers: { token: ashaToken } })
      if (data.success) {
        setRecords(data.records)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to fetch health records')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (ashaToken) {
      fetchAllRecords()
    }
  }, [ashaToken])

  if (loading) {
    return <div className='min-h-[70vh] flex items-center justify-center'>Loading...</div>
  }

  if (!ashaData) {
    return <div className='min-h-[70vh] flex items-center justify-center'>Please login as ASHA worker</div>
  }

  return (
    <div className='min-h-[70vh] py-8'>
      <div className='max-w-7xl m-auto'>
        <div className='bg-white shadow-md rounded-2xl p-8'>
          <div className='mb-6'>
            <h1 className='text-2xl font-semibold'>ASHA Worker Dashboard</h1>
            <p className='text-gray-600'>Welcome, {ashaData.name}</p>
            <p className='text-sm text-gray-500'>
              Assigned Villages: {[ashaData.village1, ashaData.village2, ashaData.village3].filter(v => v).join(', ') || ashaData.village || 'Not assigned'} | District: {ashaData.district}
            </p>
          </div>

          <div className='mb-4'>
            <h2 className='text-xl font-semibold mb-3'>Rural Users Health Records ({records.length})</h2>
          </div>

          {records.length === 0 ? (
            <div className='text-center py-12 text-gray-500'>
              <p>No health records found</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4'>
              {records.map((record, idx) => (
                <div key={idx} className='border rounded-lg p-4 hover:shadow-md transition-shadow'>
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <h3 className='font-semibold text-lg'>{record.userName}</h3>
                      <p className='text-sm text-gray-600'>{record.userEmail}</p>
                      {record.uhid && <p className='text-xs text-gray-500 font-mono mt-1'>UHID: {record.uhid}</p>}
                      <div className='mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm'>
                        <div>
                          <span className='text-gray-600'>Village:</span> <span className='font-medium'>{record.village || '-'}</span>
                        </div>
                        <div>
                          <span className='text-gray-600'>District:</span> <span className='font-medium'>{record.district || '-'}</span>
                        </div>
                        <div>
                          <span className='text-gray-600'>Blood Group:</span> <span className='font-medium'>{record.bloodGroup || '-'}</span>
                        </div>
                        <div>
                          <span className='text-gray-600'>Weight:</span> <span className='font-medium'>{record.weight ? record.weight + ' kg' : '-'}</span>
                        </div>
                        <div className='sm:col-span-2'>
                          <span className='text-gray-600'>Vaccination Status:</span> <span className='font-medium'>{record.vaccinationStatus || '-'}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedRecord(selectedRecord?._id === record._id ? null : record)}
                      className='bg-primary text-white px-4 py-2 rounded-md text-sm ml-4'
                    >
                      {selectedRecord?._id === record._id ? 'Hide' : 'View'} Details
                    </button>
                  </div>
                  
                  {selectedRecord?._id === record._id && (
                    <div className='mt-4 pt-4 border-t'>
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                          <p className='text-sm font-semibold text-gray-700'>Personal Information</p>
                          <div className='mt-2 space-y-1 text-sm'>
                            <p><span className='text-gray-600'>Height:</span> {record.height ? record.height + ' cm' : '-'}</p>
                            <p><span className='text-gray-600'>Weight:</span> {record.weight ? record.weight + ' kg' : '-'}</p>
                            <p><span className='text-gray-600'>Blood Group:</span> {record.bloodGroup || '-'}</p>
                          </div>
                        </div>
                        <div>
                          <p className='text-sm font-semibold text-gray-700'>Location</p>
                          <div className='mt-2 space-y-1 text-sm'>
                            <p><span className='text-gray-600'>Village:</span> {record.village || '-'}</p>
                            <p><span className='text-gray-600'>District:</span> {record.district || '-'}</p>
                            <p><span className='text-gray-600'>State:</span> {record.state || '-'}</p>
                          </div>
                        </div>
                        <div className='sm:col-span-2'>
                          <p className='text-sm font-semibold text-gray-700'>Medical Conditions</p>
                          <p className='mt-1 text-sm'>{record.medicalConditions || 'None reported'}</p>
                        </div>
                        <div className='sm:col-span-2'>
                          <p className='text-sm font-semibold text-gray-700'>Allergies</p>
                          <p className='mt-1 text-sm'>{record.allergies || 'None reported'}</p>
                        </div>
                        <div className='sm:col-span-2'>
                          <p className='text-sm font-semibold text-gray-700'>Current Medications</p>
                          <p className='mt-1 text-sm'>{record.currentMedications || 'None reported'}</p>
                        </div>
                        
                        {record.vaccinations && record.vaccinations.length > 0 && (
                          <div className='sm:col-span-2'>
                            <p className='text-sm font-semibold text-gray-700 mb-2'>Vaccination Records</p>
                            <div className='space-y-2'>
                              {record.vaccinations.map((vac, i) => (
                                <div key={i} className='bg-gray-50 rounded p-2 text-sm'>
                                  <p className='font-medium'>{vac.name}</p>
                                  <p className='text-gray-600'>Date: {vac.date}</p>
                                  {vac.nextDueDate && <p className='text-gray-600'>Next Due: {vac.nextDueDate}</p>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {record.visits && record.visits.length > 0 && (
                          <div className='sm:col-span-2'>
                            <p className='text-sm font-semibold text-gray-700 mb-2'>Visit History</p>
                            <div className='space-y-2'>
                              {record.visits.map((visit, i) => (
                                <div key={i} className='bg-gray-50 rounded p-2 text-sm'>
                                  <p><span className='font-medium'>Date:</span> {visit.date}</p>
                                  <p><span className='font-medium'>Reason:</span> {visit.reason}</p>
                                  <p><span className='font-medium'>Diagnosis:</span> {visit.diagnosis}</p>
                                  <p><span className='font-medium'>Prescription:</span> {visit.prescription}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AshaDashboard

