import { v4 as uuidv4 } from 'uuid';

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

export interface HealthCondition {
  name: string;
  description: string;
}

export interface Supplement {
  _id: string;
  name: string;
  description: string;
  benefits: string[];
  category: SupplementCategory;
  recommendedDosage: string;
  recommendedForConditions: HealthCondition[];
  contraindications: string[];
  price: number;
  imageUrl?: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export const sampleSupplements: Supplement[] = [
  {
    _id: uuidv4(),
    name: 'Vitamin D3 (5000 IU)',
    description: 'High-potency vitamin D3 supplement to support immune health, bone strength, and overall wellbeing.',
    benefits: [
      'Supports immune system function',
      'Promotes calcium absorption for bone health',
      'Helps maintain healthy mood and cognitive function',
      'Supports cardiovascular health'
    ],
    category: SupplementCategory.VITAMIN,
    recommendedDosage: 'Take 1 softgel daily with a meal containing fat for optimal absorption.',
    recommendedForConditions: [
      {
        name: 'Vitamin D Deficiency',
        description: 'For individuals with insufficient levels of vitamin D as determined by blood tests.'
      },
      {
        name: 'Seasonal Affective Disorder',
        description: 'May help improve mood during winter months or periods of limited sun exposure.'
      },
      {
        name: 'Osteoporosis Prevention',
        description: 'Supports bone health and may help prevent bone density loss when combined with calcium.'
      }
    ],
    contraindications: [
      'Not recommended for individuals with hypercalcemia',
      'May interact with some medications including steroids and weight loss drugs',
      'Consult healthcare provider if you have kidney disease or are taking digoxin'
    ],
    price: 24.99,
    imageUrl: '/images/supplements/vitamin-d3.jpg',
    inStock: true,
    createdAt: '2023-01-15T08:30:00Z',
    updatedAt: '2023-06-20T14:15:00Z'
  },
  {
    _id: uuidv4(),
    name: 'Magnesium Glycinate (400mg)',
    description: 'Highly bioavailable form of magnesium bound to glycine for enhanced absorption and minimal digestive discomfort.',
    benefits: [
      'Supports muscle relaxation and recovery',
      'Promotes healthy sleep patterns',
      'Helps maintain nervous system function',
      'Supports energy production at cellular level',
      'Assists in maintaining heart rhythm and cardiovascular health'
    ],
    category: SupplementCategory.MINERAL,
    recommendedDosage: 'Take 2 capsules daily, preferably in the evening or before bedtime.',
    recommendedForConditions: [
      {
        name: 'Muscle Tension',
        description: 'Helps relax muscles and may reduce cramping or spasms.'
      },
      {
        name: 'Sleep Difficulties',
        description: 'Supports the body\'s natural sleep cycle and promotes restful sleep.'
      },
      {
        name: 'Stress Management',
        description: 'Helps the body respond to stress by supporting nervous system function.'
      }
    ],
    contraindications: [
      'May cause drowsiness in some individuals',
      'Not recommended for those with severe kidney disease',
      'May interact with certain antibiotics and medications'
    ],
    price: 32.95,
    imageUrl: '/images/supplements/magnesium-glycinate.jpg',
    inStock: true,
    createdAt: '2023-02-10T10:45:00Z',
    updatedAt: '2023-07-12T11:30:00Z'
  },
  {
    _id: uuidv4(),
    name: 'Omega-3 Fish Oil (1000mg)',
    description: 'Ultra-pure, molecularly distilled fish oil providing essential EPA and DHA omega-3 fatty acids to support heart, brain, and joint health.',
    benefits: [
      'Supports cardiovascular health and normal blood pressure',
      'Promotes cognitive function and brain health',
      'Helps maintain joint mobility and comfort',
      'Supports healthy inflammatory response',
      'Promotes eye health and vision'
    ],
    category: SupplementCategory.OMEGA,
    recommendedDosage: 'Take 2 softgels daily with meals, or as directed by your healthcare provider.',
    recommendedForConditions: [
      {
        name: 'Cardiovascular Support',
        description: 'Helps maintain healthy triglyceride levels and supports overall heart health.'
      },
      {
        name: 'Cognitive Health',
        description: 'Provides essential fatty acids needed for optimal brain function throughout life.'
      },
      {
        name: 'Joint Discomfort',
        description: 'Supports the body\'s natural anti-inflammatory processes to promote joint comfort.'
      }
    ],
    contraindications: [
      'May interact with blood thinning medications',
      'Not recommended for those with fish or shellfish allergies',
      'Discontinue use 2 weeks before surgery'
    ],
    price: 29.99,
    imageUrl: '/images/supplements/omega-3.jpg',
    inStock: true,
    createdAt: '2023-01-25T09:15:00Z',
    updatedAt: '2023-08-05T16:20:00Z'
  },
  {
    _id: uuidv4(),
    name: 'Probiotic Complex (50 Billion CFU)',
    description: 'Multi-strain probiotic supplement with delayed-release technology to support gut microbiome diversity and digestive health.',
    benefits: [
      'Supports healthy digestive function',
      'Helps maintain intestinal barrier integrity',
      'Supports immune system function',
      'May help reduce occasional bloating and gas',
      'Promotes regular bowel movements'
    ],
    category: SupplementCategory.PROBIOTIC,
    recommendedDosage: 'Take 1 capsule daily with or without food. For enhanced results, take on an empty stomach.',
    recommendedForConditions: [
      {
        name: 'Digestive Discomfort',
        description: 'Helps balance gut flora to support healthy digestion and reduce occasional discomfort.'
      },
      {
        name: 'Antibiotic Recovery',
        description: 'Helps replenish beneficial bacteria after courses of antibiotics.'
      },
      {
        name: 'Immune Support',
        description: 'Supports the gut-immune connection for overall immune health.'
      }
    ],
    contraindications: [
      'Not recommended for severely immunocompromised individuals without medical supervision',
      'May cause temporary digestive adjustment symptoms in some individuals',
      'Contains trace milk proteins - not suitable for those with severe milk allergies'
    ],
    price: 42.99,
    imageUrl: '/images/supplements/probiotic.jpg',
    inStock: true,
    createdAt: '2023-03-05T11:20:00Z',
    updatedAt: '2023-07-18T13:40:00Z'
  },
  {
    _id: uuidv4(),
    name: 'Ashwagandha Root Extract (600mg)',
    description: 'Standardized KSM-66 Ashwagandha extract to support stress response, energy levels, and overall vitality.',
    benefits: [
      'Helps the body adapt to and manage stress',
      'Supports balanced mood and mental wellbeing',
      'Promotes healthy energy levels and reduces fatigue',
      'Supports immune system function',
      'May help support cognitive function under stress'
    ],
    category: SupplementCategory.HERB,
    recommendedDosage: 'Take 1 capsule twice daily with meals, or as recommended by a healthcare professional.',
    recommendedForConditions: [
      {
        name: 'Stress Management',
        description: 'Adaptogenic properties help the body respond to and recover from various stressors.'
      },
      {
        name: 'Fatigue',
        description: 'Supports energy production and reduces feelings of exhaustion.'
      },
      {
        name: 'Sleep Quality',
        description: 'Helps promote relaxation and restful sleep without causing drowsiness.'
      }
    ],
    contraindications: [
      'Not recommended during pregnancy or breastfeeding',
      'May interact with thyroid medications or immunosuppressants',
      'May lower blood sugar - use caution if taking diabetes medications'
    ],
    price: 34.95,
    imageUrl: '/images/supplements/ashwagandha.jpg',
    inStock: false,
    createdAt: '2023-02-18T14:30:00Z',
    updatedAt: '2023-08-22T09:15:00Z'
  },
  {
    _id: uuidv4(),
    name: 'N-Acetyl Cysteine (NAC) 600mg',
    description: 'Powerful amino acid derivative that supports glutathione production, respiratory health, and cellular detoxification.',
    benefits: [
      'Supports the body\'s most important antioxidant, glutathione',
      'Promotes respiratory health and normal mucus viscosity',
      'Supports liver detoxification pathways',
      'May help with immune system regulation',
      'Supports cognitive health'
    ],
    category: SupplementCategory.AMINO_ACID,
    recommendedDosage: 'Take 1 capsule 1-2 times daily between meals, or as directed by a healthcare practitioner.',
    recommendedForConditions: [
      {
        name: 'Respiratory Support',
        description: 'Helps maintain clear airways and supports normal respiratory function.'
      },
      {
        name: 'Detoxification Support',
        description: 'Aids the body\'s natural detoxification processes, particularly in the liver.'
      },
      {
        name: 'Oxidative Stress',
        description: 'Helps the body manage oxidative stress through glutathione support.'
      }
    ],
    contraindications: [
      'Not recommended for those taking nitroglycerin or certain blood thinners',
      'May interact with some medications for chemotherapy',
      'Consult physician if you have asthma or are taking medications for asthma'
    ],
    price: 38.50,
    imageUrl: '/images/supplements/nac.jpg',
    inStock: true,
    createdAt: '2023-04-12T10:25:00Z',
    updatedAt: '2023-08-30T15:10:00Z'
  }
]; 