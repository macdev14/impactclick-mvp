# ImpactClick MVP Deployment Guide

## 🚀 Deployment Status

✅ **Dashboard**: Deployed to Firebase Hosting  
✅ **Firestore Rules**: Deployed  
⚠️ **Firebase Functions**: Requires Blaze plan upgrade  

## 📍 Live URLs

- **Dashboard**: https://impactclick-mvp.web.app
- **Firebase Console**: https://console.firebase.google.com/project/impactclick-mvp/overview

## 🔧 Deployment Commands

### Full Deployment (requires Blaze plan)
```bash
# Deploy everything
npm run deploy

# Or use the deployment script
./scripts/deploy.sh
```

### Individual Deployments
```bash
# Deploy dashboard only
npm run deploy:hosting

# Deploy Firebase Functions only (requires Blaze plan)
npm run deploy:functions

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

## 🔥 Firebase Functions Deployment

To deploy Firebase Functions, you need to upgrade to the Blaze (pay-as-you-go) plan:

1. Visit: https://console.firebase.google.com/project/impactclick-mvp/usage/details
2. Click "Upgrade" to Blaze plan
3. Run: `firebase deploy --only functions`

## 🏗️ Build Commands

```bash
# Build all packages
npm run build

# Build individual packages
npm run build:backend
npm run build:dashboard
npm run build:widget
```

## 🔐 Authentication

The dashboard uses Firebase Authentication. Demo credentials:
- **Email**: admin@impactclick.com
- **Password**: password123

## 📋 Environment Variables

Set these environment variables for production:

### Dashboard (.env)
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=impactclick-mvp
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### Backend (.env)
```
PORT=3001
JWT_SECRET=your-jwt-secret
RECAPTCHA_SECRET_KEY=your-recaptcha-secret
```

## 🎯 Next Steps

1. **Upgrade to Blaze plan** to deploy Firebase Functions
2. **Configure Firebase Authentication** with real users
3. **Set up reCAPTCHA** with production keys
4. **Deploy backend** to a cloud service (Heroku, Railway, etc.)
5. **Upload widget** to a CDN for production use

## 🐛 Troubleshooting

### Build Errors
- Run `npm install` in each directory
- Clear cache: `rm -rf node_modules/.cache`
- Check TypeScript configuration

### Deployment Errors
- Ensure Firebase CLI is installed: `npm install -g firebase-tools`
- Login to Firebase: `firebase login`
- Check project selection: `firebase use impactclick-mvp`

### Port Conflicts
- Dashboard runs on port 3000
- Backend runs on port 3001
- Update proxy configuration if needed
