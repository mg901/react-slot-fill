import React, { useContext, useEffect, useState } from 'react';
import { string } from 'prop-types';
import { SlotFillContext } from './context';

const useForceUpdate = () => {
  const [value, set] = useState(true);

  return () => set(!value);
};

export const Slot = ({ name, ...props }) => {
  const forceUpdate = useForceUpdate();
  const ctx = useContext(SlotFillContext);
  let slotIndex = null;

  useEffect(() => () => {
    if (!ctx || !ctx.getFillForSlot) {
      throw new Error(
        'Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.',
      );
    }

    if (slotIndex) {
      ctx.unsubscribe(name, slotIndex);
    }
  });

  if (ctx.subscribe) {
    ctx.subscribe(name, (slotIdx) => {
      slotIndex = slotIdx;
      forceUpdate();
    });
  }

  const renderCallback = ctx.getFillForSlot(name);
  const children = renderCallback();

  return !children ? false : React.cloneElement(children, props);
};

Slot.propTypes = {
  name: string.isRequired,
};
