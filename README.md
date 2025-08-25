# ImpactClick MVP

A CSR (Corporate Social Responsibility) Gamified Advertising Platform that enables businesses to donate to NGOs through user interactions.

## 🚀 Live Demo

- **Dashboard**: https://dashboard-eyy27lh5t-lauro-pimentels-projects.vercel.app
- **Backend API**: https://backend-q9cnjbs70-lauro-pimentels-projects.vercel.app
- **Demo Site**: https://impactclick.softechcom.com

## 📋 Features

- **Gamified Donations**: Users click to trigger donations to NGOs
- **Real-time Analytics**: Track clicks, donations, and campaign performance
- **Multi-campaign Support**: Manage multiple advertising campaigns
- **NGO Management**: Support for multiple non-profit organizations
- **Embeddable Widget**: Easy integration into any website
- **Admin Dashboard**: Comprehensive analytics and campaign management
- **Firebase Authentication**: Secure user management
- **reCAPTCHA Integration**: Bot protection and verification

## 🏗️ Architecture

```
impactclick-mvp/
├── backend/                 # NestJS API server
├── dashboard/              # React admin dashboard
├── widget/                 # Embeddable donation widget
├── firebase-functions/     # Firebase Cloud Functions
└── docs/                   # Documentation
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Chart.js** for analytics visualization
- **React Router** for navigation
- **Firebase Auth** for authentication

### Backend
- **NestJS** with TypeScript
- **Firebase Firestore** for database
- **Firebase Admin SDK** for server-side operations
- **JWT** for authentication
- **reCAPTCHA** for bot protection

### Infrastructure
- **Vercel** for hosting
- **Firebase** for authentication and database
- **Firebase Functions** for serverless functions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/impactclick-mvp.git
   cd impactclick-mvp
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create `.env` files in each directory:
   
   **Backend** (`backend/.env`):
   ```env
   PORT=3001
   JWT_SECRET=your-jwt-secret
   RECAPTCHA_SECRET_KEY=your-recaptcha-secret
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_PRIVATE_KEY=your-firebase-private-key
   FIREBASE_CLIENT_EMAIL=your-firebase-client-email
   ```
   
   **Dashboard** (`dashboard/.env`):
   ```env
   REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

4. **Start development servers**
   ```bash
   # Start both backend and dashboard
   npm run dev
   
   # Or start individually
   npm run dev:backend    # Backend on http://localhost:3001
   npm run dev:dashboard  # Dashboard on http://localhost:3000
   ```

5. **Access the application**
   - Dashboard: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Docs: http://localhost:3001/api/docs

## 🔐 Authentication

### Demo Credentials
- **Email**: admin@impactclick.com
- **Password**: password123

### Setting up Firebase Authentication
1. Go to Firebase Console → Authentication → Settings
2. Add authorized domains:
   - `localhost`
   - `dashboard-eyy27lh5t-lauro-pimentels-projects.vercel.app`
   - `backend-q9cnjbs70-lauro-pimentels-projects.vercel.app`
   - `impactclick.softechcom.com`

## 🚀 Deployment

### Vercel Deployment
```bash
# Deploy backend
cd backend
vercel --prod

# Deploy dashboard
cd dashboard
vercel --prod
```

### Firebase Functions
```bash
# Deploy Firebase Functions (requires Blaze plan)
firebase deploy --only functions
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Campaigns
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns/:id` - Get campaign details

### Analytics
- `GET /api/analytics` - Get analytics data
- `GET /api/analytics/campaigns` - Campaign analytics
- `GET /api/analytics/ngos` - NGO analytics

### Click Tracking
- `POST /api/click` - Track user click
- `POST /api/donation` - Process donation

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:backend
npm run test:dashboard
npm run test:widget
```

## 📦 Build

```bash
# Build all packages
npm run build

# Build individual packages
npm run build:backend
npm run build:dashboard
npm run build:widget
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [API Documentation](https://backend-q9cnjbs70-lauro-pimentels-projects.vercel.app/api/docs)
- **Issues**: [GitHub Issues](https://github.com/yourusername/impactclick-mvp/issues)
- **Email**: support@impactclick.com

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] Payment gateway integration
- [ ] Social media integration
- [ ] A/B testing framework
- [ ] Advanced reporting
- [ ] API rate limiting
- [ ] Webhook support

## 🙏 Acknowledgments

- Firebase for backend services
- Vercel for hosting
- React and NestJS communities
- All contributors and supporters
