# AIVaidya - Gemini API Integration Guide

## Overview
AIVaidya is an AI-powered medical triage assistant that uses Google's Gemini API with advanced ML algorithms to predict diseases and suggest appropriate doctors to consult. This is **NOT** a medical diagnosis tool but a guidance system to help users understand their symptoms better.

---

## Features
✅ **Symptom Analysis** - Analyzes user-described symptoms using natural language processing  
✅ **Image Recognition** - Supports up to 3 medical images for visual symptom analysis  
✅ **Condition Hypotheses** - Provides likelihood-ranked possible conditions  
✅ **Specialist Recommendations** - Suggests which type of doctor to consult  
✅ **Urgency Assessment** - Categorizes urgency (emergency, urgent, soon, routine)  
✅ **Home Care Advice** - Provides safe home care recommendations  
✅ **Red Flags Detection** - Identifies warning signs that require immediate attention  

---

## Prerequisites

### 1. Google Cloud Account & API Key
You need a Google Cloud account with Gemini API access.

**Steps to Get API Key:**

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy the generated API key (starts with `AIza...`)
5. Keep this key secure - never commit it to version control

### 2. Required Dependencies
The backend already has the necessary dependencies installed:
- `@google/generative-ai` (v0.24.1) - Official Gemini SDK
- `multer` - For handling image uploads
- `express` - Web framework
- `dotenv` - Environment variable management

---

## Setup Instructions

### Step 1: Configure Environment Variables

1. Navigate to the backend directory:
```bash
cd backend
```

2. Open or create the `.env` file:
```bash
notepad .env
```

3. Add your Gemini API key:
```env
GOOGLE_API_KEY=your_actual_api_key_here
```

**Example:**
```env
GOOGLE_API_KEY=AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
JWT_SECRET=your_jwt_secret
```

### Step 2: Verify Backend Setup

The backend is already configured. Here's what's in place:

**File: `backend/controllers/aiController.js`**
- Uses Gemini 1.5 Flash model (fast and efficient)
- Handles text symptoms + up to 3 images
- Returns structured JSON with medical guidance
- Includes error handling and validation

**File: `backend/routes/aiRoute.js`**
- Endpoint: `POST /api/ai/diagnose`
- Accepts multipart form data
- Image size limit: 8MB per file
- Max 3 images allowed

### Step 3: Start the Backend Server

```bash
cd backend
npm start
```

Or for development with auto-reload:
```bash
npm run server
```

The server should start on `http://localhost:4000` (or your configured port).

### Step 4: Verify Frontend Configuration

The frontend AIVaidya component is already configured at:
- **File:** `frontend/src/components/AIDoctor.jsx`
- **Endpoint:** Automatically uses `backendUrl` from AppContext
- **Features:** Chat interface with image upload support

---

## How It Works

### Architecture Flow

```
User Input (Symptoms + Images)
         ↓
Frontend (AIVaidya Component)
         ↓
POST /api/ai/diagnose
         ↓
Backend (aiController.js)
         ↓
Gemini API (gemini-1.5-flash)
         ↓
Structured JSON Response
         ↓
Display to User
```

### Request Format

**Endpoint:** `POST /api/ai/diagnose`

**Headers:**
```
Content-Type: multipart/form-data
```

**Body Parameters:**
- `symptoms` (string, required) - User's symptom description
- `images` (files, optional) - Up to 3 medical images

**Example using cURL:**
```bash
curl -X POST http://localhost:4000/api/ai/diagnose \
  -F "symptoms=I have a persistent headache and fever for 2 days" \
  -F "images=@photo1.jpg" \
  -F "images=@photo2.jpg"
```

### Response Format

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "conditionHypotheses": [
      {
        "name": "Viral Fever",
        "rationale": "Common symptoms include headache and fever lasting 2-3 days"
      },
      {
        "name": "Tension Headache",
        "rationale": "Persistent headache could indicate stress-related tension"
      }
    ],
    "urgency": "soon",
    "recommendedSpeciality": "General Physician",
    "homeCare": "Rest, stay hydrated, take paracetamol for fever if needed",
    "redFlags": [
      "Fever above 103°F (39.4°C)",
      "Severe headache with stiff neck",
      "Confusion or difficulty speaking"
    ],
    "disclaimer": "This is not medical advice. Please consult a healthcare professional for proper diagnosis and treatment."
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## ML Algorithm & AI Model Details

### Gemini 1.5 Flash Model

**Model:** `gemini-1.5-flash`

**Capabilities:**
- **Multimodal Input:** Processes both text and images simultaneously
- **Context Window:** 1 million tokens (extensive medical knowledge)
- **Response Speed:** Optimized for fast inference (~2-3 seconds)
- **Vision Understanding:** Can analyze medical images, skin conditions, wounds, etc.
- **Reasoning:** Advanced reasoning for medical triage and pattern recognition

**Why Gemini 1.5 Flash?**
1. **Speed:** Fast response times for real-time chat experience
2. **Accuracy:** High-quality medical reasoning and pattern matching
3. **Multimodal:** Handles text + images in a single request
4. **Cost-Effective:** Efficient token usage
5. **Safety:** Built-in safety filters for medical content

### Prompt Engineering

The system uses carefully crafted prompts to ensure:
- **Safety First:** Always emphasizes this is not a diagnosis
- **Structured Output:** Returns consistent JSON format
- **Consumer-Friendly:** Avoids medical jargon and alarming language
- **Actionable Guidance:** Provides clear next steps
- **Red Flag Detection:** Identifies serious symptoms requiring immediate care

### Image Processing

Images are processed as follows:
1. **Upload:** User selects up to 3 images
2. **Validation:** File type and size validation (max 8MB each)
3. **Encoding:** Converted to base64 for API transmission
4. **Analysis:** Gemini analyzes visual symptoms (rashes, wounds, etc.)
5. **Integration:** Visual findings combined with text symptoms

---

## Testing the Integration

### Test 1: Text-Only Symptoms

**Frontend:** Open AIVaidya chatbot and type:
```
I have a sore throat and mild fever for 3 days
```

**Expected Response:**
- Condition hypotheses (e.g., Viral Pharyngitis, Common Cold)
- Urgency level (likely "soon")
- Recommended specialist (General Physician or ENT)
- Home care advice
- Red flags to watch for

### Test 2: With Image Upload

**Frontend:** Upload a photo of a skin rash and describe:
```
I have this red itchy rash on my arm for 2 days
```

**Expected Response:**
- Visual analysis of the rash
- Possible conditions (e.g., Contact Dermatitis, Allergic Reaction)
- Recommended specialist (Dermatologist)
- Home care and red flags

### Test 3: Emergency Symptoms

**Frontend:** Type:
```
Severe chest pain radiating to left arm, difficulty breathing
```

**Expected Response:**
- Urgency: "emergency"
- Clear instruction to call emergency services
- Red flags prominently displayed
- Immediate action recommendations

---

## API Key Security Best Practices

### ✅ DO:
- Store API key in `.env` file
- Add `.env` to `.gitignore`
- Use environment variables in production
- Rotate keys periodically
- Monitor API usage in Google Cloud Console

### ❌ DON'T:
- Commit API keys to Git
- Share keys in public forums
- Hardcode keys in source code
- Use the same key across multiple projects
- Expose keys in client-side code

---

## Troubleshooting

### Issue 1: "Server missing GOOGLE_API_KEY"

**Solution:**
1. Check if `.env` file exists in backend directory
2. Verify `GOOGLE_API_KEY` is set correctly
3. Restart the backend server after adding the key
4. Ensure no extra spaces around the key

### Issue 2: "Failed to get AI guidance"

**Possible Causes:**
- Invalid API key
- API quota exceeded
- Network connectivity issues
- Gemini API service down

**Solution:**
1. Verify API key is valid in Google AI Studio
2. Check API quota in Google Cloud Console
3. Test API key with a simple request
4. Check backend logs for detailed error messages

### Issue 3: Slow Response Times

**Solution:**
- Gemini 1.5 Flash is already optimized for speed
- Check network latency
- Reduce image file sizes (compress before upload)
- Consider caching common queries (future enhancement)

### Issue 4: Image Upload Fails

**Solution:**
1. Check file size (must be < 8MB)
2. Verify file format (JPEG, PNG, WebP supported)
3. Ensure proper MIME type
4. Check multer configuration in `aiRoute.js`

---

## API Usage & Costs

### Free Tier (Google AI Studio)
- **Rate Limit:** 60 requests per minute
- **Daily Quota:** Generous free tier for development
- **Cost:** Free for testing and small-scale use

### Production Pricing
- **Pay-as-you-go:** Based on token usage
- **Input Tokens:** ~$0.00015 per 1K tokens
- **Output Tokens:** ~$0.0006 per 1K tokens
- **Images:** Counted as ~258 tokens each

**Example Cost Calculation:**
- Average query: 500 input tokens + 300 output tokens + 2 images
- Cost per query: ~$0.00045 (less than $0.001)
- 1000 queries/day: ~$0.45/day or $13.50/month

---

## Advanced Features & Future Enhancements

### Potential Improvements

1. **Conversation History**
   - Store chat history for follow-up questions
   - Context-aware responses

2. **Doctor Matching**
   - Automatically suggest available doctors from database
   - Book appointments directly from AIVaidya

3. **Multi-Language Support**
   - Translate symptoms and responses
   - Support regional languages

4. **Symptom Tracking**
   - Track symptom progression over time
   - Generate health reports

5. **Integration with Health Records**
   - Access patient history for better context
   - Personalized recommendations

6. **Voice Input**
   - Speech-to-text for symptom description
   - Accessibility improvements

---

## Code Examples

### Backend: Custom Prompt Modification

To customize the AI behavior, edit `backend/controllers/aiController.js`:

```javascript
const buildPrompt = (symptomsText) => `You are AIVaidya, a medical triage assistant.

Additional Instructions:
- Focus on common conditions in rural India
- Consider seasonal diseases
- Provide home remedies when safe
- Emphasize preventive care

User symptoms: ${symptomsText}`;
```

### Frontend: Custom UI Styling

To customize AIVaidya appearance, edit `frontend/src/components/AIDoctor.jsx`:

```javascript
// Change button color
className="fixed bottom-6 right-6 z-50 bg-green-600 text-white..."

// Change chat panel size
className="fixed bottom-24 right-6 z-50 w-[400px] max-h-[80vh]..."
```

---

## Support & Resources

### Official Documentation
- [Gemini API Docs](https://ai.google.dev/docs)
- [Google AI Studio](https://makersuite.google.com/)
- [Gemini Pricing](https://ai.google.dev/pricing)

### Community
- [Google AI Forum](https://discuss.ai.google.dev/)
- [Stack Overflow - Gemini Tag](https://stackoverflow.com/questions/tagged/google-gemini)

### Contact
For project-specific issues, contact your development team.

---

## Disclaimer

**IMPORTANT:** AIVaidya is a triage and guidance tool, NOT a medical diagnosis system. It should never replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical concerns.

---

## Summary Checklist

- [ ] Google Cloud account created
- [ ] Gemini API key obtained
- [ ] `.env` file configured with `GOOGLE_API_KEY`
- [ ] Backend server running successfully
- [ ] Frontend connected to backend
- [ ] Test queries working correctly
- [ ] Image upload tested
- [ ] API key secured (not in Git)
- [ ] Error handling verified
- [ ] Disclaimer displayed to users

---

**Last Updated:** October 31, 2025  
**Version:** 1.0  
**Model:** Gemini 1.5 Flash
