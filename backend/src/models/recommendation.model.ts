import mongoose, { Document, Schema } from 'mongoose';

export interface IRecommendation extends Document {
  userId: mongoose.Types.ObjectId;
  labTestId: mongoose.Types.ObjectId;
  supplementId: mongoose.Types.ObjectId;
  reason: string;
  priority: number; // 1-10, 10 being highest priority
  dosage?: string;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const recommendationSchema = new Schema<IRecommendation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    labTestId: {
      type: Schema.Types.ObjectId,
      ref: 'LabTest',
      required: [true, 'Lab test ID is required']
    },
    supplementId: {
      type: Schema.Types.ObjectId,
      ref: 'Supplement',
      required: [true, 'Supplement ID is required']
    },
    reason: {
      type: String,
      required: [true, 'Reason for recommendation is required']
    },
    priority: {
      type: Number,
      required: [true, 'Priority is required'],
      min: 1,
      max: 10
    },
    dosage: {
      type: String
    },
    isAccepted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Create compound index to ensure unique recommendations per user, lab test, and supplement
recommendationSchema.index(
  { userId: 1, labTestId: 1, supplementId: 1 },
  { unique: true }
);

const Recommendation = mongoose.model<IRecommendation>(
  'Recommendation',
  recommendationSchema
);

export default Recommendation; 