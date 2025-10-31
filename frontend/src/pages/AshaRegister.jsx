import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const AshaRegister = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [village, setVillage] = useState('') // Kept for backward compatibility
  const [village1, setVillage1] = useState('')
  const [village2, setVillage2] = useState('')
  const [village3, setVillage3] = useState('')
  const [subcenter, setSubcenter] = useState('')
  const [block, setBlock] = useState('')
  const [district, setDistrict] = useState('')
  const [stateName, setStateName] = useState('')
  const [dateOfJoining, setDateOfJoining] = useState('')
  const [idNumber, setIdNumber] = useState('')

  const navigate = useNavigate()
  const { backendUrl } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const body = { name, email, password, phone, village: village1, village1, village2, village3, subcenter, block, district, state: stateName, dateOfJoining, idNumber }
    const { data } = await axios.post(backendUrl + '/api/asha/register', body)
    if (data.success) {
      toast.success('Registered successfully! Please login.')
      navigate('/asha-login')
    } else {
      toast.error(data.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center py-8'>
      <div className='max-w-2xl m-auto w-full bg-white shadow-md rounded-2xl p-8 flex flex-col gap-4'>
        <p className='text-2xl font-semibold'>ASHA Worker Registration</p>
        <p className='text-sm text-gray-600'>Register as an ASHA worker to access rural health records</p>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='sm:col-span-2'>
            <p className='font-medium'>Full Name *</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
          </div>
          <div className='sm:col-span-2'>
            <p className='font-medium'>Email *</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
          </div>
          <div className='sm:col-span-2'>
            <p className='font-medium'>Password * (min 8 characters)</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
          </div>
          <div className='sm:col-span-2'>
            <p className='font-medium'>Phone Number *</p>
            <input onChange={(e) => setPhone(e.target.value)} value={phone} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
          </div>
          <div className='sm:col-span-2'>
            <p className='font-medium text-gray-700 mb-2'>Assigned Villages (Select up to 3 villages)</p>
          </div>
          <div>
            <p className='font-medium'>Village 1 (Primary) *</p>
            <input onChange={(e) => setVillage1(e.target.value)} value={village1} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='text' required />
          </div>
          <div>
            <p className='font-medium'>Village 2 (Optional)</p>
            <input onChange={(e) => setVillage2(e.target.value)} value={village2} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='text' />
          </div>
          <div>
            <p className='font-medium'>Village 3 (Optional)</p>
            <input onChange={(e) => setVillage3(e.target.value)} value={village3} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='text' />
          </div>
          <div>
            <p className='font-medium'>Sub-center</p>
            <input onChange={(e) => setSubcenter(e.target.value)} value={subcenter} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='text' />
          </div>
          <div>
            <p className='font-medium'>Block</p>
            <input onChange={(e) => setBlock(e.target.value)} value={block} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='text' />
          </div>
          <div>
            <p className='font-medium'>District</p>
            <input onChange={(e) => setDistrict(e.target.value)} value={district} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='text' />
          </div>
          <div>
            <p className='font-medium'>State</p>
            <input onChange={(e) => setStateName(e.target.value)} value={stateName} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='text' />
          </div>
          <div>
            <p className='font-medium'>Date of Joining</p>
            <input onChange={(e) => setDateOfJoining(e.target.value)} value={dateOfJoining} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='date' />
          </div>
          <div className='sm:col-span-2'>
            <p className='font-medium'>ASHA ID Number</p>
            <input onChange={(e) => setIdNumber(e.target.value)} value={idNumber} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='text' />
          </div>
        </div>
        
        <button className='bg-primary text-white w-full py-3 my-2 rounded-md text-base font-medium'>Register</button>
        <p className='text-center'>Already registered? <span onClick={() => navigate('/asha-login')} className='text-primary underline cursor-pointer'>Login here</span></p>
        <p className='text-xs text-gray-500'>Learn more about ASHA roles in the official NHM guideline <a className='text-primary underline' href='https://www.nhm.gov.in/images/pdf/communitisation/task-group-reports/guidelines-on-asha.pdf' target='_blank' rel='noreferrer'>here</a>.</p>
      </div>
    </form>
  )
}

export default AshaRegister

