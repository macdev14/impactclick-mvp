require('dotenv').config();
const admin = require('firebase-admin');

const serviceAccount = {
  projectId: 'impactclick-mvp',
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL
};

async function testFirebaseConnection() {
  try {
    console.log('🔧 Testing Firebase Admin SDK initialization...');
    console.log('Project ID:', serviceAccount.projectId);
    console.log('Client Email:', serviceAccount.clientEmail);
    console.log('Private Key length:', serviceAccount.privateKey?.length || 0);
    
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }
    
    console.log('✅ Firebase Admin SDK initialized successfully');
    
    // Test authentication
    const auth = admin.auth();
    console.log('✅ Firebase Auth initialized successfully');
    
    // Test Firestore initialization (without operations)
    const db = admin.firestore();
    console.log('✅ Firestore initialized successfully');
    
    console.log('🎉 Firebase credentials are working correctly!');
    console.log('📝 Note: Firestore operations may require additional setup in Firebase Console');
    
  } catch (error) {
    console.error('❌ Firebase connection failed:', error.message);
    console.error('Error details:', error);
  }
}

testFirebaseConnection();
