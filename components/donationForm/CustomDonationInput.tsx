import React from 'react';
import { NumberInput, Slider } from '@mantine/core';
import { formatAmountForDisplay } from 'util/stripe';

type Props = {
  name: string;
  value: number;
  min: number;
  max: number;
  currency: string;
  step: number;
  onChange: (v: number) => void;
  className?: string;
};

const CustomDonationInput = ({
  name,
  value,
  min,
  max,
  currency,
  step,
  onChange,
  className,
}: Props) => (
  <>
    <NumberInput
      label={
        window.navigator.language === 'de'
          ? 'Spendenbetrag'
          : 'Custom donation amount ' +
            formatAmountForDisplay(min, currency) +
            ' - ' +
            formatAmountForDisplay(max, currency)
      }
      className={className}
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      m="md"
      size="md"
    />
    <Slider
      m="md"
      size="lg"
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      onChangeEnd={onChange}
    />
  </>
);

export default CustomDonationInput;
