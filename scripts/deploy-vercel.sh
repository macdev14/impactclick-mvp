#!/bin/bash

# ImpactClick MVP Vercel Deployment Script
set -e

echo "🚀 Starting ImpactClick MVP Vercel deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "npm install -g vercel"
    exit 1
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel. Please run:"
    echo "vercel login"
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

echo "🚀 Deploying to Vercel..."

# Deploy backend first
echo "Deploying backend API..."
cd backend
vercel --prod
cd ..

# Deploy dashboard
echo "Deploying dashboard..."
cd dashboard
vercel --prod
cd ..

echo "✅ Vercel deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update API_BASE_URL in dashboard/src/utils/api.ts with your Vercel backend URL"
echo "2. Set up environment variables in Vercel dashboard"
echo "3. Configure Firebase Authentication"
echo "4. Upload widget to CDN"
echo ""
echo "🔧 Environment Variables to set in Vercel:"
echo "Backend:"
echo "- JWT_SECRET"
echo "- RECAPTCHA_SECRET_KEY"
echo "- FIREBASE_PROJECT_ID"
echo "- FIREBASE_PRIVATE_KEY"
echo "- FIREBASE_CLIENT_EMAIL"
echo ""
echo "Dashboard:"
echo "- REACT_APP_FIREBASE_API_KEY"
echo "- REACT_APP_FIREBASE_AUTH_DOMAIN"
echo "- REACT_APP_FIREBASE_PROJECT_ID"
echo "- REACT_APP_FIREBASE_STORAGE_BUCKET"
echo "- REACT_APP_FIREBASE_MESSAGING_SENDER_ID"
echo "- REACT_APP_FIREBASE_APP_ID"
