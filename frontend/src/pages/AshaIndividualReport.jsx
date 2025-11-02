import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const AshaIndividualReport = () => {
  const { userId } = useParams()
  const { backendUrl, ashaToken } = useContext(AppContext)
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        console.log('Fetching record for userId:', userId)
        console.log('Backend URL:', backendUrl)
        console.log('ASHA Token:', ashaToken ? 'Present' : 'Missing')
        
        const { data } = await axios.get(backendUrl + `/api/health/record/${userId}`, { 
          headers: { token: ashaToken } 
        })
        
        console.log('API Response:', data)
        
        if (data.success) {
          setRecord(data.record)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.error('Error fetching record:', error)
        toast.error('Failed to fetch record: ' + (error.response?.data?.message || error.message))
      } finally {
        setLoading(false)
      }
    }

    if (ashaToken && userId) {
      fetchRecord()
    } else {
      console.log('Missing requirements - Token:', !!ashaToken, 'UserId:', !!userId)
      setLoading(false)
    }
  }, [userId, ashaToken, backendUrl])

  const printReport = () => {
    window.print()
  }

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading report...</div>
  }

  if (!record) {
    return <div className='min-h-screen flex items-center justify-center'>Record not found</div>
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 print:bg-white'>
      <div className='max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 print:shadow-none'>
        {/* Header */}
        <div className='border-b-2 border-primary pb-4 mb-6'>
          <div className='flex justify-between items-start'>
            <div>
              <h1 className='text-3xl font-bold text-primary'>Individual Health Report</h1>
              <p className='text-gray-600 mt-1'>ArogyaMitra - Rural Healthcare System</p>
            </div>
            <button 
              onClick={printReport}
              className='bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark print:hidden'
            >
              Print Report
            </button>
          </div>
          <div className='mt-4 text-sm text-gray-600'>
            <p>Generated on: {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
        </div>

        {/* Patient Information */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Patient Information</h2>
          <div className='grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg'>
            <div>
              <p className='text-sm text-gray-600'>Name</p>
              <p className='font-semibold text-lg'>{record.userName}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>UHID</p>
              <p className='font-semibold text-lg font-mono'>{record.uhid || 'N/A'}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>Email</p>
              <p className='font-semibold'>{record.userEmail}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>Blood Group</p>
              <p className='font-semibold'>{record.bloodGroup || 'Not specified'}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>Village</p>
              <p className='font-semibold'>{record.village || 'Not specified'}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>District</p>
              <p className='font-semibold'>{record.district || 'Not specified'}</p>
            </div>
          </div>
        </div>

        {/* Vital Statistics */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Vital Statistics</h2>
          <div className='grid grid-cols-3 gap-4'>
            <div className='bg-blue-50 p-6 rounded-lg text-center'>
              <p className='text-sm text-gray-600 mb-2'>Height</p>
              <p className='text-3xl font-bold text-blue-600'>{record.height || '-'}</p>
              <p className='text-sm text-gray-500'>cm</p>
            </div>
            <div className='bg-green-50 p-6 rounded-lg text-center'>
              <p className='text-sm text-gray-600 mb-2'>Weight</p>
              <p className='text-3xl font-bold text-green-600'>{record.weight || '-'}</p>
              <p className='text-sm text-gray-500'>kg</p>
            </div>
            <div className='bg-purple-50 p-6 rounded-lg text-center'>
              <p className='text-sm text-gray-600 mb-2'>BMI</p>
              <p className='text-3xl font-bold text-purple-600'>
                {record.height && record.weight 
                  ? ((record.weight / ((record.height/100) ** 2)).toFixed(1))
                  : '-'
                }
              </p>
              <p className='text-sm text-gray-500'>kg/m²</p>
            </div>
          </div>
        </div>

        {/* Medical Conditions */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Medical Information</h2>
          <div className='space-y-4'>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='font-semibold text-gray-700 mb-2'>Medical Conditions</p>
              <p className='text-gray-600'>{record.medicalConditions || 'None reported'}</p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='font-semibold text-gray-700 mb-2'>Allergies</p>
              <p className='text-gray-600'>{record.allergies || 'None reported'}</p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='font-semibold text-gray-700 mb-2'>Current Medications</p>
              <p className='text-gray-600'>{record.currentMedications || 'None reported'}</p>
            </div>
          </div>
        </div>

        {/* Vaccination Records */}
        {record.vaccinations && record.vaccinations.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Vaccination Records</h2>
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='bg-primary text-white'>
                    <th className='p-3 text-left'>Vaccine Name</th>
                    <th className='p-3 text-left'>Date Taken</th>
                    <th className='p-3 text-left'>Next Due Date</th>
                    <th className='p-3 text-left'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {record.vaccinations.map((vac, i) => (
                    <tr key={i} className='border-b hover:bg-gray-50'>
                      <td className='p-3'>{vac.name}</td>
                      <td className='p-3'>{vac.date}</td>
                      <td className='p-3'>{vac.nextDueDate || 'N/A'}</td>
                      <td className='p-3'>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          vac.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {vac.status || 'Completed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Visit History */}
        {record.visits && record.visits.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Visit History</h2>
            <div className='space-y-4'>
              {record.visits.map((visit, i) => (
                <div key={i} className='border-l-4 border-primary bg-gray-50 p-4 rounded'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm text-gray-600'>Date</p>
                      <p className='font-semibold'>{visit.date}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Reason for Visit</p>
                      <p className='font-semibold'>{visit.reason}</p>
                    </div>
                    <div className='col-span-2'>
                      <p className='text-sm text-gray-600'>Diagnosis</p>
                      <p className='font-semibold'>{visit.diagnosis}</p>
                    </div>
                    <div className='col-span-2'>
                      <p className='text-sm text-gray-600'>Prescription</p>
                      <p className='font-semibold'>{visit.prescription}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className='mt-12 pt-6 border-t text-center text-sm text-gray-600'>
          <p>This is an official health report generated by ArogyaMitra</p>
          <p className='mt-1'>For any queries, please contact your ASHA worker</p>
        </div>
      </div>
    </div>
  )
}

export default AshaIndividualReport
