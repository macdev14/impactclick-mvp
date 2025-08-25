#!/bin/bash

# Fix Firebase Authentication Domain Issues
echo "🔧 Fixing Firebase Authentication Domain Issues..."

# Vercel domains
VERCEL_DASHBOARD_DOMAIN="dashboard-eyy27lh5t-lauro-pimentels-projects.vercel.app"
VERCEL_BACKEND_DOMAIN="backend-r26dorhkq-lauro-pimentels-projects.vercel.app"
CUSTOM_DOMAIN="impactclick.softechcom.com"

echo "📋 Please add these domains to your Firebase Authentication authorized domains:"
echo ""
echo "1. Go to: https://console.firebase.google.com/project/impactclick-mvp/authentication/settings"
echo "2. Scroll down to 'Authorized domains'"
echo "3. Add these domains:"
echo "   - $VERCEL_DASHBOARD_DOMAIN"
echo "   - $VERCEL_BACKEND_DOMAIN"
echo "   - $CUSTOM_DOMAIN"
echo ""
echo "4. Click 'Save'"
echo ""
echo "🔗 Direct link to Firebase Auth Settings:"
echo "https://console.firebase.google.com/project/impactclick-mvp/authentication/settings"
echo ""
echo "✅ After adding the domains, your dashboard should work at:"
echo "https://$VERCEL_DASHBOARD_DOMAIN"
echo ""
echo "🔐 Demo credentials:"
echo "Email: admin@impactclick.com"
echo "Password: password123"
