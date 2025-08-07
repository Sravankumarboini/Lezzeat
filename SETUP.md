# 🚀 Food Ordering App - Setup Guide

This guide will help you set up and run the React Native food ordering app with Capacitor and MERN stack backend.

## ✅ Prerequisites

### Required Software
1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **Git** - [Download](https://git-scm.com/)
3. **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

### For Mobile Development
4. **Android Studio** - [Download](https://developer.android.com/studio)
5. **Xcode** (macOS only) - [Download from App Store](https://apps.apple.com/us/app/xcode/id497799835)

### Optional (for full database features)
6. **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas/database)

## 📋 Step-by-Step Setup

### 1. Clone and Install Dependencies
```bash
# Clone the repository
git clone <your-repo-url>
cd food-ordering-app

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Environment Configuration

Create `backend/.env` file:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/food_app
JWT_SECRET=your_super_secure_jwt_secret_key_here_make_it_long_and_random
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### 3. Database Setup (Optional)

If you have MongoDB installed:
```bash
# Start MongoDB service (varies by OS)
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Seed the database with sample data
cd backend
node seeds/foodData.js
cd ..
```

**Note:** The app will work without MongoDB, but some features like user registration and order history won't be fully functional.

### 4. Start Development Servers

#### Option A: Run Both Servers Together
```bash
npm run dev:full
```

#### Option B: Run Servers Separately
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📱 Mobile App Setup

### 1. Build the Web App
```bash
npm run build
```

### 2. Android Setup

#### Prerequisites
- Android Studio installed
- Android SDK configured
- At least one Android Virtual Device (AVD) created

#### Commands
```bash
# Add Android platform (if not already added)
npm run cap:add:android

# Sync web assets with native project
npm run cap:sync

# Open in Android Studio
npm run cap:open:android
```

#### In Android Studio:
1. Wait for Gradle sync to complete
2. Click "Run" or press Shift+F10
3. Select your AVD or connected device

### 3. iOS Setup (macOS only)

#### Prerequisites
- Xcode installed
- iOS Simulator or physical iOS device
- Apple Developer account (for device testing)

#### Commands
```bash
# Add iOS platform
npm run cap:add:ios

# Sync web assets with native project
npm run cap:sync

# Open in Xcode
npm run cap:open:ios
```

#### In Xcode:
1. Select a simulator or connected device
2. Click the "Play" button or press Cmd+R

## 🔧 Troubleshooting

### Common Issues

#### 1. Backend Won't Start (Path-to-regexp Error)
**Error:** `TypeError: Missing parameter name at 1`

**Solution:** This was fixed in the latest version. Make sure you have the updated code.

#### 2. MongoDB Connection Failed
**Error:** `connect ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
- Install and start MongoDB locally
- Use MongoDB Atlas (cloud) and update the connection string
- Continue without database (limited functionality)

#### 3. Capacitor CLI Not Found
**Error:** `npm error could not determine executable to run`

**Solutions:**
```bash
# Install Capacitor CLI globally
npm install -g @capacitor/cli

# Or use direct commands
cap add android
cap sync
cap open android
```

#### 4. Build Errors
**Error:** Various TypeScript or build errors

**Solutions:**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist
npm run build
```

#### 5. Android Build Issues
**Symptoms:** Gradle sync failures, build errors

**Solutions:**
1. Open Android Studio → File → Invalidate Caches and Restart
2. Check Android SDK is properly installed
3. Ensure `ANDROID_HOME` environment variable is set
4. Update Android SDK and build tools

#### 6. iOS Build Issues
**Symptoms:** Xcode build failures, simulator issues

**Solutions:**
1. Clean build folder: Product → Clean Build Folder
2. Reset iOS Simulator: Device → Erase All Content and Settings
3. Update Xcode to latest version
4. Check iOS deployment target compatibility

### Environment Variables Check

Create this script to verify your setup:

**`check-setup.js`**
```javascript
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Food Ordering App Setup...\n');

// Check Node.js version
console.log('📦 Node.js version:', process.version);

// Check if key files exist
const files = [
  'package.json',
  'backend/package.json',
  'backend/.env',
  'capacitor.config.ts'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    console.log('✅', file);
  } else {
    console.log('❌', file, '(missing)');
  }
});

// Check if MongoDB is accessible
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/food_app')
  .then(() => {
    console.log('✅ MongoDB connection successful');
    process.exit(0);
  })
  .catch(() => {
    console.log('⚠️  MongoDB not accessible (app will run with limited features)');
    process.exit(0);
  });
```

Run with: `node check-setup.js`

## 🆘 Getting Help

### Log Files
Check these locations for detailed error logs:
- Browser Developer Console (F12)
- Terminal output where you ran the servers
- Android Studio Logcat
- Xcode Debug Console

### Useful Commands
```bash
# Check if ports are in use
lsof -i :3000  # Frontend
lsof -i :5000  # Backend

# Kill processes on ports
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:5000)

# Check Capacitor info
cap doctor

# Update dependencies
npm update
cd backend && npm update && cd ..
```

### Support Resources
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## ✨ Features Overview

### ✅ Implemented Features
- [x] Horizontal scroll for "All Items" food display
- [x] Vertical layout for category-specific items  
- [x] Dark mode toggle with persistent theme
- [x] Redesigned cart with images and tax calculation
- [x] Pickup time validation (9:30 AM - 3:45 PM)
- [x] Profile photo upload functionality
- [x] Read-only profile information display
- [x] Detailed order history with payment info
- [x] MERN stack backend with authentication
- [x] React Native mobile app with Capacitor

### 🔧 Development Features
- Hot reload for frontend and backend
- TypeScript support
- ESLint configuration
- Responsive design
- API documentation
- Error handling and validation
- Security middleware
- File upload support

---

**Need help?** Create an issue in the repository or check the troubleshooting section above.