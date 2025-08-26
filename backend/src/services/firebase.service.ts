import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private db: admin.firestore.Firestore;

  async onModuleInit() {
    // Initialize Firebase Admin SDK
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
    }
    this.db = admin.firestore();
  }

  // Click operations
  async saveClick(clickRecord: any): Promise<void> {
    await this.db.collection('clicks').doc(clickRecord.id).set(clickRecord);
  }

  async updateClick(clickRecord: any): Promise<void> {
    await this.db.collection('clicks').doc(clickRecord.id).update(clickRecord);
  }

  async getClickBySession(sessionId: string, campaignId: string): Promise<any> {
    const snapshot = await this.db
      .collection('clicks')
      .where('sessionId', '==', sessionId)
      .where('campaignId', '==', campaignId)
      .limit(1)
      .get();

    return snapshot.empty ? null : snapshot.docs[0].data();
  }

  async getClickByDonationId(donationId: string): Promise<any> {
    const snapshot = await this.db
      .collection('clicks')
      .where('donationId', '==', donationId)
      .limit(1)
      .get();

    return snapshot.empty ? null : snapshot.docs[0].data();
  }

  async getClickStats(campaignId?: string): Promise<{ totalClicks: number; validClicks: number }> {
    let query = this.db.collection('clicks');
    
    if (campaignId) {
      query = query.where('campaignId', '==', campaignId) as any;
    }

    const snapshot = await query.get();
    const clicks = snapshot.docs.map(doc => doc.data());

    return {
      totalClicks: clicks.length,
      validClicks: clicks.filter(click => click.isValid).length,
    };
  }

  // Donation operations
  async saveDonation(donationRecord: any): Promise<void> {
    await this.db.collection('donations').doc(donationRecord.id).set(donationRecord);
  }

  async getDonationByDonationId(donationId: string): Promise<any> {
    const snapshot = await this.db
      .collection('donations')
      .where('donationId', '==', donationId)
      .limit(1)
      .get();

    return snapshot.empty ? null : snapshot.docs[0].data();
  }

  async getDonationStats(): Promise<{ totalDonations: number; totalAmount: number }> {
    const snapshot = await this.db.collection('donations').get();
    const donations = snapshot.docs.map(doc => doc.data());

    return {
      totalDonations: donations.length,
      totalAmount: donations.reduce((sum, donation) => sum + donation.amount, 0),
    };
  }

  // Campaign and NGO operations
  async getCampaign(campaignId: string): Promise<any> {
    const doc = await this.db.collection('campaigns').doc(campaignId).get();
    return doc.exists ? doc.data() : null;
  }

  async getNgo(ngoId: string): Promise<any> {
    const doc = await this.db.collection('ngos').doc(ngoId).get();
    return doc.exists ? doc.data() : null;
  }

  async getAllNgos(): Promise<any[]> {
    const snapshot = await this.db.collection('ngos').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async saveNgo(ngoRecord: any): Promise<void> {
    await this.db.collection('ngos').doc(ngoRecord.id).set(ngoRecord);
  }

  async updateNgo(ngoRecord: any): Promise<void> {
    await this.db.collection('ngos').doc(ngoRecord.id).update(ngoRecord);
  }

  async deleteNgo(ngoId: string): Promise<void> {
    await this.db.collection('ngos').doc(ngoId).delete();
  }

  // Analytics operations
  async getAnalytics(filters: any): Promise<any> {
    // Mock analytics data - in production, implement real aggregation
    const mockData = {
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
        },
        {
          id: 'campaign-456',
          name: 'Holiday Drive',
          clicks: 1000,
          donations: 750,
          amount: 15000,
        },
      ],
      ngos: [
        {
          id: 'ngo-123',
          name: 'Example NGO',
          donations: 600,
          amount: 12000,
        },
        {
          id: 'ngo-456',
          name: 'Wildlife Foundation',
          donations: 600,
          amount: 12000,
        },
      ],
    };

    return mockData;
  }

  async getTimeSeriesData(startDate: Date, endDate: Date): Promise<any[]> {
    // Mock time series data
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const data = [];

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      data.push({
        date: date.toISOString().split('T')[0],
        clicks: Math.floor(Math.random() * 50) + 10,
        donations: Math.floor(Math.random() * 40) + 5,
        amount: Math.floor(Math.random() * 800) + 100,
      });
    }

    return data;
  }

  async updateAnalytics(donationRecord: any): Promise<void> {
    // Update real-time analytics counters
    const analyticsRef = this.db.collection('analytics').doc('realtime');
    
    await this.db.runTransaction(async (transaction) => {
      const analyticsDoc = await transaction.get(analyticsRef);
      
      if (analyticsDoc.exists) {
        const data = analyticsDoc.data();
        transaction.update(analyticsRef, {
          totalDonations: (data?.totalDonations || 0) + 1,
          totalAmount: (data?.totalAmount || 0) + donationRecord.amount,
          lastUpdated: new Date(),
        });
      } else {
        transaction.set(analyticsRef, {
          totalDonations: 1,
          totalAmount: donationRecord.amount,
          lastUpdated: new Date(),
        });
      }
    });
  }

  async getCampaignAnalytics(campaignId: string): Promise<any> {
    // Mock campaign analytics
    return {
      id: campaignId,
      name: 'Sample Campaign',
      clicks: 500,
      donations: 450,
      amount: 9000,
    };
  }

  async getNgoAnalytics(ngoId: string): Promise<any> {
    // Mock NGO analytics
    return {
      id: ngoId,
      name: 'Sample NGO',
      donations: 600,
      amount: 12000,
    };
  }
}
