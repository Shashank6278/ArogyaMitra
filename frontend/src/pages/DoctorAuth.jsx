import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Upload } from 'lucide-react'

const DoctorAuth = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [degree, setDegree] = useState('')
  const [experience, setExperience] = useState('')
  const [about, setAbout] = useState('')
  const [fees, setFees] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const navigate = useNavigate()
  const { backendUrl, setDoctorToken } = useContext(AppContext)

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Sign Up') {
        // Validation
        if (!name || !email || !password || !speciality || !degree || !experience || !fees || !address1) {
          toast.error('Please fill all required fields')
          return
        }

        if (!image) {
          toast.error('Please upload your photo')
          return
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('speciality', speciality)
        formData.append('degree', degree)
        formData.append('experience', experience)
        formData.append('about', about)
        formData.append('fees', fees)
        formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
        formData.append('image', image)

        const { data } = await axios.post(backendUrl + '/api/doctor/register', formData)

        if (data.success) {
          toast.success('Registration successful! Please wait for admin approval.')
          setState('Login')
        } else {
          toast.error(data.message)
        }
      } else {
        // Login
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })

        if (data.success) {
          localStorage.setItem('dToken', data.token)
          if (typeof setDoctorToken === 'function') {
            try { setDoctorToken(data.token) } catch {}
          }
          toast.success('Login successful! Redirecting to your dashboard...')
          // Redirect to doctor dashboard in admin panel (port 5174)
          setTimeout(() => {
            window.location.replace('http://localhost:5174')
          }, 1500)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log(error)
      const msg = error?.response?.data?.message || error?.message || 'An error occurred'
      toast.error(msg)
    }
  }

  return (
    <div className='min-h-[80vh] py-8'>
      <form onSubmit={onSubmitHandler} className='max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>
            {state === 'Sign Up' ? 'Doctor Registration' : 'Doctor Login'}
          </h1>
          <p className='text-gray-600'>
            {state === 'Sign Up' 
              ? 'Register to join our healthcare platform' 
              : 'Login to access your dashboard'}
          </p>
        </div>

        {state === 'Sign Up' && (
          <>
            {/* Photo Upload */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Profile Photo *
              </label>
              <div className='flex items-center gap-4'>
                {imagePreview ? (
                  <img src={imagePreview} alt='Preview' className='w-24 h-24 rounded-full object-cover border-2 border-primary' />
                ) : (
                  <div className='w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center'>
                    <Upload className='w-8 h-8 text-gray-400' />
                  </div>
                )}
                <label className='cursor-pointer bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark'>
                  Choose Photo
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='hidden'
                    required
                  />
                </label>
              </div>
            </div>

            {/* Basic Information */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name *</label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full border border-gray-300 rounded-md p-2'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email *</label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full border border-gray-300 rounded-md p-2'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Password *</label>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full border border-gray-300 rounded-md p-2'
                  minLength='8'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Speciality *</label>
                <select
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  className='w-full border border-gray-300 rounded-md p-2'
                  required
                >
                  <option value=''>Select Speciality</option>
                  {specialities.map((spec, idx) => (
                    <option key={idx} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Degree *</label>
                <input
                  type='text'
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder='e.g., MBBS, MD'
                  className='w-full border border-gray-300 rounded-md p-2'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Experience (years) *</label>
                <input
                  type='number'
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className='w-full border border-gray-300 rounded-md p-2'
                  min='0'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Consultation Fees (₹) *</label>
                <input
                  type='number'
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  className='w-full border border-gray-300 rounded-md p-2'
                  min='0'
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Clinic Address Line 1 *</label>
              <input
                type='text'
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className='w-full border border-gray-300 rounded-md p-2'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Clinic Address Line 2</label>
              <input
                type='text'
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className='w-full border border-gray-300 rounded-md p-2'
              />
            </div>

            {/* About */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className='w-full border border-gray-300 rounded-md p-2'
                rows='4'
                placeholder='Tell patients about yourself, your expertise, and approach to healthcare...'
              />
            </div>
          </>
        )}

        {/* Login Fields */}
        {state === 'Login' && (
          <>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border border-gray-300 rounded-md p-2'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full border border-gray-300 rounded-md p-2'
                required
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-primary text-white py-3 rounded-md font-medium text-lg hover:bg-primary-dark transition-colors'
        >
          {state === 'Sign Up' ? 'Register as Doctor' : 'Login'}
        </button>

        {/* Toggle State */}
        <div className='mt-4 text-center'>
          {state === 'Sign Up' ? (
            <p className='text-gray-600'>
              Already registered?{' '}
              <span onClick={() => setState('Login')} className='text-primary cursor-pointer font-medium hover:underline'>
                Login here
              </span>
            </p>
          ) : (
            <p className='text-gray-600'>
              New doctor?{' '}
              <span onClick={() => setState('Sign Up')} className='text-primary cursor-pointer font-medium hover:underline'>
                Register here
              </span>
            </p>
          )}
        </div>

        {/* Back to Home */}
        <div className='mt-4 text-center'>
          <button
            type='button'
            onClick={() => navigate('/')}
            className='text-gray-500 hover:text-gray-700 text-sm'
          >
            ← Back to Home
          </button>
        </div>
      </form>
    </div>
  )
}

export default DoctorAuth
