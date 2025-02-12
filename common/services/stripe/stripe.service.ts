import { Stripe } from 'stripe';

export const stripe = new Stripe(
  'STRIPE_VERIFICATION_SERVICES',
  { apiVersion: '2023-08-16' }
);

// stripe.charges.list({});
