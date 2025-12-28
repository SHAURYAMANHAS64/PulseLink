import { loadStripe } from '@stripe/stripe-js';
import apiClient from './apiClient.js';

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_your_key_here';

let stripePromise = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_KEY);
  }
  return stripePromise;
};

export const stripeService = {
  // Create payment intent
  createPaymentIntent: async (amount, currency = 'usd') => {
    try {
      const response = await apiClient.post('/api/payments/create-intent', {
        amount,
        currency
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create payment intent');
    }
  },

  // Process subscription
  createSubscription: async (planId, paymentMethodId) => {
    try {
      const response = await apiClient.post('/api/payments/subscribe', {
        planId,
        paymentMethodId
      });
      return response.data;
    } catch (error) {
      throw new Error('Subscription failed');
    }
  },

  // Get subscription status
  getSubscriptionStatus: async (userId) => {
    try {
      const response = await apiClient.get(`/api/payments/subscription/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch subscription status');
    }
  },

  // Cancel subscription
  cancelSubscription: async (subscriptionId) => {
    try {
      const response = await apiClient.post(`/api/payments/cancel/${subscriptionId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to cancel subscription');
    }
  }
};

// Pricing plans
export const PRICING_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Limited exercises',
      'Basic workout tracking',
      'Community access'
    ]
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    interval: 'month',
    features: [
      'Unlimited exercises',
      'AI workout generation',
      'Advanced analytics',
      'Video tutorials',
      'Priority support'
    ]
  },
  TRAINER: {
    id: 'trainer',
    name: 'Trainer',
    price: 19.99,
    interval: 'month',
    features: [
      'Everything in Premium',
      'Become a trainer',
      'Create training plans',
      'Client management',
      'Advanced analytics for clients',
      'Commission on referrals'
    ]
  }
};
