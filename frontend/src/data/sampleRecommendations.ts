import { v4 as uuidv4 } from 'uuid';

export interface Recommendation {
  _id: string;
  userId: string;
  labTestId: string;
  supplementId: string;
  reason: string;
  priority: number; // 1-10, 10 being highest priority
  dosage?: string;
  isAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Create sample recommendations using the IDs from the other sample data
export const sampleRecommendations: Recommendation[] = [
  {
    _id: uuidv4(),
    userId: 'user123',
    labTestId: 'lab-test-vitamin-d',  // Would be an actual ID in real data
    supplementId: 'supplement-vitamin-d', // Would be an actual ID in real data
    reason: 'Low Vitamin D levels detected in recent blood work (28 ng/mL). Supplementation recommended to reach optimal levels.',
    priority: 8,
    dosage: '5000 IU daily with a fat-containing meal for optimal absorption',
    isAccepted: true,
    createdAt: '2023-08-20T10:15:00Z',
    updatedAt: '2023-08-20T10:15:00Z'
  },
  {
    _id: uuidv4(),
    userId: 'user123',
    labTestId: 'lab-test-lipid-panel', // Would be an actual ID in real data
    supplementId: 'supplement-omega-3', // Would be an actual ID in real data
    reason: 'Elevated LDL cholesterol (140 mg/dL) and total cholesterol (215 mg/dL). Omega-3 supplementation may help improve lipid profile.',
    priority: 7,
    dosage: '2000mg daily, split into two doses with meals',
    isAccepted: true,
    createdAt: '2023-06-12T14:30:00Z',
    updatedAt: '2023-06-12T14:30:00Z'
  },
  {
    _id: uuidv4(),
    userId: 'user123',
    labTestId: 'lab-test-thyroid', // Would be an actual ID in real data
    supplementId: 'supplement-selenium', // Would be an actual ID in real data
    reason: 'TSH levels (3.8 mIU/L) are on the higher end of normal range. Selenium may support thyroid function.',
    priority: 5,
    dosage: '200 mcg daily',
    isAccepted: false,
    createdAt: '2023-04-25T09:45:00Z',
    updatedAt: '2023-04-25T09:45:00Z'
  },
  {
    _id: uuidv4(),
    userId: 'user123',
    labTestId: 'lab-test-microbiome', // Would be an actual ID in real data
    supplementId: 'supplement-probiotic', // Would be an actual ID in real data
    reason: 'Gut microbiome analysis shows opportunity to improve diversity. Probiotic supplementation recommended to support healthy gut flora.',
    priority: 6,
    dosage: '50 billion CFU daily on an empty stomach',
    isAccepted: true,
    createdAt: '2023-07-15T11:20:00Z',
    updatedAt: '2023-07-15T11:20:00Z'
  },
  {
    _id: uuidv4(),
    userId: 'user123',
    labTestId: 'lab-test-cbc', // Would be an actual ID in real data
    supplementId: 'supplement-magnesium', // Would be an actual ID in real data
    reason: 'Based on your sleep patterns from wearable data and overall health profile, magnesium supplementation may support better sleep quality and muscle recovery.',
    priority: 4,
    dosage: '400mg of magnesium glycinate before bedtime',
    isAccepted: true,
    createdAt: '2023-05-18T16:10:00Z',
    updatedAt: '2023-05-18T16:10:00Z'
  },
  {
    _id: uuidv4(),
    userId: 'user123',
    labTestId: 'lab-test-vitamin-d', // Would be an actual ID in real data
    supplementId: 'supplement-vitamin-k2', // Would be an actual ID in real data
    reason: 'To complement Vitamin D supplementation and ensure proper calcium utilization, Vitamin K2 is recommended.',
    priority: 6,
    dosage: '100 mcg daily with Vitamin D supplement',
    isAccepted: false,
    createdAt: '2023-08-22T13:30:00Z',
    updatedAt: '2023-08-22T13:30:00Z'
  },
  {
    _id: uuidv4(),
    userId: 'user123',
    labTestId: 'lab-test-cbc', // Would be an actual ID in real data
    supplementId: 'supplement-nac', // Would be an actual ID in real data
    reason: 'Based on your stress scores from wearable data and overall health goals, NAC may support glutathione production and oxidative stress management.',
    priority: 3,
    dosage: '600mg twice daily between meals',
    isAccepted: false,
    createdAt: '2023-08-15T09:20:00Z',
    updatedAt: '2023-08-15T09:20:00Z'
  }
]; 