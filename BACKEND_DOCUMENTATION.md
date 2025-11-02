# ArogyaMitra Backend Documentation

## Overview
**ArogyaMitra** is a comprehensive healthcare platform designed to bridge the gap between rural and urban healthcare in India. The backend is built using **Node.js** and **Express.js**, providing RESTful APIs for the entire application.

---

## Technical Stack

### Core Technologies
- **Runtime Environment**: Node.js
- **Web Framework**: Express.js (v4.19.2)
- **Database**: MongoDB with Mongoose ODM (v8.5.1)
- **Language**: JavaScript (ES6 Modules)

### Key Dependencies
1. **Authentication & Security**
   - `bcrypt` (v5.1.1) - Password hashing and encryption
   - `jsonwebtoken` (v9.0.2) - JWT token generation for user sessions
   - `validator` (v13.12.0) - Email and data validation

2. **AI & Machine Learning**
   - `@google/generative-ai` (v0.24.1) - Google's Gemini AI for medical triage

3. **Payment Integration**
   - `razorpay` (v2.9.4) - Indian payment gateway
   - `stripe` (v16.5.0) - International payment gateway

4. **File Management**
   - `cloudinary` (v2.3.0) - Cloud storage for images and documents
   - `multer` (v1.4.5-lts.1) - File upload handling

5. **Utilities**
   - `cors` (v2.8.5) - Cross-Origin Resource Sharing
   - `dotenv` (v16.4.5) - Environment variable management
   - `nodemon` (v3.1.4) - Development server auto-restart

---

## Project Structure

```
backend/
├── config/
│   ├── mongodb.js          # Database connection configuration
│   └── cloudinary.js       # Cloudinary setup for file storage
├── controllers/
│   ├── userController.js   # User authentication and profile management
│   ├── doctorController.js # Doctor operations and availability
│   ├── adminController.js  # Admin panel operations
│   ├── aiController.js     # AI-powered medical diagnosis
│   ├── ashaController.js   # ASHA worker operations
│   └── healthRecordController.js # Health records management
├── models/
│   ├── userModel.js        # User schema definition
│   ├── doctorModel.js      # Doctor schema definition
│   ├── appointmentModel.js # Appointment schema definition
│   ├── ashaModel.js        # ASHA worker schema definition
│   └── healthRecordModel.js # Health record schema definition
├── middleware/
│   └── authMiddleware.js   # JWT authentication middleware
├── routes/
│   ├── userRoute.js        # User-related endpoints
│   ├── doctorRoute.js      # Doctor-related endpoints
│   ├── adminRoute.js       # Admin-related endpoints
│   ├── aiRoute.js          # AI diagnosis endpoints
│   ├── ashaRoute.js        # ASHA worker endpoints
│   ├── appointmentRoute.js # Appointment endpoints
│   └── healthRecordRoute.js # Health record endpoints
├── .env                    # Environment variables (API keys, secrets)
├── server.js               # Main application entry point
└── package.json            # Dependencies and scripts
```

---

## Database Architecture

### Database: MongoDB
**Database Name**: `ArogyaMitra`

The application uses **MongoDB**, a NoSQL document database, which stores data in flexible JSON-like documents. This is perfect for healthcare data that can vary between users.

### Database Connection
**File**: `config/mongodb.js`

```javascript
// Connects to MongoDB using Mongoose
mongoose.connect(`${process.env.MONGODB_URI}/ArogyaMitra`)
```

**How it works**:
1. The connection string is stored in the `.env` file for security
2. Mongoose creates a connection to MongoDB Atlas (cloud database)
3. Once connected, the application can perform CRUD operations (Create, Read, Update, Delete)

---

## Database Models (Schemas)

### 1. User Model (`userModel.js`)
Stores information about patients (both rural and urban users).

**Key Fields**:
- `name`: User's full name
- `email`: Unique email address for login
- `aadhar`: 12-digit Aadhar number (Indian ID)
- `uhid`: **Unique Health ID** (16 characters)
  - Format: `Aadhar(12 digits) + RH/UH(2 chars) + Random(2 digits)`
  - Example: `123456789012RH45` (Rural) or `123456789012UH67` (Urban)
- `password`: Encrypted password using bcrypt
- `faceData`: Base64 encoded face image for rural users (Face ID login)
- `isRuralUser`: Boolean flag to identify rural vs urban users
- `village`, `district`, `state`: Location information for rural users
- `phone`, `address`, `gender`, `dob`: Personal information
- `image`: Profile picture URL (stored in Cloudinary)

**Purpose**: Manages user authentication and profile data for both rural and urban patients.

---

### 2. Doctor Model (`doctorModel.js`)
Stores information about registered doctors.

**Key Fields**:
- `name`, `email`, `password`: Basic credentials
- `image`: Doctor's profile photo
- `speciality`: Medical specialization (e.g., Cardiologist, Dermatologist)
- `degree`: Medical qualifications (e.g., MBBS, MD)
- `experience`: Years of practice
- `about`: Doctor's bio/description
- `fees`: Consultation fee
- `available`: Boolean - whether accepting appointments
- `slots_booked`: Object storing booked appointment slots
  - Format: `{ "2024-01-15": ["10:00 AM", "2:00 PM"] }`
- `address`: Clinic/hospital location
- `date`: Registration timestamp

**Purpose**: Manages doctor profiles and appointment availability.

---

### 3. Appointment Model (`appointmentModel.js`)
Stores all appointment bookings.

**Key Fields**:
- `userId`: Reference to the patient
- `docId`: Reference to the doctor
- `slotDate`: Appointment date
- `slotTime`: Appointment time
- `userData`: Snapshot of user data at booking time
- `docData`: Snapshot of doctor data at booking time
- `amount`: Consultation fee
- `payment`: Boolean - payment status
- `cancelled`: Boolean - cancellation status
- `isCompleted`: Boolean - appointment completion status
- `date`: Booking timestamp

**Purpose**: Tracks all appointments between patients and doctors.

---

### 4. ASHA Worker Model (`ashaModel.js`)
Stores information about ASHA (Accredited Social Health Activist) workers.

**Key Fields**:
- `name`, `email`, `password`: Basic credentials
- `phone`: Contact number
- `village1`, `village2`, `village3`: Multiple villages they serve
- `subcenter`, `block`, `district`, `state`: Administrative hierarchy
- `dateOfJoining`: When they joined the program
- `idNumber`: Government-issued ASHA ID
- `image`: Profile photo
- `gender`, `address`: Personal information

**Purpose**: Manages ASHA workers who provide healthcare in rural areas.

---

### 5. Health Record Model (`healthRecordModel.js`)
Stores comprehensive health records for users.

**Key Fields**:
- `userId`: Reference to the user
- `userName`, `userEmail`, `uhid`: User identification
- `village`, `district`, `state`: Location
- `bloodGroup`, `height`, `weight`: Basic health metrics
- `medicalConditions`: Chronic diseases or conditions
- `allergies`: Known allergies
- `currentMedications`: Ongoing medications
- `vaccinationStatus`: Overall vaccination status
- `vaccinations`: Array of vaccination records
  - Each record: `{ name, status, date, nextDueDate }`
- `documents`: Array of uploaded medical documents
  - Each document: `{ name, url, uploadDate }`
- `visits`: Array of doctor/ASHA visits
  - Each visit: `{ date, reason, diagnosis, prescription, ashaWorker }`

**Purpose**: Maintains complete medical history and vaccination records.

---

## API Endpoints & Controllers

### 1. User Controller (`userController.js`)

#### **User Registration** (`/api/user/register`)
**How it works**:
1. Receives user data (name, email, password, aadhar)
2. Validates email format and password strength
3. Checks if Aadhar is 12 digits
4. Generates a unique UHID (16 characters)
5. Hashes the password using bcrypt (10 salt rounds)
6. Saves user to database
7. Creates a JWT token for automatic login
8. Returns token and UHID to frontend

**Technical Terms**:
- **Hashing**: Converting password into an encrypted string that cannot be reversed
- **JWT (JSON Web Token)**: A secure token that proves user identity
- **Salt Rounds**: Number of times the hashing algorithm runs (more = more secure)

---

#### **User Login** (`/api/user/login`)
**How it works**:
1. Receives email and password
2. Finds user in database by email
3. Compares provided password with hashed password using bcrypt
4. If match, generates JWT token
5. Returns token to frontend for session management

---

#### **Face ID Login** (`/api/user/face-login`)
**How it works** (for rural users):
1. Receives face data (base64 image) and Aadhar number
2. Finds user by Aadhar number
3. Verifies user has registered face data
4. Generates JWT token for login
5. Returns token to frontend

**Note**: Currently uses Aadhar verification. In production, would use face-matching AI.

---

#### **Book Appointment** (`/api/user/book-appointment`)
**How it works**:
1. Receives userId, docId, slotDate, slotTime
2. Checks if doctor is available
3. Checks if the time slot is already booked
4. If available, adds the slot to doctor's booked slots
5. Creates appointment record with user and doctor data
6. Saves to database
7. Returns success message

---

#### **Payment Processing**
**Razorpay** (`/api/user/payment-razorpay`):
1. Creates payment order with Razorpay API
2. Returns order details to frontend
3. Frontend shows payment interface
4. After payment, verifies with Razorpay
5. Updates appointment payment status

**Stripe** (`/api/user/payment-stripe`):
1. Creates Stripe checkout session
2. Redirects user to Stripe payment page
3. After payment, Stripe redirects back
4. Verifies payment and updates database

---

### 2. Doctor Controller (`doctorController.js`)

#### **Doctor Login** (`/api/doctor/login`)
**How it works**:
1. Receives email and password
2. Finds doctor in database
3. Compares password with hashed password
4. Generates JWT token
5. Returns token for doctor dashboard access

---

#### **Get Doctor Appointments** (`/api/doctor/appointments`)
**How it works**:
1. Receives doctor ID from JWT token
2. Queries all appointments for this doctor
3. Returns list with patient details
4. Sorted by date and time

---

#### **Mark Appointment Complete** (`/api/doctor/complete-appointment`)
**How it works**:
1. Receives appointment ID
2. Updates `isCompleted` field to true
3. Doctor can add notes/prescription
4. Saves to database

---

### 3. AI Controller (`aiController.js`)

#### **AI Medical Diagnosis** (`/api/ai/diagnose`)
**How it works**:
1. Receives symptoms text and optional images
2. Builds a structured prompt for Google's Gemini AI
3. Sends symptoms and images to Gemini API
4. AI analyzes and returns:
   - Possible conditions (hypotheses)
   - Urgency level (emergency, urgent, soon, routine)
   - Recommended medical speciality
   - Home care suggestions
   - Red flags to watch for
   - Medical disclaimer
5. Returns JSON response to frontend

**Technical Terms**:
- **Gemini AI**: Google's advanced AI model for text and image analysis
- **Prompt Engineering**: Crafting specific instructions for AI to get accurate results
- **JSON Response**: Structured data format for easy frontend processing
- **Safety Settings**: Filters to block harmful or inappropriate AI responses

**Example Flow**:
```
User Input: "I have fever and headache for 3 days"
↓
AI Analysis: Analyzes symptoms
↓
AI Response: {
  "conditionHypotheses": [
    {"name": "Viral Fever", "rationale": "Common symptoms match"}
  ],
  "urgency": "soon",
  "recommendedSpeciality": "General Physician",
  "homeCare": "Rest, hydration, monitor temperature",
  "redFlags": ["High fever >103°F", "Severe headache"],
  "disclaimer": "This is not medical advice. Consult a doctor."
}
```

---

### 4. ASHA Controller (`ashaController.js`)

#### **ASHA Registration** (`/api/asha/register`)
**How it works**:
1. Receives ASHA worker details
2. Validates email and phone
3. Hashes password
4. Saves to database
5. Returns success message

---

#### **Get Rural Users** (`/api/asha/rural-users`)
**How it works**:
1. ASHA worker requests list of rural users in their area
2. Filters users by district/village
3. Returns list with health records
4. Used for tracking and reporting

---

### 5. Health Record Controller (`healthRecordController.js`)

#### **Create Health Record** (`/api/health/create`)
**How it works**:
1. Receives user ID and health data
2. Creates new health record document
3. Saves to database
4. Returns record ID

---

#### **Update Vaccination** (`/api/health/update-vaccination`)
**How it works**:
1. Receives vaccination details (name, date, status)
2. Finds user's health record
3. Adds/updates vaccination in array
4. Calculates next due date
5. Saves to database

---

## Middleware

### Authentication Middleware (`authMiddleware.js`)
**Purpose**: Protects routes that require login

**How it works**:
1. Checks if request has JWT token in headers
2. Verifies token using JWT secret key
3. Decodes token to get user ID
4. Attaches user ID to request object
5. Allows request to proceed to controller
6. If no token or invalid token, returns error

**Usage**: Applied to routes like `/api/user/profile`, `/api/doctor/appointments`

---

## Server Configuration (`server.js`)

**Main Application File**

**How it works**:
1. **Import Dependencies**: Loads Express, CORS, routes
2. **Initialize App**: Creates Express application
3. **Connect Database**: Calls `connectDB()` to connect to MongoDB
4. **Connect Cloudinary**: Initializes cloud storage
5. **Apply Middleware**:
   - `express.json()`: Parses JSON request bodies
   - `cors()`: Allows frontend to make requests from different domain
6. **Register Routes**: Maps URL paths to route handlers
   - `/api/user` → userRouter
   - `/api/doctor` → doctorRouter
   - `/api/admin` → adminRouter
   - `/api/ai` → aiRouter
   - `/api/asha` → ashaRouter
   - `/api/health` → healthRecordRouter
   - `/api/appointment` → appointmentRouter
7. **Start Server**: Listens on port 4000 (or environment variable)

---

## Environment Variables (`.env`)

**Security Configuration**

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
JWT_SECRET=your_secret_key_for_tokens
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_API_KEY=your_gemini_api_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=your_stripe_secret
CURRENCY=INR
PORT=4000
```

**Why Environment Variables?**
- Keeps sensitive data (passwords, API keys) out of code
- Different values for development and production
- Easy to change without modifying code

---

## How the Backend Works - Complete Flow

### Example: User Books an Appointment

1. **User Action**: User clicks "Book Appointment" on frontend
2. **Frontend**: Sends POST request to `/api/user/book-appointment`
   - Headers: JWT token for authentication
   - Body: `{ userId, docId, slotDate, slotTime }`
3. **Server**: Request reaches `server.js`
4. **Routing**: Express routes to `userRouter`
5. **Middleware**: `authMiddleware` verifies JWT token
6. **Controller**: `bookAppointment` function executes:
   - Queries doctor from database
   - Checks availability
   - Checks slot availability
   - Updates doctor's booked slots
   - Creates appointment record
   - Saves to MongoDB
7. **Response**: Sends success/error back to frontend
8. **Frontend**: Shows confirmation message to user

---

## Data Flow Diagram

```
User (Browser)
    ↓ HTTP Request (JSON)
Frontend (React)
    ↓ API Call with JWT
Backend Server (Express)
    ↓ Route Matching
Middleware (Auth Check)
    ↓ Token Verified
Controller (Business Logic)
    ↓ Database Query
MongoDB (Data Storage)
    ↓ Data Retrieved
Controller (Process Data)
    ↓ JSON Response
Frontend (Update UI)
    ↓ Display to User
User (Browser)
```

---

## Key Features Implemented

### 1. **Dual Authentication System**
- **Urban Users**: Email + Password login
- **Rural Users**: Face ID + Aadhar login (for illiterate users)

### 2. **Unique Health ID (UHID)**
- Automatically generated 16-character ID
- Format: Aadhar(12) + RH/UH(2) + Random(2)
- Ensures every user has a unique identifier

### 3. **AI-Powered Diagnosis**
- Uses Google's Gemini AI
- Analyzes symptoms and images
- Provides medical triage (not diagnosis)
- Recommends appropriate specialist

### 4. **Multi-Gateway Payments**
- Razorpay for Indian users
- Stripe for international users
- Secure payment verification

### 5. **Vaccination Tracking**
- Complete vaccination history
- Due date calculations
- Status tracking (Completed, Pending, Overdue)

### 6. **ASHA Worker System**
- Dedicated portal for rural health workers
- Track multiple villages
- Generate health reports
- Monitor vaccination coverage

---

## Security Measures

1. **Password Hashing**: bcrypt with 10 salt rounds
2. **JWT Authentication**: Secure token-based sessions
3. **Environment Variables**: Sensitive data protected
4. **CORS**: Controlled cross-origin access
5. **Input Validation**: validator library for email/data
6. **Aadhar Validation**: 12-digit format check

---

## Scalability & Performance

1. **MongoDB Indexing**: Fast queries on email, uhid, aadhar
2. **Cloudinary CDN**: Fast image delivery worldwide
3. **Async/Await**: Non-blocking database operations
4. **Error Handling**: Try-catch blocks prevent crashes
5. **Modular Architecture**: Easy to add new features

---

## How to Run the Backend

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment**:
   - Create `.env` file
   - Add all required API keys and secrets

3. **Start Server**:
   ```bash
   npm start        # Production
   npm run server   # Development (with nodemon)
   ```

4. **Server Running**: Backend listens on `http://localhost:4000`

---

## API Testing

You can test APIs using:
- **Postman**: GUI tool for API testing
- **Thunder Client**: VS Code extension
- **cURL**: Command-line tool

**Example API Call**:
```bash
POST http://localhost:4000/api/user/register
Headers: Content-Type: application/json
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "aadhar": "123456789012"
}
```

---

## Summary

The **ArogyaMitra Backend** is a robust, scalable healthcare API built with:
- **Node.js & Express** for server
- **MongoDB** for flexible data storage
- **JWT** for secure authentication
- **AI Integration** for smart diagnosis
- **Payment Gateways** for transactions
- **Cloud Storage** for files

It serves as the backbone for connecting rural and urban healthcare, managing appointments, health records, and providing AI-powered medical assistance.
