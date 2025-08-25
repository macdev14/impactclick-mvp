#!/bin/bash

# ImpactClick MVP Setup Script
set -e

echo "🎯 Setting up ImpactClick MVP..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies for all packages
echo "📦 Installing dependencies..."

# Root dependencies
npm install

# Backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Dashboard dependencies
echo "Installing dashboard dependencies..."
cd dashboard
npm install
cd ..

# Widget dependencies
echo "Installing widget dependencies..."
cd widget
npm install
cd ..

# Firebase Functions dependencies
echo "Installing Firebase Functions dependencies..."
cd firebase-functions
npm install
cd ..

echo "✅ All dependencies installed successfully!"

# Create environment files
echo "🔧 Setting up environment files..."

# Backend .env
if [ ! -f backend/.env ]; then
    echo "Creating backend .env file..."
    cp backend/.env.example backend/.env
    echo "⚠️  Please update backend/.env with your Firebase credentials"
fi

# Dashboard .env
if [ ! -f dashboard/.env ]; then
    echo "Creating dashboard .env file..."
    cp dashboard/.env.example dashboard/.env
    echo "⚠️  Please update dashboard/.env with your Firebase credentials"
fi

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "📥 Installing Firebase CLI..."
    npm install -g firebase-tools
fi

echo "✅ Firebase CLI version: $(firebase --version)"

# Check if user is logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Please log in to Firebase:"
    echo "firebase login"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo "✅ Firebase authentication verified"

# Build all packages
echo "🔨 Building all packages..."

# Build backend
echo "Building NestJS backend..."
cd backend
npm run build
cd ..

# Build dashboard
echo "Building React dashboard..."
cd dashboard
npm run build
cd ..

# Build widget
echo "Building embeddable widget..."
cd widget
npm run build
cd ..

# Build Firebase Functions
echo "Building Firebase Functions..."
cd firebase-functions
npm run build
cd ..

echo "✅ All packages built successfully!"

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Configure Firebase project:"
echo "   firebase projects:create impactclick-mvp"
echo "   firebase use impactclick-mvp"
echo ""
echo "2. Update environment files with your credentials:"
echo "   - backend/.env"
echo "   - dashboard/.env"
echo ""
echo "3. Enable Firebase services:"
echo "   - Firestore Database"
echo "   - Authentication"
echo "   - Functions"
echo "   - Hosting"
echo ""
echo "4. Deploy to Firebase:"
echo "   ./scripts/deploy.sh"
echo ""
echo "5. Start development servers:"
echo "   npm run dev"
echo ""
echo "📖 For more information, see the README.md file"
