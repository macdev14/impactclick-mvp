require('dotenv').config();
const admin = require('firebase-admin');

const serviceAccount = {
  projectId: 'impactclick-mvp',
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL
};

async function testFirebaseConnection() {
  try {
    console.log('🔧 Testing Firebase connection...');
    console.log('Project ID:', serviceAccount.projectId);
    console.log('Client Email:', serviceAccount.clientEmail);
    console.log('Private Key length:', serviceAccount.privateKey?.length || 0);
    
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }
    
    const db = admin.firestore();
    console.log('✅ Firebase Admin SDK initialized successfully');
    console.log('✅ Firestore connection established');
    
    // Test a simple write operation
    const testData = {
      test: true,
      timestamp: new Date(),
      message: 'Firebase connection test successful'
    };
    
    await db.collection('test').doc('connection-test').set(testData);
    console.log('✅ Firestore write operation successful');
    
    // Test a simple read operation
    const testDoc = await db.collection('test').doc('connection-test').get();
    console.log('✅ Firestore read operation successful');
    console.log('Document exists:', testDoc.exists);
    console.log('Document data:', testDoc.data());
    
    // Clean up - delete the test document
    await db.collection('test').doc('connection-test').delete();
    console.log('✅ Test document cleaned up');
    
    console.log('🎉 Firebase connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Firebase connection failed:', error.message);
    console.error('Error details:', error);
  }
}

testFirebaseConnection();
