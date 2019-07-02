import React, { useContext, useEffect, useState } from 'react';
import { SlotFillContext } from '../context';

const useForceUpdate = (initialState) => {
  const [value, set] = useState(initialState);

  return () => set(!value);
};

export const Slot = ({ name, ...props }) => {
  let slotIndex = null;
  const forceUpdate = useForceUpdate(true);
  const ctx = useContext(SlotFillContext);

  useEffect(() => {
    return () => {
      if (!ctx || !ctx['getFillForSlot']) {
        throw new Error(
          'Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.',
        );
      }

      if (slotIndex) {
        ctx.unsubscribe(name, slotIndex);
      }
    };
  });

  if (ctx.subscribe) {
    ctx.subscribe(name, (slotIdx) => {
      slotIndex = slotIdx;
      forceUpdate();
    });
  }

  if (!name) throw new Error(`Slot: You forget to pass id to <Slot>`);

  const renderCallback = ctx.getFillForSlot(name);
  const children = renderCallback();

  return !children ? false : React.cloneElement(children, props);
};
