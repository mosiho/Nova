import mongoose, { Document, Schema } from 'mongoose';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  PAUSED = 'paused',
  PAST_DUE = 'past_due',
  TRIALING = 'trialing'
}

export enum SubscriptionType {
  SUPPLEMENT = 'supplement', // For supplement subscriptions
  PREMIUM = 'premium'        // For premium plan subscription
}

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  type: SubscriptionType;
  supplementId?: mongoose.Types.ObjectId; // Only for supplement subscriptions
  status: SubscriptionStatus;
  stripeSubscriptionId: string;
  stripePriceId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  quantity?: number; // For supplement quantity
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    type: {
      type: String,
      enum: Object.values(SubscriptionType),
      required: [true, 'Subscription type is required']
    },
    supplementId: {
      type: Schema.Types.ObjectId,
      ref: 'Supplement',
      // Required only for supplement subscriptions
      required: function(this: ISubscription) {
        return this.type === SubscriptionType.SUPPLEMENT;
      }
    },
    status: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      required: [true, 'Status is required'],
      default: SubscriptionStatus.ACTIVE
    },
    stripeSubscriptionId: {
      type: String,
      required: [true, 'Stripe subscription ID is required']
    },
    stripePriceId: {
      type: String,
      required: [true, 'Stripe price ID is required']
    },
    currentPeriodStart: {
      type: Date,
      required: [true, 'Current period start date is required']
    },
    currentPeriodEnd: {
      type: Date,
      required: [true, 'Current period end date is required']
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false
    },
    quantity: {
      type: Number,
      min: 1,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

// Create index for faster queries
subscriptionSchema.index({ userId: 1, type: 1, status: 1 });

const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription; 