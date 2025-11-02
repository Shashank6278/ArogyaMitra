# Face ID Storage - Technical Documentation

## How Face ID is Stored

### Storage Format: **Base64-Encoded JPEG Image**

---

## Complete Flow

### 1. Capture (Frontend)
**File:** `frontend/src/components/FaceIDRegistration.jsx`

```javascript
// Capture face from webcam
const performCapture = () => {
  const video = videoRef.current
  const canvas = canvasRef.current
  
  // Draw video frame to canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height)
  
  // Convert to Base64 JPEG (80% quality)
  const imageData = canvas.toDataURL('image/jpeg', 0.8)
  
  setFaceImage(imageData)
}
```

**Output Format:**
```
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgH...
```

---

### 2. Storage (Backend)
**File:** `backend/models/userModel.js`

```javascript
const userSchema = new mongoose.Schema({
  faceData: { type: String, default: '' }
})
```

**Database:** MongoDB  
**Field:** `faceData` (String type)  
**Size:** ~50-150 KB per face image

---

### 3. Login Verification
**File:** `backend/controllers/userController.js`

```javascript
const faceLogin = async (req, res) => {
  const { faceData } = req.body
  
  // Find user with matching face data
  const user = await userModel.findOne({ faceData })
  
  if (user) {
    // Login successful
    const token = jwt.sign({ id: user._id }, JWT_SECRET)
    res.json({ success: true, token })
  }
}
```

**Method:** Simple Base64 string comparison

---

## Technical Details

### Image Specifications:
- **Format:** JPEG
- **Quality:** 80%
- **Encoding:** Base64
- **Average Size:** 50-150 KB
- **Resolution:** Depends on webcam (typically 640x480 or higher)

### Storage Location:
- **Database:** MongoDB
- **Collection:** `users`
- **Field:** `faceData`
- **Type:** String

---

## Current Implementation

### Pros:
- Simple to implement
- No external dependencies
- Works immediately
- Easy to debug
- Portable (Base64 string)

### Cons:
- Not secure (simple string comparison)
- No face recognition algorithm
- Can be fooled with photo
- Large database size
- No liveness detection

---

## Recommended Improvements

### For Production:

1. **Face Recognition Library:**
   - Use face-api.js or TensorFlow.js
   - Extract facial features/embeddings
   - Store embeddings instead of full image
   - Compare embeddings with threshold

2. **Liveness Detection:**
   - Blink detection
   - Head movement
   - Random challenges

3. **Security:**
   - Encrypt face data
   - Hash embeddings
   - Add salt/pepper
   - Rate limiting

4. **Storage Optimization:**
   - Store embeddings (much smaller)
   - Compress images
   - Use separate file storage (S3/Cloudinary)

---

## Example Production Flow

```javascript
// 1. Capture face
const faceImage = captureFromWebcam()

// 2. Extract features using face-api.js
const descriptor = await faceapi
  .detectSingleFace(faceImage)
  .withFaceLandmarks()
  .withFaceDescriptor()

// 3. Store descriptor (128 numbers instead of full image)
user.faceDescriptor = descriptor.descriptor

// 4. Login: Compare descriptors
const distance = faceapi.euclideanDistance(
  storedDescriptor,
  loginDescriptor
)

if (distance < 0.6) {
  // Match found
}
```

---

## Current vs Recommended

| Aspect | Current | Recommended |
|--------|---------|-------------|
| Storage | Full Base64 image | Face embeddings |
| Size | 50-150 KB | 512 bytes |
| Security | Low | High |
| Accuracy | Exact match only | Threshold-based |
| Speed | Fast | Very fast |
| Liveness | None | Yes |

---

## Summary

**Current Implementation:**
- Stores full face image as Base64 string
- Simple string comparison for login
- Works but not production-ready for security

**For MVP/Demo:** Current implementation is fine  
**For Production:** Implement proper face recognition with embeddings

