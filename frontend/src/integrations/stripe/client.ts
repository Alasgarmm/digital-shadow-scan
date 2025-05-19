import { loadStripe } from '@stripe/stripe-js';

const {VITE_STRIPE_PUBLISHABLE_KEY} = import.meta.env;

export const stripePromise = loadStripe(VITE_STRIPE_PUBLISHABLE_KEY);