import mongoose, { Document, Schema } from 'mongoose';

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

export interface ILabTestResult {
  name: string;
  value: number;
  unit: string;
  referenceRangeLow?: number;
  referenceRangeHigh?: number;
  isAbnormal?: boolean;
}

export interface ILabTest extends Document {
  userId: mongoose.Types.ObjectId;
  type: LabTestType;
  name: string;
  provider: string;
  date: Date;
  status: LabTestStatus;
  results: ILabTestResult[];
  rawFileUrl?: string;
  nextTestDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const labTestResultSchema = new Schema<ILabTestResult>({
  name: {
    type: String,
    required: [true, 'Result name is required']
  },
  value: {
    type: Number,
    required: [true, 'Result value is required']
  },
  unit: {
    type: String,
    required: [true, 'Unit is required']
  },
  referenceRangeLow: {
    type: Number
  },
  referenceRangeHigh: {
    type: Number
  },
  isAbnormal: {
    type: Boolean,
    default: false
  }
});

const labTestSchema = new Schema<ILabTest>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    type: {
      type: String,
      enum: Object.values(LabTestType),
      required: [true, 'Lab test type is required']
    },
    name: {
      type: String,
      required: [true, 'Test name is required']
    },
    provider: {
      type: String,
      required: [true, 'Provider name is required']
    },
    date: {
      type: Date,
      required: [true, 'Test date is required'],
      default: Date.now
    },
    status: {
      type: String,
      enum: Object.values(LabTestStatus),
      default: LabTestStatus.PENDING
    },
    results: [labTestResultSchema],
    rawFileUrl: {
      type: String
    },
    nextTestDate: {
      type: Date
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Create index for faster queries
labTestSchema.index({ userId: 1, type: 1, date: -1 });

const LabTest = mongoose.model<ILabTest>('LabTest', labTestSchema);

export default LabTest; 