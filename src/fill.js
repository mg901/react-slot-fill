import { useContext } from 'react';
import { SlotFillContext } from './context';

export const Fill = ({ name, children }) => {
  const ctx = useContext(SlotFillContext);

  if (!ctx || !ctx.setFillForSlot) {
    throw new Error(
      `Fill: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`,
    );
  } else {
    if (!name) {
      throw new Error('Fill: id is null or undefined.');
    }

    if (Array.isArray(children) && children.length === 0) {
      throw new Error('Fill: children array is empty.');
    }

    ctx.setFillForSlot(name, () => children);
  }

  return false;
};
