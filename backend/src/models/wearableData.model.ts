import mongoose, { Document, Schema } from 'mongoose';

export enum WearableDeviceType {
  APPLE_WATCH = 'apple_watch',
  FITBIT = 'fitbit',
  GARMIN = 'garmin',
  OURA = 'oura',
  WHOOP = 'whoop',
  OTHER = 'other'
}

export enum DataType {
  HEART_RATE = 'heart_rate',
  HRV = 'hrv',
  SLEEP = 'sleep',
  STEPS = 'steps',
  CALORIES = 'calories',
  EXERCISE = 'exercise',
  OXYGEN = 'oxygen',
  TEMPERATURE = 'temperature',
  STRESS = 'stress'
}

export interface ISleepStage {
  stage: 'awake' | 'light' | 'deep' | 'rem';
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
}

export interface IExerciseSession {
  type: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  caloriesBurned?: number;
  distance?: number;
  avgHeartRate?: number;
}

export interface IWearableData extends Document {
  userId: mongoose.Types.ObjectId;
  deviceType: WearableDeviceType;
  dataType: DataType;
  date: Date;
  heartRate?: {
    avg: number;
    min: number;
    max: number;
    resting: number;
  };
  hrv?: {
    sdnn: number; // Standard deviation of NN intervals
    rmssd: number; // Root mean square of successive differences
  };
  sleep?: {
    totalDuration: number; // in minutes
    efficiency: number; // percentage 0-100
    stages: ISleepStage[];
  };
  steps?: number;
  calories?: number;
  exercise?: IExerciseSession[];
  oxygenSaturation?: number; // percentage 0-100
  temperature?: number; // in celsius
  stress?: number; // vendor-specific stress score
  rawData?: object; // Raw JSON data from the device
  createdAt: Date;
  updatedAt: Date;
}

const sleepStageSchema = new Schema<ISleepStage>({
  stage: {
    type: String,
    enum: ['awake', 'light', 'deep', 'rem'],
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
});

const exerciseSessionSchema = new Schema<IExerciseSession>({
  type: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  caloriesBurned: {
    type: Number
  },
  distance: {
    type: Number
  },
  avgHeartRate: {
    type: Number
  }
});

const wearableDataSchema = new Schema<IWearableData>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    deviceType: {
      type: String,
      enum: Object.values(WearableDeviceType),
      required: [true, 'Device type is required']
    },
    dataType: {
      type: String,
      enum: Object.values(DataType),
      required: [true, 'Data type is required']
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now
    },
    heartRate: {
      avg: Number,
      min: Number,
      max: Number,
      resting: Number
    },
    hrv: {
      sdnn: Number,
      rmssd: Number
    },
    sleep: {
      totalDuration: Number,
      efficiency: Number,
      stages: [sleepStageSchema]
    },
    steps: {
      type: Number
    },
    calories: {
      type: Number
    },
    exercise: [exerciseSessionSchema],
    oxygenSaturation: {
      type: Number,
      min: 0,
      max: 100
    },
    temperature: {
      type: Number
    },
    stress: {
      type: Number
    },
    rawData: {
      type: Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for faster queries
wearableDataSchema.index({ userId: 1, deviceType: 1, dataType: 1, date: -1 });

const WearableData = mongoose.model<IWearableData>('WearableData', wearableDataSchema);

export default WearableData; 