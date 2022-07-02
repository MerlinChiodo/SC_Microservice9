import React, { useState, FC, useEffect } from 'react';
import { ActionIcon, Button, Center, Loader, Stack, Text, TextInput, Paper } from '@mantine/core';
import { PaymentIntent } from '@stripe/stripe-js';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { fetchPostJSON } from 'util/api/fetch';
import { formatAmountFromStripe, formatAmountForDisplay } from 'util/stripe';
import * as config from 'lib/stripe/config';
import CustomDonationInput from './CustomDonationInput';
import { useAuth } from 'context/auth';
import { Refresh } from 'tabler-icons-react';
import { useStyles } from './styles';

const DonationForm: FC<{
  paymentIntent?: PaymentIntent | null;
  setNewPaymentIntent: Function;
}> = ({ paymentIntent = null, setNewPaymentIntent }) => {
  const defaultAmount = paymentIntent
    ? formatAmountFromStripe(paymentIntent.amount, paymentIntent.currency)
    : Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP);
  const auth = useAuth();
  const [customDonation, setCustomDonation] = useState(defaultAmount);
  const [cardholderName, setCardholderName] = useState(
    auth.user ? auth.user.firstname + ' ' + auth.user.lastname : ''
  );
  const [paymentType, setPaymentType] = useState('');
  const [payment, setPayment] = useState({ status: 'initial' });
  const [errorMessage, setErrorMessage] = useState('');
  const [eventMessage, setEventMessage] = useState<string | null>();
  const stripe = useStripe();
  const elements = useElements();
  const { classes } = useStyles();

  useEffect(() => {
    setCardholderName(auth.user ? auth.user.firstname + ' ' + auth.user.lastname : '');
  }, [auth.user, setCardholderName]);

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return (
          <Text component="p" weight={700} color="dimmed">
            Processing...
          </Text>
        );
      case 'requires_action':
        return (
          <Text component="p" weight={700} color="dimmed">
            Authentication...
          </Text>
        );
      case 'succeeded':
        if (eventMessage) {
          return (
            <Stack spacing="xs" align="center">
              <Text weight={700}>🥳 Thank you {cardholderName} for your donation!</Text>
              <Text size="sm" weight={500} color="dimmed">
                {eventMessage}
              </Text>
            </Stack>
          );
        }
        return <Text weight={700}>🥳 Thank you {cardholderName} for your donation!</Text>;
      case 'error':
        return (
          <Stack spacing="xs" align="center">
            <Text weight={700}>Error 😭 Please Contact Support Team</Text>
            <Text size="sm" color="dimmed" weight={500}>
              {errorMessage}
            </Text>
          </Stack>
        );
      default:
        return null;
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCardholderName(e.target.value);
  };
  const handleInputChangeNumber = (v: number) => {
    setCustomDonation(v);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // Abort if form isn't valid
    if (!e.currentTarget.reportValidity()) return;
    if (!elements) return;
    setPayment({ status: 'processing' });

    if (auth.user && cardholderName == '') {
      setCardholderName(auth.user.firstname + ' ' + auth.user.lastname);
    }

    // Create a PaymentIntent with the specified amount.
    const response = await fetchPostJSON('/api/private/donation/payment_intents', {
      amount: customDonation,
      payment_intent_id: paymentIntent?.id,
    });
    setPayment(response);

    if (response.statusCode === 500) {
      setPayment({ status: 'error' });
      setErrorMessage(response.message);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const res = await stripe!.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: cardholderName,
          },
        },
      },
      redirect: 'if_required',
    });

    if (res.error) {
      setPayment({ status: 'error' });
      setErrorMessage(res.error.message ?? 'An unknown error occurred');
    } else if (paymentIntent) {
      if (auth.user) {
        await fetchPostJSON('/api/private/donation/publish', {
          amount: customDonation,
          citizen_id: auth.user.citizen_id,
        })
          .then(() => setEventMessage('Your donation has been transferred to Finanzamt.'))
          .catch(() =>
            setEventMessage(
              'Your donation could not be transferred to Finanzamt. Please Contact Support Team to resolve the issue.'
            )
          );
      }
      setPayment(res.paymentIntent);
    }
  };

  return (
    <>
      <Paper shadow="sm" p="md" m="md" withBorder className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <CustomDonationInput
            className="elements-style"
            name="customDonation"
            value={customDonation}
            min={config.MIN_AMOUNT}
            max={config.MAX_AMOUNT}
            step={config.AMOUNT_STEP}
            currency={config.CURRENCY}
            onChange={handleInputChangeNumber}
          />
          {paymentType === 'card' ? (
            <TextInput
              label={window.navigator.language == 'de' ? 'Karteninhaber' : 'Cardholder name'}
              placeholder="Cardholder name"
              type="text"
              name="cardholderName"
              value={cardholderName}
              onChange={handleInputChange}
              size="md"
              mb="sm"
              required
              styles={{ required: { display: 'none' } }}
            />
          ) : (
            <Center>
              <Loader variant="dots" size="xl" />
            </Center>
          )}
          <div className="FormRow elements-style">
            <PaymentElement
              onChange={(e) => {
                setPaymentType(e.value.type);
              }}
            />
          </div>
          <Center>
            <Button
              size="lg"
              radius="md"
              m="xl"
              type="submit"
              disabled={!['initial', 'error'].includes(payment.status) || !stripe}
              uppercase
            >
              Donate {formatAmountForDisplay(customDonation, config.CURRENCY)}
            </Button>
            <ActionIcon
              style={{ display: ['succeeded'].includes(payment.status) ? 'block' : 'none' }}
              onClick={() => {
                setNewPaymentIntent(true);
              }}
            >
              <Refresh size={18} />
            </ActionIcon>
          </Center>
        </form>
        <Center>
          <PaymentStatus status={payment.status} />
        </Center>
      </Paper>
    </>
  );
};

export default DonationForm;
