import React, { useState, useEffect } from 'react';
import { Blockquote, Center, Loader, Title, useMantineTheme } from '@mantine/core';
import Layout from 'components/layout';
import getStripe from 'lib/stripe';
import { PaymentIntent } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { fetchPostJSON } from 'util/api/fetch';
import DonationForm from 'components/donationForm';
import { MAX_AMOUNT, AMOUNT_STEP } from 'util/stripe';

export default function Donation() {
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  useEffect(() => {
    fetchPostJSON('/api/private/donation/payment_intents', {
      amount: Math.round(MAX_AMOUNT / AMOUNT_STEP),
    }).then((data: any) => {
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
