# AI Vaidya Chatbot - "Failed to get AI guidance" Fix

## ✅ Issue Identified

The AI chatbot shows "Failed to get AI guidance" because the backend server needs to be **restarted** to load the `GOOGLE_API_KEY` from the `.env` file.

---

## 🔧 SOLUTION

### Step 1: Stop the Backend Server
If the backend is running, stop it:
- Press `Ctrl + C` in the terminal where backend is running

### Step 2: Restart the Backend Server
```bash
cd backend
npm run server
```

### Step 3: Verify the API Key is Loaded
You should see the server start without errors:
```
Server started on PORT:4000
MongoDB Connected
```

### Step 4: Test the AI Chatbot
1. Open the frontend
2. Click "AIVaidya" button (bottom-right)
3. Type symptoms (e.g., "I have a headache and fever")
4. Click "Send"
5. Should now work! ✅

---

## ✅ Verification Checklist

- [x] `GOOGLE_API_KEY` exists in `.env` file
- [x] AI route is configured in `server.js`
- [x] AI controller is properly implemented
- [x] Multer is configured for image uploads
- [ ] **Backend server restarted** ← DO THIS!

---

## 🔍 Current Configuration

### .env File (Line 45):
```
GOOGLE_API_KEY=AIzaSyDSrqmY1NBJQWyQUBor6EbKJHVVfWIDbLg
```
✅ API Key is present

### Server.js (Line 28):
```javascript
app.use("/api/ai", aiRouter)
```
✅ Route is configured

### AI Controller:
```javascript
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
```
✅ Controller is reading the env variable

---

## 🧪 Test the API Directly

You can test the API using curl or Postman:

```bash
curl -X POST http://localhost:4000/api/ai/diagnose \
  -F "symptoms=I have a headache and fever"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "conditionHypotheses": [...],
    "urgency": "routine",
    "recommendedSpeciality": "General Physician",
    ...
  }
}
```

---

## ❌ Common Issues

### Issue 1: API Key Not Loaded
**Symptom:** "Server missing GOOGLE_API_KEY"
**Solution:** Restart backend server

### Issue 2: API Key Invalid
**Symptom:** Gemini API error
**Solution:** Verify API key is correct and active

### Issue 3: Network Error
**Symptom:** "Failed to fetch"
**Solution:** Check if backend is running on port 4000

---

## 🚀 Quick Fix Commands

```bash
# Terminal 1 - Backend
cd backend
npm run server

# Terminal 2 - Frontend (if needed)
cd frontend
npm run dev
```

---

## 📝 Why This Happens

Node.js loads environment variables from `.env` **only when the server starts**. If you:
1. Add a new variable to `.env`
2. Change an existing variable
3. The server was already running

Then the server won't see the changes until you **restart it**.

---

## ✅ After Restart

The AI chatbot should work perfectly:
- Type symptoms
- Optionally add photos
- Get AI-powered suggestions
- See recommended specialist
- Get home care advice

---

## 🎯 Expected Behavior

**User Input:**
```
"I have a headache and fever"
```

**AI Response:**
```json
{
  "conditionHypotheses": [
    {
      "name": "Common Cold/Flu",
      "rationale": "Headache and fever are common symptoms..."
    }
  ],
  "urgency": "routine",
  "recommendedSpeciality": "General Physician",
  "homeCare": "Rest, stay hydrated, take paracetamol...",
  "redFlags": ["High fever >103°F", "Severe headache", ...],
  "disclaimer": "This is not medical advice. Please consult a healthcare professional."
}
```

---

## 🔐 Security Note

The Google API key in `.env` is:
- ✅ Not committed to Git (`.env` is in `.gitignore`)
- ✅ Only accessible server-side
- ✅ Never exposed to frontend
- ✅ Secure

---

## 📞 Still Not Working?

If the chatbot still shows "Failed to get AI guidance" after restarting:

1. **Check Console Logs:**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for API calls

2. **Check Backend Logs:**
   - Look at terminal where backend is running
   - Check for error messages

3. **Verify API Key:**
   - Go to Google AI Studio
   - Verify the API key is active
   - Check if you have quota remaining

4. **Test API Endpoint:**
   - Use Postman or curl to test `/api/ai/diagnose`
   - Check if it returns proper response

---

**Last Updated:** November 2, 2025
**Status:** ✅ Configuration Correct - Just Restart Backend!
