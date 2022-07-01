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
  const theme = useMantineTheme();
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  const [newPaymentIntent, setNewPaymentIntent] = useState(true);
  useEffect(() => {
    if (newPaymentIntent) {
      setPaymentIntent(null);
      fetchPostJSON('/api/private/donation/payment_intents', {
        amount: Math.round(MAX_AMOUNT / AMOUNT_STEP),
      }).then((data) => {
        setPaymentIntent(data);
      });
      setNewPaymentIntent(false);
    }
  }, [setPaymentIntent, newPaymentIntent]);

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Title>Donation</Title>
        <Blockquote cite="– Winston S. Churchill">
          We make a living by what we get. We make a life by what we give.
        </Blockquote>
        <div>
          {paymentIntent && paymentIntent.client_secret ? (
            <Elements
              stripe={getStripe()}
              options={{
                appearance: {
                  theme: 'none',
                  labels: 'above',
                  variables: {
                    colorPrimary: theme.primaryColor,
                    colorBackground: theme.colorScheme === 'dark' ? theme.colors.dark[5] : 'white',
                    colorText: theme.colorScheme === 'dark' ? theme.colors.dark[1] : 'black',
                    colorIcon: '#6772e5',
                    fontFamily: theme.fontFamily,
                  },
                  rules: {
                    '.Input': {
                      border:
                        theme.colorScheme === 'dark'
                          ? '1px solid transparent'
                          : '1px solid #ced4da',
                      fontSize: '16px',
                      color: theme.colorScheme === 'dark' ? '#C1C2C5' : 'black',
                    },
                    '.Input:focus': {
                      outline: 'none',
                      borderColor: '#1971c2',
                    },
                    '.Input::placeholder': {
                      color: theme.colorScheme === 'dark' ? '#5c5f66' : '#adb5bd',
                    },
                    '.Label': {
                      marginBottom: '4px',
                      fontSize: '16px',
                      fontWeight: '500',
                      color: theme.colorScheme === 'dark' ? '#C1C2C5' : 'black',
                    },
                  },
                },
                clientSecret: paymentIntent.client_secret,
              }}
            >
              <DonationForm
                paymentIntent={paymentIntent}
                setNewPaymentIntent={setNewPaymentIntent}
              />
            </Elements>
          ) : (
            <Center>
              <Loader variant="dots" size="xl" />
            </Center>
          )}
        </div>
      </div>
    </Layout>
  );
}
