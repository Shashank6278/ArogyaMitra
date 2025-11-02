import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import VaccinationManager from '../components/VaccinationManager'

const RuralDashboard = () => {
  const { backendUrl, token, userData } = useContext(AppContext)
  const [healthRecord, setHealthRecord] = useState(null)
  const [editing, setEditing] = useState(false)
  
  // Form states
  const [bloodGroup, setBloodGroup] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [medicalConditions, setMedicalConditions] = useState('')
  const [allergies, setAllergies] = useState('')
  const [currentMedications, setCurrentMedications] = useState('')
  const [vaccinations, setVaccinations] = useState([])
  const [village, setVillage] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')

  const fetchHealthRecord = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/health/my-record', { headers: { token } })
      if (data.success && data.record) {
        setHealthRecord(data.record)
        setBloodGroup(data.record.bloodGroup || '')
        setHeight(data.record.height || '')
        setWeight(data.record.weight || '')
        setMedicalConditions(data.record.medicalConditions || '')
        setAllergies(data.record.allergies || '')
        setCurrentMedications(data.record.currentMedications || '')
        setVaccinations(data.record.vaccinations || [])
        setVillage(data.record.village || userData?.village || '')
        setDistrict(data.record.district || userData?.district || '')
        setState(data.record.state || userData?.state || '')
      } else {
        // Initialize with user data
        setVillage(userData?.village || '')
        setDistrict(userData?.district || '')
        setState(userData?.state || '')
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to fetch health record')
    }
  }

  useEffect(() => {
    if (token && userData) {
      fetchHealthRecord()
    }
  }, [token, userData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(backendUrl + '/api/health/update', {
        bloodGroup,
        height,
        weight,
        medicalConditions,
        allergies,
        currentMedications,
        vaccinations,
        village,
        district,
        state
      }, { headers: { token } })
      
      if (data.success) {
        toast.success('Health record updated successfully!')
        setHealthRecord(data.record)
        setEditing(false)
        fetchHealthRecord()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to update health record')
    }
  }

  if (!userData) {
    return <div className='min-h-[70vh] flex items-center justify-center'>Loading...</div>
  }

  return (
    <div className='min-h-[70vh] py-8'>
      <div className='max-w-4xl m-auto'>
        <div className='bg-white shadow-md rounded-2xl p-8'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-2xl font-semibold'>My Health Dashboard</h1>
              {userData.uhid && <p className='text-sm text-gray-600 mt-1'>UHID: <span className='font-mono font-semibold'>{userData.uhid}</span></p>}
            </div>
            {!editing && (
              <button onClick={() => setEditing(true)} className='bg-primary text-white px-6 py-2 rounded-md'>
                {healthRecord ? 'Edit' : 'Add'} Health Info
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <p className='font-medium'>Village</p>
                  <input value={village} onChange={(e) => setVillage(e.target.value)} className='border border-gray-300 rounded w-full p-2 mt-1' type='text' />
                </div>
                <div>
                  <p className='font-medium'>District</p>
                  <input value={district} onChange={(e) => setDistrict(e.target.value)} className='border border-gray-300 rounded w-full p-2 mt-1' type='text' />
                </div>
                <div>
                  <p className='font-medium'>State</p>
                  <input value={state} onChange={(e) => setState(e.target.value)} className='border border-gray-300 rounded w-full p-2 mt-1' type='text' />
                </div>
                <div>
                  <p className='font-medium'>Blood Group</p>
                  <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className='border border-gray-300 rounded w-full p-2 mt-1'>
                    <option value=''>Select</option>
                    <option value='A+'>A+</option>
                    <option value='A-'>A-</option>
                    <option value='B+'>B+</option>
                    <option value='B-'>B-</option>
                    <option value='O+'>O+</option>
                    <option value='O-'>O-</option>
                    <option value='AB+'>AB+</option>
                    <option value='AB-'>AB-</option>
                  </select>
                </div>
                <div>
                  <p className='font-medium'>Height (cm)</p>
                  <input value={height} onChange={(e) => setHeight(e.target.value)} className='border border-gray-300 rounded w-full p-2 mt-1' type='text' />
                </div>
                <div>
                  <p className='font-medium'>Weight (kg)</p>
                  <input value={weight} onChange={(e) => setWeight(e.target.value)} className='border border-gray-300 rounded w-full p-2 mt-1' type='text' />
                </div>
                <div className='sm:col-span-2'>
                  <p className='font-medium'>Medical Conditions</p>
                  <textarea value={medicalConditions} onChange={(e) => setMedicalConditions(e.target.value)} className='border border-gray-300 rounded w-full p-2 mt-1' rows='3' placeholder='Diabetes, Hypertension, etc.'></textarea>
                </div>
                <div className='sm:col-span-2'>
                  <p className='font-medium'>Allergies</p>
                  <textarea value={allergies} onChange={(e) => setAllergies(e.target.value)} className='border border-gray-300 rounded w-full p-2 mt-1' rows='2' placeholder='Food allergies, drug allergies, etc.'></textarea>
                </div>
                <div className='sm:col-span-2'>
                  <p className='font-medium'>Current Medications</p>
                  <textarea value={currentMedications} onChange={(e) => setCurrentMedications(e.target.value)} className='border border-gray-300 rounded w-full p-2 mt-1' rows='2' placeholder='List current medications'></textarea>
                </div>
              </div>
              
              {/* Vaccination Manager */}
              <div className='mt-6'>
                <VaccinationManager 
                  vaccinations={vaccinations} 
                  onUpdate={setVaccinations} 
                />
              </div>

              <div className='flex gap-3 pt-4'>
                <button type='submit' className='bg-primary text-white px-8 py-2 rounded-md'>Save</button>
                <button type='button' onClick={() => setEditing(false)} className='border border-gray-300 px-8 py-2 rounded-md'>Cancel</button>
              </div>
            </form>
          ) : (
            <div>
              {healthRecord ? (
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='border-b pb-2'>
                      <p className='text-gray-600 text-sm'>Village</p>
                      <p className='font-medium'>{healthRecord.village || '-'}</p>
                    </div>
                    <div className='border-b pb-2'>
                      <p className='text-gray-600 text-sm'>District</p>
                      <p className='font-medium'>{healthRecord.district || '-'}</p>
                    </div>
                    <div className='border-b pb-2'>
                      <p className='text-gray-600 text-sm'>State</p>
                      <p className='font-medium'>{healthRecord.state || '-'}</p>
                    </div>
                    <div className='border-b pb-2'>
                      <p className='text-gray-600 text-sm'>Blood Group</p>
                      <p className='font-medium'>{healthRecord.bloodGroup || '-'}</p>
                    </div>
                    <div className='border-b pb-2'>
                      <p className='text-gray-600 text-sm'>Height</p>
                      <p className='font-medium'>{healthRecord.height ? healthRecord.height + ' cm' : '-'}</p>
                    </div>
                    <div className='border-b pb-2'>
                      <p className='text-gray-600 text-sm'>Weight</p>
                      <p className='font-medium'>{healthRecord.weight ? healthRecord.weight + ' kg' : '-'}</p>
                    </div>
                    <div className='border-b pb-2 sm:col-span-2'>
                      <p className='text-gray-600 text-sm'>Medical Conditions</p>
                      <p className='font-medium'>{healthRecord.medicalConditions || '-'}</p>
                    </div>
                    <div className='border-b pb-2 sm:col-span-2'>
                      <p className='text-gray-600 text-sm'>Allergies</p>
                      <p className='font-medium'>{healthRecord.allergies || '-'}</p>
                    </div>
                    <div className='border-b pb-2 sm:col-span-2'>
                      <p className='text-gray-600 text-sm'>Current Medications</p>
                      <p className='font-medium'>{healthRecord.currentMedications || '-'}</p>
                    </div>
                  </div>
                  
                  {/* Vaccination Records - Read Only */}
                  <div className='mt-6'>
                    <VaccinationManager 
                      vaccinations={healthRecord.vaccinations || []} 
                      onUpdate={() => {}} 
                    />
                  </div>
                </div>
              ) : (
                <div className='text-center py-12 text-gray-500'>
                  <p>No health record found. Click "Add Health Info" to create one.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RuralDashboard

