import React from 'react'
import LanguageProvider from './context/LanguageContext'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import RuralAuth from './pages/RuralAuth'
import UrbanAuth from './pages/UrbanAuth'
import Helpline from './pages/Helpline'
import DoctorAuth from './pages/DoctorAuth'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import AIDoctor from './components/AIDoctor'
import ConnectionStatus from './components/ConnectionStatus'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import AuthGateway from './pages/AuthGateway'
import AshaLogin from './pages/AshaLogin'
import AshaRegister from './pages/AshaRegister'
import AshaProfile from './pages/AshaProfile'
import AshaDashboard from './pages/AshaDashboard'
import RuralDashboard from './pages/RuralDashboard'
import AshaAbout from './pages/AshaAbout'
import Careers from './pages/Careers'
import AshaRoleDetail from './pages/AshaRoles/AshaRoleDetail'

const App = () => {
  return (
    <LanguageProvider>
      <div className='mx-4 sm:mx-[10%]'>
        <ToastContainer />
        <ConnectionStatus />
        <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/rural-auth' element={<RuralAuth />} />
        <Route path='/urban-auth' element={<UrbanAuth />} />
        <Route path='/helpline' element={<Helpline />} />
        <Route path='/doctor-auth' element={<DoctorAuth />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/auth' element={<AuthGateway />} />
        <Route path='/asha-login' element={<AshaLogin />} />
        <Route path='/asha-register' element={<AshaRegister />} />
        <Route path='/asha-profile' element={<AshaProfile />} />
        <Route path='/asha-dashboard' element={<AshaDashboard />} />
        <Route path='/rural-dashboard' element={<RuralDashboard />} />
        <Route path='/about' element={<About />} />
        <Route path='/asha-about' element={<AshaAbout />} />
        <Route path='/asha-role/:roleId' element={<AshaRoleDetail />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
      <AIDoctor />
    </div>
    </LanguageProvider>
  )
}

export default App