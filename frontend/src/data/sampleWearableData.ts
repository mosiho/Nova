import { v4 as uuidv4 } from 'uuid';

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

export interface SleepStage {
  stage: 'awake' | 'light' | 'deep' | 'rem';
  startTime: string;
  endTime: string;
  duration: number; // in minutes
}

export interface ExerciseSession {
  type: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  caloriesBurned?: number;
  distance?: number;
  avgHeartRate?: number;
}

export interface WearableData {
  _id: string;
  userId: string;
  deviceType: WearableDeviceType;
  dataType: DataType;
  date: string;
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
    stages: SleepStage[];
  };
  steps?: number;
  calories?: number;
  exercise?: ExerciseSession[];
  oxygenSaturation?: number; // percentage 0-100
  temperature?: number; // in celsius
  stress?: number; // vendor-specific stress score
  rawData?: Record<string, any>; // Raw JSON data from the device
  createdAt: string;
  updatedAt: string;
}

// Create a week's worth of sample data
const today = new Date();
const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

export const sampleWearableData: WearableData[] = [
  // Heart Rate Data - 7 days
  ...Array(7).fill(null).map((_, idx) => {
    const date = new Date(today.getTime() - (6 - idx) * oneDay);
    return {
      _id: uuidv4(),
      userId: 'user123',
      deviceType: WearableDeviceType.APPLE_WATCH,
      dataType: DataType.HEART_RATE,
      date: date.toISOString(),
      heartRate: {
        avg: Math.floor(65 + Math.random() * 10),
        min: Math.floor(45 + Math.random() * 5),
        max: Math.floor(120 + Math.random() * 30),
        resting: Math.floor(55 + Math.random() * 5)
      },
      createdAt: new Date(date.getTime() + 12 * 60 * 60 * 1000).toISOString(), // Data synced at noon
      updatedAt: new Date(date.getTime() + 12 * 60 * 60 * 1000).toISOString()
    };
  }),

  // Sleep Data - 7 days
  ...Array(7).fill(null).map((_, idx) => {
    const date = new Date(today.getTime() - (6 - idx) * oneDay);
    const sleepStartTime = new Date(date.getTime() - oneDay + 22 * 60 * 60 * 1000); // 10 PM previous day
    const sleepEndTime = new Date(date.getTime() + 7 * 60 * 60 * 1000); // 7 AM current day
    
    // Create sleep stages
    const sleepStages: SleepStage[] = [];
    let currentTime = sleepStartTime.getTime();
    const sleepEnd = sleepEndTime.getTime();
    
    while (currentTime < sleepEnd) {
      const stageTypes: Array<'awake' | 'light' | 'deep' | 'rem'> = ['light', 'deep', 'rem', 'awake'];
      const stageType = stageTypes[Math.floor(Math.random() * 4)];
      const stageDuration = Math.floor(20 + Math.random() * 60); // 20-80 minutes
      const stageEndTime = new Date(currentTime + stageDuration * 60 * 1000);
      
      sleepStages.push({
        stage: stageType,
        startTime: new Date(currentTime).toISOString(),
        endTime: stageEndTime.toISOString(),
        duration: stageDuration
      });
      
      currentTime = stageEndTime.getTime();
      
      // Break if we've gone past the end time
      if (currentTime > sleepEnd) {
        break;
      }
    }
    
    // Calculate total sleep duration
    const totalDuration = sleepStages.reduce((acc, stage) => acc + (stage.stage !== 'awake' ? stage.duration : 0), 0);
    const efficiency = Math.floor(totalDuration / (sleepStages.reduce((acc, stage) => acc + stage.duration, 0)) * 100);
    
    return {
      _id: uuidv4(),
      userId: 'user123',
      deviceType: WearableDeviceType.APPLE_WATCH,
      dataType: DataType.SLEEP,
      date: date.toISOString(),
      sleep: {
        totalDuration,
        efficiency,
        stages: sleepStages
      },
      createdAt: sleepEndTime.toISOString(),
      updatedAt: sleepEndTime.toISOString()
    };
  }),
  
  // HRV Data - 7 days
  ...Array(7).fill(null).map((_, idx) => {
    const date = new Date(today.getTime() - (6 - idx) * oneDay);
    return {
      _id: uuidv4(),
      userId: 'user123',
      deviceType: WearableDeviceType.APPLE_WATCH,
      dataType: DataType.HRV,
      date: date.toISOString(),
      hrv: {
        sdnn: Math.floor(40 + Math.random() * 20),
        rmssd: Math.floor(30 + Math.random() * 15)
      },
      createdAt: new Date(date.getTime() + 12 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(date.getTime() + 12 * 60 * 60 * 1000).toISOString()
    };
  }),
  
  // Steps Data - 7 days
  ...Array(7).fill(null).map((_, idx) => {
    const date = new Date(today.getTime() - (6 - idx) * oneDay);
    return {
      _id: uuidv4(),
      userId: 'user123',
      deviceType: WearableDeviceType.APPLE_WATCH,
      dataType: DataType.STEPS,
      date: date.toISOString(),
      steps: Math.floor(6000 + Math.random() * 6000), // 6,000 - 12,000 steps
      createdAt: new Date(date.getTime() + 23 * 60 * 60 * 1000).toISOString(), // End of day
      updatedAt: new Date(date.getTime() + 23 * 60 * 60 * 1000).toISOString()
    };
  }),
  
  // Exercise Data - 3 days (not every day has exercise)
  {
    _id: uuidv4(),
    userId: 'user123',
    deviceType: WearableDeviceType.APPLE_WATCH,
    dataType: DataType.EXERCISE,
    date: new Date(today.getTime() - 5 * oneDay).toISOString(), // 5 days ago
    exercise: [
      {
        type: 'Running',
        startTime: new Date(today.getTime() - 5 * oneDay + 8 * 60 * 60 * 1000).toISOString(), // 8 AM
        endTime: new Date(today.getTime() - 5 * oneDay + 9 * 60 * 60 * 1000).toISOString(), // 9 AM
        duration: 60,
        caloriesBurned: 450,
        distance: 7.2,
        avgHeartRate: 155
      }
    ],
    createdAt: new Date(today.getTime() - 5 * oneDay + 9 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 5 * oneDay + 9 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: uuidv4(),
    userId: 'user123',
    deviceType: WearableDeviceType.APPLE_WATCH,
    dataType: DataType.EXERCISE,
    date: new Date(today.getTime() - 3 * oneDay).toISOString(), // 3 days ago
    exercise: [
      {
        type: 'Cycling',
        startTime: new Date(today.getTime() - 3 * oneDay + 17 * 60 * 60 * 1000).toISOString(), // 5 PM
        endTime: new Date(today.getTime() - 3 * oneDay + 18 * 60 * 60 * 1000).toISOString(), // 6 PM
        duration: 45,
        caloriesBurned: 320,
        distance: 15.5,
        avgHeartRate: 142
      }
    ],
    createdAt: new Date(today.getTime() - 3 * oneDay + 18 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 3 * oneDay + 18 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: uuidv4(),
    userId: 'user123',
    deviceType: WearableDeviceType.APPLE_WATCH,
    dataType: DataType.EXERCISE,
    date: new Date(today.getTime() - oneDay).toISOString(), // Yesterday
    exercise: [
      {
        type: 'Strength Training',
        startTime: new Date(today.getTime() - oneDay + 18 * 60 * 60 * 1000).toISOString(), // 6 PM
        endTime: new Date(today.getTime() - oneDay + 19 * 60 * 60 * 1000).toISOString(), // 7 PM
        duration: 60,
        caloriesBurned: 280,
        avgHeartRate: 130
      }
    ],
    createdAt: new Date(today.getTime() - oneDay + 19 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - oneDay + 19 * 60 * 60 * 1000).toISOString()
  },
  
  // Oxygen Saturation Data - 7 days
  ...Array(7).fill(null).map((_, idx) => {
    const date = new Date(today.getTime() - (6 - idx) * oneDay);
    return {
      _id: uuidv4(),
      userId: 'user123',
      deviceType: WearableDeviceType.APPLE_WATCH,
      dataType: DataType.OXYGEN,
      date: date.toISOString(),
      oxygenSaturation: 95 + (Math.random() * 4), // 95-99% oxygen saturation
      createdAt: new Date(date.getTime() + 12 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(date.getTime() + 12 * 60 * 60 * 1000).toISOString()
    };
  }),
  
  // Stress Score Data - 7 days
  ...Array(7).fill(null).map((_, idx) => {
    const date = new Date(today.getTime() - (6 - idx) * oneDay);
    return {
      _id: uuidv4(),
      userId: 'user123',
      deviceType: WearableDeviceType.APPLE_WATCH,
      dataType: DataType.STRESS,
      date: date.toISOString(),
      stress: Math.floor(20 + Math.random() * 60), // 20-80 stress score (lower is better)
      createdAt: new Date(date.getTime() + 20 * 60 * 60 * 1000).toISOString(), // 8 PM
      updatedAt: new Date(date.getTime() + 20 * 60 * 60 * 1000).toISOString()
    };
  }),
]; 