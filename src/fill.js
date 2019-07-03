import { useContext } from 'react';
import { string, node } from 'prop-types';
import { SlotFillContext } from './context';

export const Fill = ({ name, children }) => {
  const ctx = useContext(SlotFillContext);
  if (!ctx || !ctx.setFillForSlot) {
    throw new Error(
      'Fill: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.',
    );
  } else {
    ctx.setFillForSlot(name, () => children);
  }

  return false;
};

Fill.propTypes = {
  name: string.isRequired,
  children: node.isRequired,
};
