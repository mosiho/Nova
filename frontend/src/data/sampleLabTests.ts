import { v4 as uuidv4 } from 'uuid';

export enum LabTestType {
  BLOOD = 'blood',
  DNA = 'dna',
  RNA = 'rna',
  HORMONE = 'hormone',
  MICROBIOME = 'microbiome',
  OTHER = 'other'
}

export enum LabTestStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface LabTestResult {
  name: string;
  value: number;
  unit: string;
  referenceRangeLow?: number;
  referenceRangeHigh?: number;
  isAbnormal?: boolean;
}

export interface LabTest {
  _id: string;
  userId: string;
  type: LabTestType;
  name: string;
  provider: string;
  date: string;
  status: LabTestStatus;
  results: LabTestResult[];
  rawFileUrl?: string;
  nextTestDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const sampleLabTests: LabTest[] = [
  {
    _id: uuidv4(),
    userId: 'user123',
    type: LabTestType.BLOOD,
    name: 'Complete Blood Count (CBC)',
    provider: 'LabCorp',
    date: '2023-05-15T10:30:00Z',
    status: LabTestStatus.COMPLETED,
    results: [
      {
        name: 'White Blood Cell Count (WBC)',
        value: 7.2,
        unit: 'x10^9/L',
        referenceRangeLow: 4.5,
        referenceRangeHigh: 11.0,
        isAbnormal: false
      },
      {
        name: 'Red Blood Cell Count (RBC)',
        value: 5.1,
        unit: 'x10^12/L',
        referenceRangeLow: 4.5,
        referenceRangeHigh: 5.9,
        isAbnormal: false
      },
      {
        name: 'Hemoglobin (Hgb)',
        value: 14.2,
        unit: 'g/dL',
        referenceRangeLow: 13.5,
        referenceRangeHigh: 17.5,
        isAbnormal: false
      },
      {
        name: 'Hematocrit (Hct)',
        value: 42.0,
        unit: '%',
        referenceRangeLow: 41.0,
        referenceRangeHigh: 50.0,
        isAbnormal: false
      },
      {
        name: 'Platelet Count',
        value: 290,
        unit: 'x10^9/L',
        referenceRangeLow: 150,
        referenceRangeHigh: 450,
        isAbnormal: false
      }
    ],
    notes: 'Regular annual checkup results. All values within normal range.',
    nextTestDate: '2024-05-15T10:30:00Z',
    createdAt: '2023-05-15T11:45:00Z',
    updatedAt: '2023-05-15T11:45:00Z'
  },
  {
    _id: uuidv4(),
    userId: 'user123',
    type: LabTestType.HORMONE,
    name: 'Thyroid Panel',
    provider: 'Quest Diagnostics',
    date: '2023-04-22T09:15:00Z',
    status: LabTestStatus.COMPLETED,
    results: [
      {
        name: 'Thyroid Stimulating Hormone (TSH)',
        value: 3.8,
        unit: 'mIU/L',
        referenceRangeLow: 0.4,
        referenceRangeHigh: 4.0,
        isAbnormal: false
      },
      {
        name: 'Free T4',
        value: 0.9,
        unit: 'ng/dL',
        referenceRangeLow: 0.8,
        referenceRangeHigh: 1.8,
        isAbnormal: false
      },
      {
        name: 'Free T3',
        value: 2.5,
        unit: 'pg/mL',
        referenceRangeLow: 2.3,
        referenceRangeHigh: 4.2,
        isAbnormal: false
      }
    ],
    notes: 'Thyroid function is normal but TSH is on the higher end of the normal range.',
    nextTestDate: '2023-10-22T09:15:00Z',
    createdAt: '2023-04-22T10:30:00Z',
    updatedAt: '2023-04-22T10:30:00Z'
  },
  {
    _id: uuidv4(),
    userId: 'user123',
    type: LabTestType.BLOOD,
    name: 'Lipid Panel',
    provider: 'LabCorp',
    date: '2023-06-10T14:00:00Z',
    status: LabTestStatus.COMPLETED,
    results: [
      {
        name: 'Total Cholesterol',
        value: 215,
        unit: 'mg/dL',
        referenceRangeLow: 125,
        referenceRangeHigh: 200,
        isAbnormal: true
      },
      {
        name: 'LDL Cholesterol',
        value: 140,
        unit: 'mg/dL',
        referenceRangeLow: 0,
        referenceRangeHigh: 130,
        isAbnormal: true
      },
      {
        name: 'HDL Cholesterol',
        value: 48,
        unit: 'mg/dL',
        referenceRangeLow: 40,
        referenceRangeHigh: 60,
        isAbnormal: false
      },
      {
        name: 'Triglycerides',
        value: 135,
        unit: 'mg/dL',
        referenceRangeLow: 0,
        referenceRangeHigh: 150,
        isAbnormal: false
      }
    ],
    notes: 'Total cholesterol and LDL are slightly elevated. Recommended lifestyle changes including diet modification and regular exercise.',
    nextTestDate: '2023-12-10T14:00:00Z',
    createdAt: '2023-06-10T15:20:00Z',
    updatedAt: '2023-06-10T15:20:00Z'
  },
  {
    _id: uuidv4(),
    userId: 'user123',
    type: LabTestType.MICROBIOME,
    name: 'Gut Microbiome Analysis',
    provider: 'Thorne Research',
    date: '2023-07-05T11:30:00Z',
    status: LabTestStatus.COMPLETED,
    results: [
      {
        name: 'Firmicutes to Bacteroidetes Ratio',
        value: 1.2,
        unit: 'ratio',
        referenceRangeLow: 0.5,
        referenceRangeHigh: 2.0,
        isAbnormal: false
      },
      {
        name: 'Diversity Score',
        value: 7.8,
        unit: 'score',
        referenceRangeLow: 5.0,
        referenceRangeHigh: 10.0,
        isAbnormal: false
      },
      {
        name: 'Bifidobacterium',
        value: 3.2,
        unit: 'relative abundance',
        referenceRangeLow: 2.0,
        referenceRangeHigh: 8.0,
        isAbnormal: false
      },
      {
        name: 'Lactobacillus',
        value: 1.5,
        unit: 'relative abundance',
        referenceRangeLow: 1.0,
        referenceRangeHigh: 5.0,
        isAbnormal: false
      }
    ],
    notes: 'Overall healthy gut microbiome profile. Could benefit from increasing fiber intake to improve diversity further.',
    nextTestDate: '2024-01-05T11:30:00Z',
    createdAt: '2023-07-12T09:45:00Z',
    updatedAt: '2023-07-12T09:45:00Z'
  },
  {
    _id: uuidv4(),
    userId: 'user123',
    type: LabTestType.BLOOD,
    name: 'Vitamin D Test',
    provider: 'Quest Diagnostics',
    date: '2023-08-18T13:45:00Z',
    status: LabTestStatus.COMPLETED,
    results: [
      {
        name: 'Vitamin D, 25-Hydroxy',
        value: 28,
        unit: 'ng/mL',
        referenceRangeLow: 30,
        referenceRangeHigh: 100,
        isAbnormal: true
      }
    ],
    notes: 'Vitamin D level is insufficient. Recommended supplementation with 2000 IU daily and increased sun exposure.',
    nextTestDate: '2023-11-18T13:45:00Z',
    createdAt: '2023-08-19T10:30:00Z',
    updatedAt: '2023-08-19T10:30:00Z'
  }
]; 