import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const navigate = useNavigate()

    const slides = [
        {
            title: "Book Appointment",
            subtitle: "With Trusted Doctors",
            description: "Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.",
            image: assets.header_img,
            buttonText: "Book appointment",
            buttonLink: "#speciality",
            isExternal: true
        },
        {
            title: "Helping ASHA Workers",
            subtitle: "Automate Their Jobs",
            description: "Empowering rural healthcare workers with digital tools to efficiently manage and track patient records.",
            image: assets.asha_workers_img || assets.header_img,
            buttonText: "Learn More",
            buttonLink: "/asha-about",
            isExternal: false
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000) // Switch every 5 seconds

        return () => clearInterval(timer)
    }, [slides.length])

    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 overflow-hidden relative'>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] z-10'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight transition-all duration-500'>
                    {slides[currentSlide].title} <br /> {slides[currentSlide].subtitle}
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light transition-all duration-500'>
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <p>{slides[currentSlide].description}</p>
                </div>
                {slides[currentSlide].isExternal ? (
                    <a href={slides[currentSlide].buttonLink} className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                        {slides[currentSlide].buttonText} <img className='w-3' src={assets.arrow_icon} alt="" />
                    </a>
                ) : (
                    <button onClick={() => { navigate(slides[currentSlide].buttonLink); scrollTo(0, 0) }} className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                        {slides[currentSlide].buttonText} <img className='w-3' src={assets.arrow_icon} alt="" />
                    </button>
                )}
                
                {/* Slide Indicators */}
                <div className='flex gap-2 m-auto md:m-0'>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* --------- Header Right --------- */}
            <div className='md:w-1/2 relative'>
                <img 
                    className='w-full md:absolute bottom-0 h-auto rounded-lg transition-opacity duration-500' 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title} 
                />
            </div>
        </div>
    )
}

export default Header