// Mock data service for development without a backend

// Sample lab tests data
export const mockLabTests = [
  {
    _id: "1",
    name: "Complete Blood Count",
    provider: "LabCorp",
    date: "2023-06-15",
    type: "blood",
    status: "completed",
    results: [
      { name: "White Blood Cell Count", value: 7.2, unit: "K/uL", isAbnormal: false },
      { name: "Red Blood Cell Count", value: 4.9, unit: "M/uL", isAbnormal: false },
      { name: "Hemoglobin", value: 15.2, unit: "g/dL", isAbnormal: false },
      { name: "Hematocrit", value: 44.1, unit: "%", isAbnormal: false },
      { name: "Platelet Count", value: 210, unit: "K/uL", isAbnormal: false }
    ]
  },
  {
    _id: "2",
    name: "Comprehensive Metabolic Panel",
    provider: "Quest Diagnostics",
    date: "2023-05-10",
    type: "blood",
    status: "completed",
    results: [
      { name: "Glucose", value: 105, unit: "mg/dL", isAbnormal: true },
      { name: "Calcium", value: 9.5, unit: "mg/dL", isAbnormal: false },
      { name: "Sodium", value: 141, unit: "mmol/L", isAbnormal: false },
      { name: "Potassium", value: 4.2, unit: "mmol/L", isAbnormal: false },
      { name: "CO2", value: 24, unit: "mmol/L", isAbnormal: false },
      { name: "Chloride", value: 101, unit: "mmol/L", isAbnormal: false },
      { name: "BUN", value: 18, unit: "mg/dL", isAbnormal: false },
      { name: "Creatinine", value: 0.9, unit: "mg/dL", isAbnormal: false },
      { name: "ALT", value: 32, unit: "U/L", isAbnormal: false },
      { name: "AST", value: 28, unit: "U/L", isAbnormal: false }
    ]
  },
  {
    _id: "3",
    name: "Lipid Panel",
    provider: "LabCorp",
    date: "2023-04-22",
    type: "blood",
    status: "completed",
    results: [
      { name: "Total Cholesterol", value: 215, unit: "mg/dL", isAbnormal: true },
      { name: "Triglycerides", value: 150, unit: "mg/dL", isAbnormal: false },
      { name: "HDL Cholesterol", value: 48, unit: "mg/dL", isAbnormal: false },
      { name: "LDL Cholesterol", value: 145, unit: "mg/dL", isAbnormal: true },
      { name: "Total Cholesterol/HDL Ratio", value: 4.5, unit: "", isAbnormal: false }
    ]
  },
  {
    _id: "4",
    name: "Vitamin D, 25-Hydroxy",
    provider: "Quest Diagnostics",
    date: "2023-03-05",
    type: "blood",
    status: "completed",
    results: [
      { name: "Vitamin D, 25-Hydroxy", value: 28, unit: "ng/mL", isAbnormal: true }
    ]
  },
  {
    _id: "5",
    name: "Thyroid Panel",
    provider: "LabCorp",
    date: "2023-02-18",
    type: "blood",
    status: "completed",
    results: [
      { name: "TSH", value: 2.4, unit: "uIU/mL", isAbnormal: false },
      { name: "T4, Free", value: 1.1, unit: "ng/dL", isAbnormal: false },
      { name: "T3, Free", value: 3.1, unit: "pg/mL", isAbnormal: false }
    ]
  }
];

// Sample supplements data
export const mockSupplements = [
  {
    _id: "s1",
    name: "Vitamin D3",
    description: "Essential vitamin for bone health and immune function. Vitamin D3 helps your body absorb calcium and maintain proper calcium and phosphate levels.",
    category: "Vitamin",
    benefits: ["Supports bone health", "Enhances immune function", "Improves mood"],
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    price: 19.99,
    inStock: true
  },
  {
    _id: "s2",
    name: "Omega-3 Fish Oil",
    description: "High-quality fish oil supplement providing essential EPA and DHA fatty acids that support heart, brain, and joint health.",
    category: "Essential Fatty Acid",
    benefits: ["Promotes heart health", "Supports brain function", "Reduces inflammation"],
    imageUrl: "https://images.unsplash.com/photo-1535185384036-28bbc8035f28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    price: 24.95,
    inStock: true
  },
  {
    _id: "s3",
    name: "Magnesium Glycinate",
    description: "Highly bioavailable form of magnesium that supports muscle relaxation, nerve function, and helps maintain healthy sleep patterns.",
    category: "Mineral",
    benefits: ["Supports muscle function", "Promotes relaxation", "Aids sleep quality"],
    imageUrl: "https://images.pexels.com/photos/6692508/pexels-photo-6692508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    price: 18.50,
    inStock: true
  },
  {
    _id: "s4",
    name: "CoQ10",
    description: "Coenzyme Q10 is a powerful antioxidant that supports cellular energy production and protects against oxidative stress.",
    category: "Antioxidant",
    benefits: ["Supports heart health", "Boosts energy production", "Reduces oxidative stress"],
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951b55ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    price: 29.99,
    inStock: false
  },
  {
    _id: "s5",
    name: "Berberine",
    description: "Natural compound extracted from several plants that supports healthy blood sugar levels and cardiovascular function.",
    category: "Herbal",
    benefits: ["Supports glucose metabolism", "Promotes heart health", "Aids digestive health"],
    imageUrl: "https://images.pexels.com/photos/4024711/pexels-photo-4024711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 34.95,
    inStock: true
  }
];

// Sample recommendations data
export const mockRecommendations = [
  {
    _id: "r1",
    supplementId: {
      _id: "s1",
      name: "Vitamin D3",
      category: "Vitamin",
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      price: 19.99
    },
    labTestId: {
      _id: "4",
      name: "Vitamin D, 25-Hydroxy",
      date: "2023-03-05"
    },
    reason: "Your Vitamin D level is 28 ng/mL, which is below the optimal range (30-50 ng/mL). Supplementing with Vitamin D3 can help support immune function, bone health, and mood.",
    priority: 8,
    dosage: "2,000 IU daily with a meal containing healthy fats for optimal absorption.",
    isAccepted: false
  },
  {
    _id: "r2",
    supplementId: {
      _id: "s2",
      name: "Omega-3 Fish Oil",
      category: "Essential Fatty Acid",
      imageUrl: "https://images.unsplash.com/photo-1535185384036-28bbc8035f28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      price: 24.95
    },
    labTestId: {
      _id: "3",
      name: "Lipid Panel",
      date: "2023-04-22"
    },
    reason: "Your LDL cholesterol is elevated at 145 mg/dL. Omega-3 fatty acids can help improve your lipid profile and support cardiovascular health.",
    priority: 7,
    dosage: "1,000 mg of combined EPA/DHA daily with food.",
    isAccepted: false
  },
  {
    _id: "r3",
    supplementId: {
      _id: "s5",
      name: "Berberine",
      category: "Herbal",
      imageUrl: "https://images.pexels.com/photos/4024711/pexels-photo-4024711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 34.95
    },
    labTestId: {
      _id: "2",
      name: "Comprehensive Metabolic Panel",
      date: "2023-05-10"
    },
    reason: "Your glucose level is 105 mg/dL, which is in the prediabetic range. Berberine has been shown to help support healthy blood sugar levels.",
    priority: 6,
    dosage: "500 mg three times daily with meals.",
    isAccepted: false
  },
  {
    _id: "r4",
    supplementId: {
      _id: "s3",
      name: "Magnesium Glycinate",
      category: "Mineral",
      imageUrl: "https://images.pexels.com/photos/6692508/pexels-photo-6692508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      price: 18.50
    },
    labTestId: {
      _id: "1",
      name: "Complete Blood Count",
      date: "2023-06-15"
    },
    reason: "Magnesium is a cofactor in over 300 enzymatic reactions and supports muscle function, sleep quality, and stress management.",
    priority: 5,
    dosage: "300 mg daily, preferably in the evening to support relaxation and sleep.",
    isAccepted: false
  }
];

// Mock API responses
export const mockApiResponses = {
  getLabTests: {
    success: true,
    data: mockLabTests
  },
  getLabTestById: (id) => ({
    success: true,
    data: mockLabTests.find(test => test._id === id) || null
  }),
  createLabTest: (data) => {
    const newTest = {
      _id: Math.random().toString(36).substring(2, 10),
      ...data,
      status: "completed"
    };
    return {
      success: true,
      data: newTest
    };
  },
  getRecommendations: {
    success: true,
    data: mockRecommendations
  }
}; 