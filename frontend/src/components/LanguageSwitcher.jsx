import React, { useContext, useState } from 'react'
import { LanguageContext } from '../context/LanguageContext'
import { Globe, ChevronDown } from 'lucide-react'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext)
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode)
    localStorage.setItem('language', langCode)
    setIsOpen(false)
  }

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 px-3 py-2 rounded-md bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors font-medium text-sm'
      >
        <Globe className='w-4 h-4' />
        <span>{currentLanguage?.nativeName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div 
            className='fixed inset-0 z-10' 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className='absolute right-0 top-full mt-2 bg-white border-2 border-gray-200 rounded-md shadow-lg z-20 min-w-[150px]'>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-2 text-left hover:bg-primary hover:text-white transition-colors flex items-center gap-2 ${
                  language === lang.code ? 'bg-primary text-white' : 'text-gray-700'
                }`}
              >
                <Globe className='w-4 h-4' />
                <span className='font-medium'>{lang.nativeName}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSwitcher
