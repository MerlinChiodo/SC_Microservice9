import type { Employee as EmployeeType} from '@prisma/client';
import React, { useState } from 'react';
import { Group } from '@mantine/core';
import Employee from 'components/employee';
import PrevButton from 'components/buttons/prev';
import NextButton from 'components/buttons/next';

export default function TeamShowcase({ data }: { data: EmployeeType[] }) {
  const [left, setLeft] = useState(0);
  const [middle, setMiddle] = useState(1);
  const [right, setRight] = useState(2);
  const employees = data.map((employee, index) => {
    return <Employee employee={employee} key={index} />;
  });
  const size = employees.length - 1;

  const handlePrev = () => {
    switch (left - 3) {
      case -1:
        setLeft(size);
        break;
      case -2:
        setLeft(size - 1);
        break;
      case -3:
        setLeft(size - 2);
        break;
      default:
        setLeft(left - 3);
    }
    switch (middle - 3) {
      case -1:
        setMiddle(size);
        break;
      case -2:
        setMiddle(size - 1);
        break;
      case -3:
        setMiddle(size - 2);
        break;
      default:
        setMiddle(middle - 3);
    }
    switch (right - 3) {
      case -1:
        setRight(size);
        break;
      case -2:
        setRight(size - 1);
        break;
      case -3:
        setRight(size - 2);
        break;
      default:
        setRight(right - 3);
    }
  };
  const handleNext = () => {
    switch (left + 3) {
      case size + 1:
        setLeft(0);
        break;
      case size + 2:
        setLeft(0 + 1);
        break;
      case size + 3:
        setLeft(0 + 2);
        break;
      default:
        setLeft(left + 3);
    }
    switch (middle + 3) {
      case size + 1:
        setMiddle(0);
        break;
      case size + 2:
        setMiddle(0 + 1);
        break;
      case size + 3:
        setMiddle(0 + 2);
        break;
      default:
        setMiddle(middle + 3);
    }
    switch (right + 3) {
      case size + 1:
        setRight(0);
        break;
      case size + 2:
        setRight(0 + 1);
        break;
      case size + 3:
        setRight(0 + 2);
        break;
      default:
        setRight(right + 3);
    }
  };

  return (
    <>
      <Group position="center" noWrap>
        <PrevButton onClick={handlePrev} />
        <Group>
          {employees[left]}
          {employees[middle]}
          {employees[right]}
        </Group>

        <NextButton onClick={handleNext} />
      </Group>
    </>
  );
}
