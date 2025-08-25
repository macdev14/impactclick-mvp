#!/bin/bash

# ImpactClick MVP Deployment Script
set -e

echo "🚀 Starting ImpactClick MVP deployment..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    echo "❌ Not logged in to Firebase. Please run:"
    echo "firebase login"
    exit 1
fi

echo "📦 Building all packages..."

# Build backend
echo "Building NestJS backend..."
cd backend
npm install
npm run build
cd ..

# Build dashboard
echo "Building React dashboard..."
cd dashboard
npm install
npm run build
cd ..

# Build widget
echo "Building embeddable widget..."
cd widget
npm install
npm run build
cd ..

# Build Firebase Functions
echo "Building Firebase Functions..."
cd firebase-functions
npm install
npm run build
cd ..

echo "🔥 Deploying to Firebase..."

# Deploy Firebase Functions
echo "Deploying Firebase Functions..."
firebase deploy --only functions

# Deploy Firestore Rules
echo "Deploying Firestore Rules..."
firebase deploy --only firestore:rules

# Deploy hosting (dashboard)
echo "Deploying dashboard to Firebase Hosting..."
firebase deploy --only hosting

echo "✅ Deployment completed successfully!"
echo ""
echo "🌐 Dashboard URL: https://your-project-id.web.app"
echo "📚 API Documentation: https://your-project-id.web.app/api/docs"
echo ""
echo "📋 Next steps:"
echo "1. Set up Firebase Authentication"
echo "2. Configure reCAPTCHA keys"
echo "3. Set environment variables"
echo "4. Upload widget to CDN"
echo ""
echo "📖 For more information, see the README.md file"
