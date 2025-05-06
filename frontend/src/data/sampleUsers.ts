import { v4 as uuidv4 } from 'uuid';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export enum SubscriptionPlan {
  FREE = 'free',
  PREMIUM = 'premium'
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  subscriptionPlan: SubscriptionPlan;
  stripeCustomerId?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export const sampleUsers: User[] = [
  {
    _id: uuidv4(),
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: UserRole.USER,
    subscriptionPlan: SubscriptionPlan.FREE,
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-08-22T15:45:00Z',
    lastLogin: '2023-08-22T15:45:00Z'
  },
  {
    _id: uuidv4(),
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: UserRole.USER,
    subscriptionPlan: SubscriptionPlan.PREMIUM,
    stripeCustomerId: 'cus_JdK8IXxYzMnLop',
    createdAt: '2023-02-10T14:15:00Z',
    updatedAt: '2023-08-20T09:30:00Z',
    lastLogin: '2023-08-20T09:30:00Z'
  },
  {
    _id: uuidv4(),
    email: 'admin@healthapp.com',
    firstName: 'Admin',
    lastName: 'User',
    role: UserRole.ADMIN,
    subscriptionPlan: SubscriptionPlan.PREMIUM,
    createdAt: '2022-12-05T08:00:00Z',
    updatedAt: '2023-08-21T16:20:00Z',
    lastLogin: '2023-08-21T16:20:00Z'
  },
  {
    _id: uuidv4(),
    email: 'michael.johnson@example.com',
    firstName: 'Michael',
    lastName: 'Johnson',
    role: UserRole.USER,
    subscriptionPlan: SubscriptionPlan.FREE,
    createdAt: '2023-03-22T11:45:00Z',
    updatedAt: '2023-08-15T10:30:00Z',
    lastLogin: '2023-08-15T10:30:00Z'
  },
  {
    _id: uuidv4(),
    email: 'sarah.williams@example.com',
    firstName: 'Sarah',
    lastName: 'Williams',
    role: UserRole.USER,
    subscriptionPlan: SubscriptionPlan.PREMIUM,
    stripeCustomerId: 'cus_LmN9POqRsTuVwx',
    createdAt: '2023-01-30T09:20:00Z',
    updatedAt: '2023-08-19T14:15:00Z',
    lastLogin: '2023-08-19T14:15:00Z'
  },
  {
    _id: uuidv4(),
    email: 'david.brown@example.com',
    firstName: 'David',
    lastName: 'Brown',
    role: UserRole.USER,
    subscriptionPlan: SubscriptionPlan.FREE,
    createdAt: '2023-04-05T16:30:00Z',
    updatedAt: '2023-08-10T17:45:00Z',
    lastLogin: '2023-08-10T17:45:00Z'
  },
  {
    _id: uuidv4(),
    email: 'emily.davis@example.com',
    firstName: 'Emily',
    lastName: 'Davis',
    role: UserRole.USER,
    subscriptionPlan: SubscriptionPlan.PREMIUM,
    stripeCustomerId: 'cus_XyZ0AbCdEfGhIj',
    createdAt: '2023-02-28T13:10:00Z',
    updatedAt: '2023-08-18T11:20:00Z',
    lastLogin: '2023-08-18T11:20:00Z'
  }
]; 