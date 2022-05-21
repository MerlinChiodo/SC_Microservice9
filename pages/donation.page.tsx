import React, { useState, useEffect } from 'react';
import Layout from 'components/layout';
import getStripe from 'lib/stripe';
import { PaymentIntent } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { fetchPostJSON } from 'util/api-helpers';
import DonationForm from 'components/donationForm';
import { Center, Loader } from '@mantine/core';

const MAX_AMOUNT = 5000;
const AMOUNT_STEP = 5;

export default function Donation() {
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  useEffect(() => {
    fetchPostJSON('/api/private/donation/payment_intents', {
      amount: Math.round(MAX_AMOUNT / AMOUNT_STEP),
    }).then((data) => {
      setPaymentIntent(data);
    });
  }, [setPaymentIntent]);
  return (
    <Layout>
      <div className="page-container">
        <h1>Donate to support refugees</h1>
        {paymentIntent && paymentIntent.client_secret ? (
          <Elements
            stripe={getStripe()}
            options={{
              appearance: {
                variables: {
                  colorIcon: '#6772e5',
                  fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                },
              },
              clientSecret: paymentIntent.client_secret,
            }}
          >
            <DonationForm paymentIntent={paymentIntent} />
          </Elements>
        ) : (
          <Center>
            <Loader variant="dots" size="xl" />
          </Center>
        )}
      </div>
    </Layout>
  );
}
