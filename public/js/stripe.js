/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
import { loadStripe } from '@stripe/stripe-js';

export const bookTour = async tourId => {
  const stripe = await loadStripe(
    'pk_test_51RKzeHQY2l6abGZUoPntw4XnlxYRnmejSxkXjRfGAGJGumtsc7FVQJ42Ai6ggPxwS8Q2GWddiMHBXeRvvm2SXwdM005SZVbHBp'
  );

  try {
    // 1) Get Checkout session
    const response = await axios.get(
      `/api/v1/booking/checkout-session/${tourId}`
    );
    const session = response.data.session;

    // 2) Redirect to checkout form
    await stripe.redirectToCheckout({
      sessionId: session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error');
  }
};
