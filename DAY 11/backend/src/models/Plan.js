const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  operator: {
    type: String,
    required: true,
    enum: ['Jio', 'Airtel', 'Vi', 'BSNL']
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  validity: {
    type: Number,
    required: true // in days
  },
  data: {
    type: String,
    required: true
  },
  calls: {
    type: String,
    default: 'Unlimited'
  },
  sms: {
    type: String,
    default: '100/day'
  },
  benefits: [{
    type: String
  }],
  isPopular: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['prepaid', 'postpaid', 'data'],
    default: 'prepaid'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);