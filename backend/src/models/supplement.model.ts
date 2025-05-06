import mongoose, { Document, Schema } from 'mongoose';

export enum SupplementCategory {
  VITAMIN = 'vitamin',
  MINERAL = 'mineral',
  AMINO_ACID = 'amino_acid',
  ENZYME = 'enzyme',
  HERB = 'herb',
  PROBIOTIC = 'probiotic',
  OMEGA = 'omega',
  OTHER = 'other'
}

export interface IHealthCondition {
  name: string;
  description: string;
}

export interface ISupplement extends Document {
  name: string;
  description: string;
  benefits: string[];
  category: SupplementCategory;
  recommendedDosage: string;
  recommendedForConditions: IHealthCondition[];
  contraindications: string[];
  price: number;
  imageUrl?: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const healthConditionSchema = new Schema<IHealthCondition>({
  name: {
    type: String,
    required: [true, 'Condition name is required']
  },
  description: {
    type: String,
    required: [true, 'Condition description is required']
  }
});

const supplementSchema = new Schema<ISupplement>(
  {
    name: {
      type: String,
      required: [true, 'Supplement name is required'],
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    benefits: {
      type: [String],
      required: [true, 'Benefits are required']
    },
    category: {
      type: String,
      enum: Object.values(SupplementCategory),
      required: [true, 'Category is required']
    },
    recommendedDosage: {
      type: String,
      required: [true, 'Recommended dosage is required']
    },
    recommendedForConditions: [healthConditionSchema],
    contraindications: {
      type: [String],
      default: []
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number']
    },
    imageUrl: {
      type: String
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Create index for searching
supplementSchema.index({ name: 'text', description: 'text' });

const Supplement = mongoose.model<ISupplement>('Supplement', supplementSchema);

export default Supplement; 