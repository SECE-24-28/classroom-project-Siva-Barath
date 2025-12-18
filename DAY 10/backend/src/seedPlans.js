const mongoose = require('mongoose');
const Plan = require('./models/Plan');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/topify');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const samplePlans = [
  // Jio Plans
  {
    operator: 'Jio',
    name: 'Popular Plan',
    price: 199,
    validity: 28,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioCinema', 'JioTV'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Jio',
    name: 'Data Booster',
    price: 299,
    validity: 28,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioCinema', 'JioSaavn'],
    isPopular: false,
    category: 'data'
  },
  {
    operator: 'Jio',
    name: 'Long Validity',
    price: 666,
    validity: 84,
    data: '1.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['JioCinema'],
    isPopular: false,
    category: 'validity'
  },

  // Airtel Plans
  {
    operator: 'Airtel',
    name: 'Smart Plan',
    price: 179,
    validity: 28,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Wynk Music', 'Airtel Thanks'],
    isPopular: true,
    category: 'popular'
  },
  {
    operator: 'Airtel',
    name: 'Premium Plan',
    price: 399,
    validity: 28,
    data: '2.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Amazon Prime', 'Wynk Music'],
    isPopular: false,
    category: 'unlimited'
  },

  // Vi Plans
  {
    operator: 'Vi',
    name: 'Value Plan',
    price: 157,
    validity: 28,
    data: '1GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies & TV'],
    isPopular: false,
    category: 'popular'
  },
  {
    operator: 'Vi',
    name: 'Max Plan',
    price: 359,
    validity: 28,
    data: '2.5GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: ['Vi Movies & TV', 'Weekend Data Rollover'],
    isPopular: false,
    category: 'unlimited'
  },

  // BSNL Plans
  {
    operator: 'BSNL',
    name: 'Budget Plan',
    price: 97,
    validity: 28,
    data: '2GB total',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: [],
    isPopular: false,
    category: 'popular'
  },
  {
    operator: 'BSNL',
    name: 'Long Term',
    price: 397,
    validity: 150,
    data: '2GB/day',
    calls: 'Unlimited',
    sms: '100/day',
    benefits: [],
    isPopular: false,
    category: 'validity'
  }
];

const seedPlans = async () => {
  try {
    await connectDB();
    
    // Clear existing plans
    await Plan.deleteMany({});
    console.log('Cleared existing plans');
    
    // Insert sample plans
    await Plan.insertMany(samplePlans);
    console.log('Sample plans inserted successfully');
    
    console.log(`✅ Seeded ${samplePlans.length} plans`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding plans:', error);
    process.exit(1);
  }
};

seedPlans();