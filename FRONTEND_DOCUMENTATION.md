# ArogyaMitra Frontend Documentation

## Overview
**ArogyaMitra** is a modern, responsive healthcare web application built with **React.js**. The frontend provides an intuitive user interface for patients, doctors, and ASHA workers to access healthcare services. It features bilingual support (English & Kannada), AI-powered diagnosis, and comprehensive health management tools.

---

## Technical Stack

### Core Technologies
- **Framework**: React.js (v18.3.1)
- **Build Tool**: Vite (v7.1.12) - Fast development and optimized builds
- **Routing**: React Router DOM (v6.24.1)
- **Language**: JavaScript (ES6+)

### Key Libraries & Tools

1. **UI & Styling**
   - `tailwindcss` (v3.4.4) - Utility-first CSS framework
   - `lucide-react` (v0.552.0) - Modern icon library
   - `postcss` (v8.4.39) - CSS processing
   - `autoprefixer` (v10.4.19) - CSS vendor prefixing

2. **Data Visualization**
   - `chart.js` (v4.5.1) - Chart rendering engine
   - `react-chartjs-2` (v5.3.1) - React wrapper for Chart.js

3. **HTTP & API**
   - `axios` (v1.7.2) - HTTP client for API calls

4. **PDF Generation**
   - `jspdf` (v3.0.3) - PDF document generation
   - `jspdf-autotable` (v5.0.2) - Table generation in PDFs
   - `html2canvas` (v1.4.1) - HTML to canvas conversion

5. **User Experience**
   - `react-toastify` (v10.0.5) - Toast notifications
   - Custom language context for bilingual support

6. **Development Tools**
   - `eslint` - Code quality and consistency
   - `@vitejs/plugin-react` - React support in Vite

---

## Project Structure

```
frontend/
├── public/
│   ├── assets/          # Static images and icons
│   └── index.html       # HTML template
├── src/
│   ├── assets/          # Images, logos, icons
│   ├── components/      # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── AIDoctor.jsx
│   │   ├── ConnectionStatus.jsx
│   │   ├── FaceIDRegistration.jsx
│   │   ├── VoiceAssistedRegistration.jsx
│   │   ├── VaccinationManager.jsx
│   │   ├── Header.jsx
│   │   ├── Banner.jsx
│   │   ├── SpecialityMenu.jsx
│   │   ├── TopDoctors.jsx
│   │   ├── RelatedDoctors.jsx
│   │   └── LanguageSwitcher.jsx
│   ├── pages/           # Page components (routes)
│   │   ├── LandingPage.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── RuralAuth.jsx
│   │   ├── UrbanAuth.jsx
│   │   ├── DoctorAuth.jsx
│   │   ├── Doctors.jsx
│   │   ├── Appointment.jsx
│   │   ├── MyAppointments.jsx
│   │   ├── MyProfile.jsx
│   │   ├── RuralDashboard.jsx
│   │   ├── AshaLogin.jsx
│   │   ├── AshaRegister.jsx
│   │   ├── AshaProfile.jsx
│   │   ├── AshaDashboard.jsx
│   │   ├── AshaIndividualReport.jsx
│   │   ├── AshaDistrictReportPDF.jsx
│   │   ├── Statistics.jsx
│   │   ├── RuralStatistics.jsx
│   │   ├── UrbanStatistics.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Careers.jsx
│   │   ├── Helpline.jsx
│   │   ├── Verify.jsx
│   │   └── AuthGateway.jsx
│   ├── context/         # React Context for state management
│   │   └── LanguageContext.jsx
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies and scripts
```

---

## Application Architecture

### 1. Entry Point (`main.jsx`)
**How it works**:
1. Imports React and ReactDOM
2. Wraps app with `BrowserRouter` for routing
3. Wraps with `LanguageProvider` for bilingual support
4. Renders `App` component into root DOM element

```javascript
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </BrowserRouter>
)
```

---

### 2. Main App Component (`App.jsx`)
**Purpose**: Central routing and layout management

**Structure**:
```javascript
<LanguageProvider>
  <div className='mx-4 sm:mx-[10%]'>
    <ToastContainer />        // Notifications
    <ConnectionStatus />      // Network status indicator
    <Navbar />               // Top navigation
    <Routes>                 // All page routes
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<Home />} />
      // ... more routes
    </Routes>
    <Footer />               // Bottom footer
    <AIDoctor />            // Floating AI chatbot
  </div>
</LanguageProvider>
```

**Key Features**:
- **Responsive Layout**: Adapts to mobile, tablet, desktop
- **Persistent Components**: Navbar, Footer, AIDoctor on all pages
- **Dynamic Routing**: 30+ routes for different pages
- **Toast Notifications**: Success/error messages
- **Connection Monitoring**: Shows offline/online status

---

## Core Components

### 1. Navbar (`components/Navbar.jsx`)
**Purpose**: Main navigation bar

**Features**:
- Logo and branding
- Navigation links (Home, Doctors, About, Contact, Helpline)
- User authentication status
- Profile dropdown when logged in
- Language switcher (English ⟷ Kannada)
- Responsive mobile menu

**How it works**:
1. Checks if user is logged in (JWT token in localStorage)
2. Shows "Login" button if not logged in
3. Shows profile picture and dropdown if logged in
4. Dropdown options: My Profile, My Appointments, Logout
5. Mobile: Hamburger menu for small screens

---

### 2. AIDoctor (`components/AIDoctor.jsx`)
**Purpose**: Floating AI chatbot for medical assistance

**Features**:
- Minimized chat button (bottom-right corner)
- Expandable chat interface
- Symptom input (text)
- Image upload for visual symptoms
- AI-powered diagnosis
- Specialist recommendations

**How it works**:
1. User clicks chat icon
2. Chat window opens
3. User describes symptoms
4. Optionally uploads images (rash, wound, etc.)
5. Clicks "Get Diagnosis"
6. Frontend sends data to `/api/ai/diagnose`
7. AI analyzes and returns:
   - Possible conditions
   - Urgency level
   - Recommended specialist
   - Home care tips
   - Warning signs
8. Results displayed in chat

**Technical Implementation**:
```javascript
// Send symptoms and images to backend
const formData = new FormData()
formData.append('symptoms', symptoms)
images.forEach(img => formData.append('images', img))

const response = await axios.post('/api/ai/diagnose', formData)
// Display AI response
```

---

### 3. FaceIDRegistration (`components/FaceIDRegistration.jsx`)
**Purpose**: Face recognition registration for rural users

**Features**:
- Camera access for face capture
- Real-time video preview
- Face detection guidance
- Multiple photo capture
- Base64 encoding for storage

**How it works**:
1. Requests camera permission
2. Shows live video feed
3. User positions face in frame
4. Clicks "Capture" button
5. Converts image to base64
6. Stores in registration form
7. Sends to backend with user data

**Technical Terms**:
- **Base64**: Encoding that converts image to text string
- **MediaDevices API**: Browser API for camera access
- **Canvas**: HTML element for image manipulation

---

### 4. VoiceAssistedRegistration (`components/VoiceAssistedRegistration.jsx`)
**Purpose**: Voice-guided registration for illiterate rural users

**Features**:
- Text-to-speech for instructions
- Voice input for responses
- Step-by-step guidance
- Kannada language support

**How it works**:
1. Speaks instructions in Kannada
2. User responds verbally
3. Speech-to-text converts response
4. Validates input
5. Moves to next field
6. Completes registration

**Technical Terms**:
- **Web Speech API**: Browser API for speech recognition
- **Speech Synthesis**: Text-to-speech conversion
- **Voice Recognition**: Speech-to-text conversion

---

### 5. VaccinationManager (`components/VaccinationManager.jsx`)
**Purpose**: Manage vaccination records

**Features**:
- View all vaccinations
- Add new vaccination
- Update vaccination status
- Track due dates
- Color-coded status (Completed, Pending, Overdue)

**How it works**:
1. Fetches vaccination data from backend
2. Displays in table format
3. User can add new vaccine
4. Calculates next due date
5. Updates backend
6. Refreshes display

---

### 6. LanguageSwitcher (`components/LanguageSwitcher.jsx`)
**Purpose**: Toggle between English and Kannada

**How it works**:
1. Reads current language from context
2. Shows toggle button
3. User clicks to switch
4. Updates context state
5. All text re-renders in new language
6. Saves preference to localStorage

---

## Key Pages

### 1. LandingPage (`pages/LandingPage.jsx`)
**Purpose**: First page users see

**Features**:
- Welcome message in both languages
- Four main options:
  1. ASHA Workers (Rural Healthcare)
  2. Urban Healthcare
  3. Emergency Helpline
  4. Explore Website
- Statistics link
- Modern, colorful design

**User Flow**:
```
Landing Page
├── ASHA Workers → AshaLogin/AshaRegister
├── Urban Healthcare → AuthGateway → Login/Register
├── Helpline → Emergency numbers
└── Explore → Home page
```

---

### 2. Login (`pages/Login.jsx`)
**Purpose**: User authentication

**Features**:
- Email/password login
- Face ID login (rural users)
- Remember me option
- Forgot password link
- Sign up link

**How it works**:
1. User enters email and password
2. Frontend validates input
3. Sends POST to `/api/user/login`
4. Backend verifies credentials
5. Returns JWT token
6. Frontend stores token in localStorage
7. Redirects to home page

**For Rural Users**:
1. User enters Aadhar number
2. Clicks "Face Login"
3. Camera captures face
4. Sends to `/api/user/face-login`
5. Backend verifies
6. Returns token
7. User logged in

---

### 3. Doctors (`pages/Doctors.jsx`)
**Purpose**: Browse and filter doctors

**Features**:
- View all doctors
- Filter by speciality
- Search by name
- Doctor cards with:
  - Photo
  - Name and degree
  - Speciality
  - Experience
  - Fees
  - Availability status
- Click to book appointment

**How it works**:
1. Fetches all doctors from `/api/user/doctors`
2. Displays in grid layout
3. User can filter by speciality
4. Click on doctor card
5. Navigates to appointment page

---

### 4. Appointment (`pages/Appointment.jsx`)
**Purpose**: Book appointment with doctor

**Features**:
- Doctor details
- Available time slots
- Date picker
- Time slot selection
- Booking confirmation
- Payment integration

**How it works**:
1. Shows doctor information
2. Displays next 7 days
3. Shows available time slots
4. User selects date and time
5. Clicks "Book Appointment"
6. Sends to `/api/user/book-appointment`
7. Redirects to payment
8. After payment, appointment confirmed

**Time Slot Logic**:
```javascript
// Generate time slots (10 AM - 9 PM)
const slots = []
for (let hour = 10; hour < 21; hour++) {
  slots.push(`${hour}:00`)
  slots.push(`${hour}:30`)
}
// Filter out booked slots
const available = slots.filter(slot => 
  !doctor.slots_booked[selectedDate]?.includes(slot)
)
```

---

### 5. MyAppointments (`pages/MyAppointments.jsx`)
**Purpose**: View user's appointments

**Features**:
- List of all appointments
- Past and upcoming
- Appointment details:
  - Doctor name and photo
  - Date and time
  - Status (Pending, Completed, Cancelled)
  - Payment status
- Cancel appointment option
- Pay online option

**How it works**:
1. Fetches appointments from `/api/user/appointments`
2. Displays in list format
3. User can cancel unpaid appointments
4. User can pay for pending appointments
5. Shows completed appointments

---

### 6. MyProfile (`pages/MyProfile.jsx`)
**Purpose**: User profile management

**Features**:
- View profile information
- Edit mode
- Update:
  - Name
  - Phone
  - Address
  - Date of birth
  - Gender
  - Profile picture
- Save changes

**How it works**:
1. Fetches user data from `/api/user/profile`
2. Displays in form
3. User clicks "Edit"
4. Fields become editable
5. User makes changes
6. Clicks "Save"
7. Sends to `/api/user/update-profile`
8. Updates database
9. Shows success message

---

### 7. RuralDashboard (`pages/RuralDashboard.jsx`)
**Purpose**: Dashboard for rural users

**Features**:
- UHID display
- Health records summary
- Vaccination status
- Upcoming appointments
- Quick actions:
  - Book appointment
  - View health records
  - Update vaccinations
  - Contact ASHA worker

**How it works**:
1. Fetches user data and health records
2. Displays key information
3. Shows vaccination chart
4. Lists upcoming appointments
5. Provides quick action buttons

---

### 8. AshaDashboard (`pages/AshaDashboard.jsx`)
**Purpose**: Dashboard for ASHA workers

**Features**:
- List of rural users in area
- Vaccination coverage statistics
- Health record access
- Report generation
- User registration

**How it works**:
1. Fetches rural users by district
2. Shows user list with UHID
3. Displays vaccination statistics
4. ASHA can:
   - View individual health records
   - Update vaccination status
   - Generate reports
   - Register new users

---

### 9. Statistics Pages
**Purpose**: Data visualization and insights

**Three Pages**:
1. **Statistics.jsx**: Overall statistics
2. **RuralStatistics.jsx**: Rural healthcare data
3. **UrbanStatistics.jsx**: Urban healthcare data

**Features**:
- Charts and graphs (Chart.js)
- User counts
- Appointment statistics
- Vaccination coverage
- District-wise breakdown
- Interactive visualizations

**Chart Types Used**:
- Bar charts for comparisons
- Line charts for trends
- Pie charts for distributions
- Doughnut charts for percentages

---

### 10. AshaIndividualReport (`pages/AshaIndividualReport.jsx`)
**Purpose**: Detailed health report for individual

**Features**:
- Complete health profile
- Vaccination history
- Medical conditions
- Visit history
- PDF export

**How it works**:
1. Fetches user health record
2. Displays all information
3. User clicks "Download PDF"
4. Uses jsPDF to generate PDF
5. Includes:
   - User details
   - Health metrics
   - Vaccination table
   - Visit history
6. Downloads to device

---

## State Management

### Context API (`context/LanguageContext.jsx`)
**Purpose**: Global state for language preference

**How it works**:
1. Creates React Context
2. Provides language state to all components
3. Stores current language (en/kn)
4. Provides translation function `t(key)`
5. Saves to localStorage

**Usage in Components**:
```javascript
import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

function MyComponent() {
  const { t, language, toggleLanguage } = useContext(LanguageContext)
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>  // Shows "HOME" or "ಮುಖಪುಟ"
      <button onClick={toggleLanguage}>Switch Language</button>
    </div>
  )
}
```

**Translation Object**:
```javascript
const translations = {
  en: {
    'nav.home': 'HOME',
    'nav.doctors': 'ALL DOCTORS',
    // ... more translations
  },
  kn: {
    'nav.home': 'ಮುಖಪುಟ',
    'nav.doctors': 'ಎಲ್ಲಾ ವೈದ್ಯರು',
    // ... more translations
  }
}
```

---

## API Integration

### Axios Configuration
**Base URL**: Set in `.env` file

```javascript
// .env
VITE_BACKEND_URL=http://localhost:4000
```

**API Calls**:
```javascript
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

// Example: Login
const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/user/login`,
      { email, password }
    )
    
    if (response.data.success) {
      localStorage.setItem('token', response.data.token)
      return true
    }
  } catch (error) {
    console.error(error)
    return false
  }
}
```

---

## Authentication Flow

### Token-Based Authentication

**Login Process**:
1. User enters credentials
2. Frontend sends to backend
3. Backend validates and returns JWT token
4. Frontend stores token in localStorage
5. Token included in all subsequent requests

**Protected Routes**:
```javascript
// Check if user is logged in
const token = localStorage.getItem('token')
if (!token) {
  navigate('/login')  // Redirect to login
}
```

**API Request with Token**:
```javascript
const response = await axios.post(
  `${backendUrl}/api/user/profile`,
  { userId },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
```

---

## Responsive Design

### Tailwind CSS Breakpoints
- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `md:` (≥ 768px), `lg:` (≥ 1024px)

**Example**:
```javascript
<div className="
  w-full           // Full width on mobile
  sm:w-1/2         // Half width on tablet
  lg:w-1/3         // One-third width on desktop
  p-4              // Padding on all sides
  sm:p-6           // More padding on tablet+
">
  Content
</div>
```

---

## Build & Deployment

### Development
```bash
npm run dev
```
- Starts Vite dev server
- Hot module replacement (instant updates)
- Runs on `http://localhost:5173`

### Production Build
```bash
npm run build
```
- Optimizes code
- Minifies JavaScript and CSS
- Creates `dist/` folder
- Ready for deployment

### Preview Production Build
```bash
npm run preview
```
- Tests production build locally

---

## Key Features Implemented

### 1. **Bilingual Support**
- English and Kannada
- Seamless switching
- Persistent preference
- Covers entire UI

### 2. **Dual User Types**
- **Rural Users**: Face ID, voice assistance, UHID
- **Urban Users**: Traditional email/password

### 3. **AI Medical Assistant**
- Symptom analysis
- Image-based diagnosis
- Specialist recommendations
- 24/7 availability

### 4. **Appointment System**
- Browse doctors
- Filter by speciality
- Book time slots
- Online payment
- Appointment management

### 5. **Health Records**
- Complete medical history
- Vaccination tracking
- Document uploads
- Visit records

### 6. **ASHA Worker Portal**
- Rural user management
- Vaccination tracking
- Report generation
- Statistics dashboard

### 7. **Statistics & Analytics**
- Data visualization
- Charts and graphs
- Rural vs Urban comparison
- District-wise breakdown

### 8. **PDF Generation**
- Health reports
- Vaccination records
- Appointment summaries
- Downloadable documents

---

## User Experience Features

### 1. **Toast Notifications**
```javascript
import { toast } from 'react-toastify'

// Success message
toast.success('Appointment booked successfully!')

// Error message
toast.error('Failed to book appointment')

// Info message
toast.info('Please complete your profile')
```

### 2. **Loading States**
```javascript
const [loading, setLoading] = useState(false)

const fetchData = async () => {
  setLoading(true)
  // API call
  setLoading(false)
}

return loading ? <Spinner /> : <Content />
```

### 3. **Form Validation**
```javascript
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const handleSubmit = (e) => {
  e.preventDefault()
  if (!validateEmail(email)) {
    toast.error('Invalid email')
    return
  }
  // Submit form
}
```

---

## Performance Optimizations

### 1. **Lazy Loading**
```javascript
import { lazy, Suspense } from 'react'

const Statistics = lazy(() => import('./pages/Statistics'))

<Suspense fallback={<Loading />}>
  <Statistics />
</Suspense>
```

### 2. **Image Optimization**
- Cloudinary CDN for fast delivery
- Responsive images
- Lazy loading images

### 3. **Code Splitting**
- Vite automatically splits code
- Smaller initial bundle
- Faster page loads

---

## Accessibility Features

1. **Keyboard Navigation**: All interactive elements accessible via keyboard
2. **ARIA Labels**: Screen reader support
3. **Color Contrast**: WCAG compliant colors
4. **Font Sizes**: Readable text sizes
5. **Voice Assistance**: For illiterate users

---

## Browser Compatibility

**Supported Browsers**:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Required Features**:
- ES6+ JavaScript
- CSS Grid & Flexbox
- LocalStorage
- Camera API (for Face ID)
- Speech API (for voice features)

---

## Environment Variables

```
VITE_BACKEND_URL=http://localhost:4000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

**Usage**:
```javascript
const backendUrl = import.meta.env.VITE_BACKEND_URL
```

---

## Complete User Journey

### Example: Rural User Books Appointment

1. **Landing Page**: User clicks "ASHA Workers"
2. **Rural Auth**: User chooses Face ID login
3. **Face Capture**: Camera captures face
4. **Login**: Authenticated with Aadhar + Face
5. **Rural Dashboard**: Sees UHID and health summary
6. **Browse Doctors**: Clicks "Book Appointment"
7. **Doctor List**: Filters by speciality
8. **Select Doctor**: Clicks on doctor card
9. **Choose Slot**: Selects date and time
10. **Confirm**: Books appointment
11. **Payment**: Pays via Razorpay
12. **Confirmation**: Receives booking confirmation
13. **My Appointments**: Can view appointment details

---

## Data Flow Example

### Booking Appointment

```
User Interface (Appointment.jsx)
    ↓
User selects date and time
    ↓
Click "Book Appointment"
    ↓
JavaScript function bookAppointment()
    ↓
Axios POST to /api/user/book-appointment
    ↓
Backend processes request
    ↓
Database updated
    ↓
Response sent back
    ↓
Frontend receives response
    ↓
Toast notification shown
    ↓
Navigate to payment page
    ↓
Payment processed
    ↓
Navigate to My Appointments
```

---

## Summary

The **ArogyaMitra Frontend** is a modern, user-friendly healthcare platform built with:
- **React.js** for component-based UI
- **Vite** for fast development
- **Tailwind CSS** for beautiful styling
- **Axios** for API communication
- **Chart.js** for data visualization
- **jsPDF** for report generation

**Key Strengths**:
1. **Bilingual Support**: English & Kannada
2. **Accessibility**: Face ID, voice assistance
3. **Responsive Design**: Works on all devices
4. **AI Integration**: Smart medical assistance
5. **Comprehensive Features**: Appointments, health records, vaccinations
6. **User-Friendly**: Intuitive navigation and design
7. **Performance**: Fast loading and smooth interactions

The frontend seamlessly connects with the backend to provide a complete healthcare solution for both rural and urban India.
