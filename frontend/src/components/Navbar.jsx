import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData, ashaToken, setAshaToken, ashaData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  const ashaLogout = () => {
    localStorage.removeItem('ashaToken')
    setAshaToken(false)
    navigate('/asha-login')
  }

  const handleAshaNavigation = () => {
    // If ASHA worker is logged in, go to dashboard
    if (ashaToken && ashaData) {
      navigate('/asha-dashboard')
    }
    // If rural user is logged in, go to their health dashboard
    else if (token && userData && userData.isRuralUser) {
      navigate('/rural-dashboard')
    }
    // If regular user is logged in, redirect to auth gateway
    else if (token && userData) {
      navigate('/auth')
    }
    // If not logged in, go to auth gateway
    else {
      navigate('/auth')
    }
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='md:flex items-start gap-5 font-medium hidden'>
        <NavLink to='/' >
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors' >
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about' >
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact' >
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <li onClick={() => handleAshaNavigation()} className='cursor-pointer'>
          <button className='bg-primary text-white px-6 py-2 rounded-md text-base font-semibold hover:bg-primary/90 transition-all'>
            ASHA
          </button>
        </li>
      </ul>

      <div className='flex items-center gap-4 '>
        {
          ashaToken && ashaData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <div className='w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold'>{ashaData.name.charAt(0)}</div>
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/asha-dashboard')} className='hover:text-black cursor-pointer'>ASHA Dashboard</p>
                  <p onClick={() => navigate('/asha-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={ashaLogout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
          : token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={userData.image} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                  {userData.isRuralUser && <p onClick={() => navigate('/rural-dashboard')} className='hover:text-black cursor-pointer'>Health Dashboard</p>}
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/auth')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img src={assets.logo} className='w-36' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
            <button 
              onClick={() => { setShowMenu(false); handleAshaNavigation() }} 
              className='bg-primary text-white px-6 py-3 rounded-md text-base font-semibold hover:bg-primary/90 transition-all w-full mt-2'
            >
              ASHA
            </button>
            <div className='w-full pt-4 flex flex-col gap-2'>
              <button onClick={() => { setShowMenu(false); navigate('/auth') }} className='bg-primary text-white w-full py-3 rounded-md'>Login</button>
              <button onClick={() => { setShowMenu(false); navigate('/auth') }} className='border border-primary text-primary w-full py-3 rounded-md'>Sign Up</button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar