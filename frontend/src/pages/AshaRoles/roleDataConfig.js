// Configuration data for all ASHA roles
export const roleDataConfig = {
  'community-mobilization': {
    title: 'Community Mobilization',
    subtitle: 'Building Healthier Communities Together',
    description: 'Empowering communities through awareness, education, and collective action',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    overview: {
      main: 'Community mobilization is the cornerstone of ASHA workers\' responsibilities. It involves engaging with community members, creating awareness about health issues, and motivating them to take collective action for better health outcomes.',
      points: [
        { title: 'Health Awareness', desc: 'Educating communities about diseases, prevention, and healthy practices' },
        { title: 'Community Participation', desc: 'Encouraging active involvement in health programs' },
        { title: 'Behavioral Change', desc: 'Promoting adoption of healthy behaviors' }
      ]
    },
    activities: [
      { title: 'Health Campaigns', desc: 'Organizing awareness campaigns on sanitation, nutrition, and immunization', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
      { title: 'Community Meetings', desc: 'Facilitating village health meetings and planning interventions', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      { title: 'IEC Activities', desc: 'Using creative methods like street plays to spread health messages', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
      { title: 'Social Determinants', desc: 'Addressing water, sanitation, and housing issues', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
      { title: 'Health Planning', desc: 'Involving community in identifying health priorities', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
      { title: 'Capacity Building', desc: 'Training volunteers and forming health committees', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
    ],
    stories: [
      { title: 'Sanitation Success', desc: 'ASHA worker achieved 100% toilet coverage through community mobilization', achievement: '100% Coverage', color: 'blue' },
      { title: 'Immunization Drive', desc: 'Achieved 95% immunization through persistent campaigns', achievement: '95% Coverage', color: 'green' }
    ]
  },
  'health-services': {
    title: 'Health Services',
    subtitle: 'Delivering Essential Healthcare',
    description: 'Providing basic healthcare services at the grassroots level',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    overview: {
      main: 'ASHA workers serve as the first point of contact for healthcare in rural areas, providing basic services, distributing medicines, and facilitating timely referrals.',
      points: [
        { title: 'First Aid', desc: 'Immediate care for minor injuries and ailments' },
        { title: 'Medicine Distribution', desc: 'Dispensing essential medicines' },
        { title: 'Immunization', desc: 'Facilitating vaccination programs' }
      ]
    },
    activities: [
      { title: 'Basic Treatment', desc: 'First aid for fever, diarrhea, and minor wounds', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
      { title: 'ORS Distribution', desc: 'Distributing and educating about ORS use', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
      { title: 'Immunization Camps', desc: 'Organizing vaccination camps', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
      { title: 'Health Checkups', desc: 'Basic health screening and monitoring', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
      { title: 'Referral Services', desc: 'Facilitating referrals to health facilities', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
      { title: 'Follow-up Care', desc: 'Post-discharge monitoring and care', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' }
    ],
    stories: [
      { title: 'Life Saved', desc: 'Quick ORS administration saved a child', achievement: 'Timely Intervention', color: 'red' },
      { title: 'Full Coverage', desc: '100% immunization achieved in village', achievement: '100% Coverage', color: 'green' }
    ]
  },
  'emergency-response': {
    title: 'Emergency Response',
    subtitle: 'First Responders in Emergencies',
    description: 'Critical link in emergency healthcare',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    overview: {
      main: 'ASHA workers provide immediate assistance during emergencies, coordinate with facilities, and ensure timely access to care.',
      points: [
        { title: 'Rapid Response', desc: 'Immediate action in emergencies' },
        { title: 'Emergency Referrals', desc: 'Quick transport arrangements' },
        { title: 'Crisis Management', desc: 'Outbreak coordination' }
      ]
    },
    activities: [
      { title: 'Emergency ID', desc: 'Recognizing emergency symptoms', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
      { title: 'First Aid', desc: 'Emergency first aid provision', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
      { title: 'Transport', desc: 'Emergency transport arrangement', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
      { title: 'Maternal Emergency', desc: 'Obstetric emergency response', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
      { title: 'Disaster Response', desc: 'Emergency services in disasters', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
      { title: '24/7 Available', desc: 'Round-the-clock emergency support', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
    ],
    stories: [
      { title: 'Maternal Life Saved', desc: 'Quick response saved mother and child', achievement: 'Lives Saved', color: 'red' },
      { title: 'Snake Bite', desc: 'Timely first aid prevented death', achievement: 'Death Prevented', color: 'orange' }
    ]
  },
  'maternal-child-health': {
    title: 'Maternal & Child Health',
    subtitle: 'Nurturing Mothers and Children',
    description: 'Comprehensive maternal and child healthcare',
    icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    overview: {
      main: 'ASHA workers improve maternal and child health through counseling, delivery facilitation, and nutrition promotion.',
      points: [
        { title: 'Antenatal Care', desc: 'Supporting pregnant women' },
        { title: 'Safe Delivery', desc: 'Institutional delivery facilitation' },
        { title: 'Child Nutrition', desc: 'Breastfeeding and nutrition' }
      ]
    },
    activities: [
      { title: 'Pregnancy Registration', desc: 'Early identification and registration', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
      { title: 'Antenatal Counseling', desc: 'Pregnancy care counseling', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
      { title: 'Delivery Assistance', desc: 'Accompanying to health facilities', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
      { title: 'Postnatal Care', desc: 'Post-delivery home visits', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { title: 'Breastfeeding', desc: 'Promoting exclusive breastfeeding', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
      { title: 'Child Immunization', desc: 'Ensuring timely vaccinations', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
    ],
    stories: [
      { title: 'Zero Deaths', desc: '3 years of zero maternal deaths', achievement: 'Zero Deaths', color: 'green' },
      { title: 'Malnutrition Reduced', desc: '65% reduction in malnutrition', achievement: '65% Reduction', color: 'blue' }
    ]
  },
  'health-records': {
    title: 'Health Records',
    subtitle: 'Maintaining Health Data',
    description: 'Systematic health documentation',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    overview: {
      main: 'ASHA workers maintain comprehensive village health records for planning, monitoring, and evaluation.',
      points: [
        { title: 'Village Register', desc: 'Detailed household records' },
        { title: 'Disease Surveillance', desc: 'Tracking disease trends' },
        { title: 'Digital Records', desc: 'Mobile app data entry' }
      ]
    },
    activities: [
      { title: 'Household Survey', desc: 'Comprehensive demographic surveys', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { title: 'Birth Registration', desc: 'Recording all births', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
      { title: 'Death Recording', desc: 'Documenting deaths with causes', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
      { title: 'Disease Tracking', desc: 'Maintaining disease registers', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
      { title: 'Service Records', desc: 'Documenting all services provided', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { title: 'Digital Reporting', desc: 'Real-time digital data entry', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' }
    ],
    stories: [
      { title: 'Outbreak Prevented', desc: 'Early detection prevented epidemic', achievement: 'Epidemic Prevented', color: 'orange' },
      { title: 'Digital First', desc: '70% faster reporting achieved', achievement: '70% Faster', color: 'blue' }
    ]
  },
  'medicine-distribution': {
    title: 'Medicine Distribution',
    subtitle: 'Ensuring Medicine Access',
    description: 'Distributing essential medicines',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    overview: {
      main: 'ASHA workers ensure essential medicines reach every household, maintaining proper storage and educating about usage.',
      points: [
        { title: 'Medicine Supply', desc: 'Distributing essential drugs' },
        { title: 'Proper Storage', desc: 'Appropriate storage conditions' },
        { title: 'Usage Education', desc: 'Correct dosage teaching' }
      ]
    },
    activities: [
      { title: 'ORS Distribution', desc: 'Distributing ORS packets', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
      { title: 'Iron Tablets', desc: 'Distributing iron supplements', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
      { title: 'Contraceptives', desc: 'Family planning commodities', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
      { title: 'Deworming', desc: 'Deworming tablet distribution', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
      { title: 'First Aid Supplies', desc: 'Maintaining emergency supplies', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
      { title: 'Inventory Management', desc: 'Stock tracking and ordering', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' }
    ],
    stories: [
      { title: 'Anemia Reduced', desc: 'Iron distribution reduced anemia by 60%', achievement: '60% Reduction', color: 'red' },
      { title: 'Zero Stockouts', desc: 'Perfect inventory management achieved', achievement: 'Zero Stockouts', color: 'green' }
    ]
  }
}
