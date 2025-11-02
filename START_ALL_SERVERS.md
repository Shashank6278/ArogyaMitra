# 🚀 START ALL SERVERS - CORRECT ORDER

## ⚠️ CRITICAL: Stop ALL running servers first!

Before starting, press `Ctrl+C` in ALL terminal windows to stop any running servers.

---

## 📋 STEP-BY-STEP STARTUP:

### Terminal 1 - Backend (Port 4000)
```bash
cd backend
npm run server
```
**Wait for:** `Server started on PORT:4000` and `Database Connected`

---

### Terminal 2 - Admin Panel (Port 5174) - FOR DOCTORS & ADMINS
```bash
cd admin
npm run dev
```
**Wait for:** `http://localhost:5174`

**IMPORTANT:** This is the DOCTOR and ADMIN panel. NOT for ASHA or patients!

---

### Terminal 3 - Frontend (Port 5173) - FOR PATIENTS & ASHA
```bash
cd frontend
npm run dev
```
**Wait for:** `http://localhost:5173`

**IMPORTANT:** This is for patients and ASHA workers. Doctors login here but get redirected to port 5174!

---

## ✅ VERIFY SERVERS ARE RUNNING:

Open these URLs in your browser:

1. **Backend API:** http://localhost:4000
   - Should show: "Cannot GET /" (this is normal)

2. **Admin Panel:** http://localhost:5174
   - Should show: Login page with "Admin Panel" or "Doctor Panel"
   - **Should NOT show:** ASHA landing page or patient booking page

3. **Frontend:** http://localhost:5173
   - Should show: ArogyaMitra landing page with Rural/Urban cards
   - **Should show:** ASHA options, patient booking, etc.

---

## 🐛 IF ADMIN PANEL (5174) SHOWS WRONG CONTENT:

### Problem: Port 5174 shows ASHA landing page or patient content
**This means the admin panel is NOT running!**

### Solution:
1. Stop ALL terminals (Ctrl+C everywhere)
2. Clear browser cache: Press `Ctrl+Shift+Delete` → Clear all
3. Close ALL browser tabs
4. Restart in order:
   ```bash
   # Terminal 1
   cd backend
   npm run server
   
   # Terminal 2 (WAIT for backend to start)
   cd admin
   npm run dev
   
   # Terminal 3 (WAIT for admin to start)
   cd frontend
   npm run dev
   ```
5. Open http://localhost:5174 in a NEW incognito window
6. Should see admin/doctor login page

---

## 🔍 HOW TO TELL WHICH APP IS WHICH:

### Admin Panel (localhost:5174):
- ✅ Shows "Admin Panel" or "Doctor Panel" login
- ✅ After login: Sidebar with Dashboard, Appointments, Profile
- ✅ Navbar shows "Admin" or "Doctor" badge
- ✅ Background color: Light gray (#F8F9FD)
- ❌ NO ASHA landing page
- ❌ NO patient booking page
- ❌ NO "Book Appointment" buttons

### Frontend (localhost:5173):
- ✅ Shows ArogyaMitra landing page
- ✅ Rural/Urban selection cards
- ✅ ASHA Dashboard option
- ✅ Patient booking features
- ✅ "Book Appointment" buttons
- ✅ Doctor list for patients
- ❌ NOT for doctor dashboard

---

## 📝 DOCTOR LOGIN FLOW:

1. **Start:** Go to http://localhost:5173 (Frontend)
2. **Click:** "Urban" card
3. **Click:** "Doctor Login"
4. **Enter:** Email and password
5. **Click:** "Login"
6. **Wait:** 1.5 seconds
7. **Redirect:** Automatically goes to http://localhost:5174 (Admin Panel)
8. **See:** Doctor Dashboard with stats and appointments

**URL MUST CHANGE from :5173 to :5174!**

---

## ⚠️ COMMON MISTAKES:

### Mistake 1: Only running frontend (5173)
**Result:** Doctor login doesn't redirect anywhere
**Fix:** Start admin panel on port 5174

### Mistake 2: Running admin panel on wrong port
**Result:** Redirect goes to wrong page
**Fix:** Check admin/vite.config.js has `port: 5174`

### Mistake 3: Browser cache showing old content
**Result:** Changes don't appear
**Fix:** Hard refresh with `Ctrl+Shift+R` or clear cache

### Mistake 4: Multiple instances of same server
**Result:** Wrong version loads
**Fix:** Stop ALL terminals, restart in order

---

## 🎯 QUICK TEST:

After starting all servers:

1. Open http://localhost:5174 directly
   - Should see: Login page (Admin or Doctor)
   - Should NOT see: ASHA landing page

2. Login as admin:
   - Email: admin@example.com
   - Password: greatstack123
   - Should see: Admin dashboard

3. Logout and try doctor login from frontend:
   - Go to http://localhost:5173
   - Urban → Doctor Login
   - Should redirect to http://localhost:5174
   - Should see: Doctor dashboard

---

## 🔧 IF STILL SHOWING WRONG CONTENT:

### Nuclear Option (Complete Reset):

```bash
# 1. Stop ALL servers (Ctrl+C everywhere)

# 2. Clear all node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../admin
rm -rf node_modules package-lock.json dist
npm install

cd ../frontend
rm -rf node_modules package-lock.json dist
npm install

# 3. Clear browser completely
# - Close ALL browser windows
# - Clear all cache and cookies
# - Restart browser

# 4. Start servers in order
cd backend
npm run server

# New terminal
cd admin
npm run dev

# New terminal
cd frontend
npm run dev
```

---

## ✅ SUCCESS CHECKLIST:

Before testing doctor login:
- [ ] Backend running on port 4000
- [ ] Admin panel running on port 5174
- [ ] Frontend running on port 5173
- [ ] http://localhost:5174 shows login page (NOT ASHA page)
- [ ] http://localhost:5173 shows ArogyaMitra landing
- [ ] Browser cache cleared
- [ ] All old tabs closed

---

**If you see ASHA landing page on port 5174, the admin panel is NOT running correctly!**
