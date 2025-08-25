import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';

// Initialize Firebase Admin
admin.initializeApp();

const corsHandler = cors({ 
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://impactclick.softechcom.com',
    'https://dashboard-eyy27lh5t-lauro-pimentels-projects.vercel.app',
    'https://backend-r26dorhkq-lauro-pimentels-projects.vercel.app'
  ],
  credentials: true 
});

// Click tracking function
export const trackClick = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      if (request.method !== 'POST') {
        response.status(405).send('Method Not Allowed');
        return;
      }

      const { campaignId, ngoId, sessionId, recaptchaToken, userAgent, ipAddress } = request.body;

      // Validate required fields
      if (!campaignId || !ngoId || !sessionId || !recaptchaToken) {
        response.status(400).json({ error: 'Missing required fields' });
        return;
      }

      // Verify reCAPTCHA (mock implementation)
      const recaptchaValid = await verifyRecaptcha(recaptchaToken);
      if (!recaptchaValid) {
        response.status(400).json({ error: 'Invalid reCAPTCHA token' });
        return;
      }

      // Check for duplicate clicks
      const db = admin.firestore();
      const existingClick = await db
        .collection('clicks')
        .where('sessionId', '==', sessionId)
        .where('campaignId', '==', campaignId)
        .limit(1)
        .get();

      if (!existingClick.empty) {
        response.status(400).json({ error: 'Click already registered for this session' });
        return;
      }

      // Get campaign and NGO data
      const campaignDoc = await db.collection('campaigns').doc(campaignId).get();
      const ngoDoc = await db.collection('ngos').doc(ngoId).get();

      if (!campaignDoc.exists || !ngoDoc.exists) {
        response.status(400).json({ error: 'Invalid campaign or NGO' });
        return;
      }

      const campaign = campaignDoc.data();
      const ngo = ngoDoc.data();

      // Create click record
      const clickId = db.collection('clicks').doc().id;
      const donationId = db.collection('donations').doc().id;

      const clickRecord = {
        id: clickId,
        campaignId,
        ngoId,
        sessionId,
        userAgent,
        ipAddress,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        isValid: true,
        donationId,
      };

      // Save click record
      await db.collection('clicks').doc(clickId).set(clickRecord);

      // Return success response
      response.status(200).json({
        success: true,
        donationId,
        amount: `DKK ${campaign?.donationAmount || 20}`,
        ngo: ngo?.name || 'Example NGO',
        message: `Thank you for your donation to ${ngo?.name || 'Example NGO'}!`,
        timestamp: new Date(),
      });

    } catch (error) {
      console.error('Error tracking click:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Process donation function
export const processDonation = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      if (request.method !== 'POST') {
        response.status(405).send('Method Not Allowed');
        return;
      }

      const { donationId, ngoId, amount, currency } = request.body;

      // Validate required fields
      if (!donationId || !ngoId || !amount) {
        response.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const db = admin.firestore();

      // Verify click exists
      const clickDoc = await db
        .collection('clicks')
        .where('donationId', '==', donationId)
        .limit(1)
        .get();

      if (clickDoc.empty) {
        response.status(400).json({ error: 'Invalid donation ID' });
        return;
      }

      // Check if donation already processed
      const existingDonation = await db
        .collection('donations')
        .where('donationId', '==', donationId)
        .limit(1)
        .get();

      if (!existingDonation.empty) {
        response.status(400).json({ error: 'Donation already processed' });
        return;
      }

      // Get NGO data
      const ngoDoc = await db.collection('ngos').doc(ngoId).get();
      if (!ngoDoc.exists) {
        response.status(400).json({ error: 'Invalid NGO' });
        return;
      }

      const ngo = ngoDoc.data();

      // Process payment (mock implementation)
      const transactionId = await processPayment(amount, currency);

      // Create donation record
      const donationRecord = {
        id: db.collection('donations').doc().id,
        donationId,
        ngoId,
        amount: parseFloat(amount),
        currency: currency || 'DKK',
        status: 'completed',
        transactionId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        encryptedData: encryptData({ amount, currency, ngoId }),
      };

      // Save donation record
      await db.collection('donations').doc(donationRecord.id).set(donationRecord);

      // Update analytics
      await updateAnalytics(donationRecord);

      response.status(200).json({
        success: true,
        transactionId,
        amount: parseFloat(amount),
        currency: currency || 'DKK',
        ngo: ngo?.name || 'Example NGO',
        message: `Donation of ${amount} ${currency || 'DKK'} processed successfully`,
        timestamp: new Date(),
      });

    } catch (error) {
      console.error('Error processing donation:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Analytics function
export const getAnalytics = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      if (request.method !== 'GET') {
        response.status(405).send('Method Not Allowed');
        return;
      }

      const { startDate, endDate, campaignId } = request.query;

      const db = admin.firestore();

      // Get analytics data
      const analyticsData = await getAnalyticsData(db, {
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
        campaignId: campaignId as string,
      });

      response.status(200).json(analyticsData);

    } catch (error) {
      console.error('Error getting analytics:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Helper functions
async function verifyRecaptcha(token: string): Promise<boolean> {
  // Mock reCAPTCHA verification - replace with real implementation
  return true;
}

async function processPayment(amount: number, currency: string): Promise<string> {
  // Mock payment processing - replace with real implementation
  const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  await new Promise(resolve => setTimeout(resolve, 100));
  return transactionId;
}

function encryptData(data: any): string {
  // Mock encryption - replace with real implementation
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

async function getAnalyticsData(db: admin.firestore.Firestore, filters: any) {
  // Mock analytics data - replace with real implementation
  return {
    totalClicks: 1500,
    totalDonations: 1200,
    totalAmount: 24000,
    campaigns: [
      {
        id: 'campaign-123',
        name: 'Summer Campaign',
        clicks: 500,
        donations: 450,
        amount: 9000,
        conversionRate: 90,
      },
    ],
    ngos: [
      {
        id: 'ngo-123',
        name: 'Example NGO',
        donations: 600,
        amount: 12000,
        averageDonation: 20,
      },
    ],
  };
}

async function updateAnalytics(donationRecord: any) {
  // Mock analytics update - replace with real implementation
  console.log('Updating analytics for donation:', donationRecord.id);
}
