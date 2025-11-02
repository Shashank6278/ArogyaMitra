import React, { createContext, useState, useEffect } from 'react'

export const LanguageContext = createContext()

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('kn') // Default to Kannada

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      // Set Kannada as default
      localStorage.setItem('language', 'kn')
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'kn' : 'en'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// Translations
const translations = {
  en: {
    // Landing Page
    'landing.title': 'Welcome to ArogyaMitra',
    'landing.subtitle': 'Your Complete Healthcare Solution',
    'landing.rural': 'ASHA Workers (Rural Healthcare)',
    'landing.rural.desc': 'Access for ASHA workers and rural users',
    'landing.urban': 'Urban Healthcare',
    'landing.urban.desc': 'Login for urban users and doctors',
    'landing.helpline': 'Emergency Helpline Numbers',
    'landing.helpline.desc': 'Access emergency contact numbers',
    'landing.explore': 'Explore Website',
    'landing.explore.desc': 'Browse our healthcare services',
    'landing.getstarted': 'Get Started',
    
    // Navigation
    'nav.home': 'HOME',
    'nav.doctors': 'ALL DOCTORS',
    'nav.about': 'ABOUT',
    'nav.contact': 'CONTACT',
    'nav.helpline': 'HELPLINE',
    'nav.asha': 'ASHA',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    
    // Common
    'common.welcome': 'Welcome',
    'common.loading': 'Loading...',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.confirm': 'Confirm',
    
    // Login/Registration
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.aadhar': 'Aadhar Number',
    'auth.register': 'Create Account',
    
    // Dashboard
    'dashboard.title': 'My Health Dashboard',
    'dashboard.profile': 'My Profile',
    'dashboard.appointments': 'My Appointments',
    'dashboard.health': 'Health Records',
    
    // Vaccination
    'vaccine.title': 'Vaccination Records',
    'vaccine.add': 'Add Vaccination Record',
    'vaccine.name': 'Vaccine Name',
    'vaccine.status': 'Status',
    'vaccine.date': 'Date Taken',
    'vaccine.nextdue': 'Next Due Date',
    'vaccine.govt.link': 'View Govt. Vaccination Chart'
  },
  kn: {
    // Landing Page
    'landing.title': 'ಆರೋಗ್ಯಮಿತ್ರಕ್ಕೆ ಸ್ವಾಗತ',
    'landing.subtitle': 'ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಆರೋಗ್ಯ ಪರಿಹಾರ',
    'landing.rural': 'ಆಶಾ ಕಾರ್ಯಕರ್ತರು (ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ)',
    'landing.rural.desc': 'ಆಶಾ ಕಾರ್ಯಕರ್ತರು ಮತ್ತು ಗ್ರಾಮೀಣ ಬಳಕೆದಾರರಿಗೆ ಪ್ರವೇಶ',
    'landing.urban': 'ನಗರ ಆರೋಗ್ಯ',
    'landing.urban.desc': 'ನಗರ ಬಳಕೆದಾರರು ಮತ್ತು ವೈದ್ಯರಿಗೆ ಲಾಗಿನ್',
    'landing.helpline': 'ತುರ್ತು ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆಗಳು',
    'landing.helpline.desc': 'ತುರ್ತು ಸಂಪರ್ಕ ಸಂಖ್ಯೆಗಳನ್ನು ಪ್ರವೇಶಿಸಿ',
    'landing.explore': 'ವೆಬ್‌ಸೈಟ್ ಅನ್ವೇಷಿಸಿ',
    'landing.explore.desc': 'ನಮ್ಮ ಆರೋಗ್ಯ ಸೇವೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    'landing.getstarted': 'ಪ್ರಾರಂಭಿಸಿ',
    
    // Navigation
    'nav.home': 'ಮುಖಪುಟ',
    'nav.doctors': 'ಎಲ್ಲಾ ವೈದ್ಯರು',
    'nav.about': 'ನಮ್ಮ ಬಗ್ಗೆ',
    'nav.contact': 'ಸಂಪರ್ಕಿಸಿ',
    'nav.helpline': 'ಸಹಾಯವಾಣಿ',
    'nav.asha': 'ಆಶಾ',
    'nav.login': 'ಲಾಗಿನ್',
    'nav.signup': 'ನೋಂದಣಿ',
    
    // Common
    'common.welcome': 'ಸ್ವಾಗತ',
    'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    'common.submit': 'ಸಲ್ಲಿಸಿ',
    'common.cancel': 'ರದ್ದುಮಾಡಿ',
    'common.save': 'ಉಳಿಸಿ',
    'common.edit': 'ಸಂಪಾದಿಸಿ',
    'common.delete': 'ಅಳಿಸಿ',
    'common.back': 'ಹಿಂದೆ',
    'common.next': 'ಮುಂದೆ',
    'common.previous': 'ಹಿಂದಿನ',
    'common.confirm': 'ದೃಢೀಕರಿಸಿ',
    
    // Login/Registration
    'auth.login': 'ಲಾಗಿನ್',
    'auth.signup': 'ನೋಂದಣಿ',
    'auth.email': 'ಇಮೇಲ್',
    'auth.password': 'ಪಾಸ್‌ವರ್ಡ್',
    'auth.name': 'ಪೂರ್ಣ ಹೆಸರು',
    'auth.aadhar': 'ಆಧಾರ್ ಸಂಖ್ಯೆ',
    'auth.register': 'ಖಾತೆ ತೆರೆಯಿರಿ',
    
    // Dashboard
    'dashboard.title': 'ನನ್ನ ಆರೋಗ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'dashboard.profile': 'ನನ್ನ ಪ್ರೊಫೈಲ್',
    'dashboard.appointments': 'ನನ್ನ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು',
    'dashboard.health': 'ಆರೋಗ್ಯ ದಾಖಲೆಗಳು',
    
    // Vaccination
    'vaccine.title': 'ಲಸಿಕೆ ದಾಖಲೆಗಳು',
    'vaccine.add': 'ಲಸಿಕೆ ದಾಖಲೆ ಸೇರಿಸಿ',
    'vaccine.name': 'ಲಸಿಕೆ ಹೆಸರು',
    'vaccine.status': 'ಸ್ಥಿತಿ',
    'vaccine.date': 'ತೆಗೆದುಕೊಂಡ ದಿನಾಂಕ',
    'vaccine.nextdue': 'ಮುಂದಿನ ದಿನಾಂಕ',
    'vaccine.govt.link': 'ಸರ್ಕಾರಿ ಲಸಿಕೆ ಚಾರ್ಟ್ ವೀಕ್ಷಿಸಿ'
  }
}

export default LanguageProvider
