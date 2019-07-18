import React, { useContext, useEffect, useState } from 'react';
import { SlotFillContext } from './context';

const useForceUpdate = () => {
  const [_, setIt] = useState(false);

  return () => setIt((val) => !val);
};

export const Slot = ({ name, ...props }) => {
  const ctx = useContext(SlotFillContext);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (!ctx || !ctx.getFillForSlot) {
      throw new Error(
        'Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.',
      );
    }

    return () => ctx.unsubscribe(name);
  });

  // When all the fills came to re-render them in the slot.
  if (ctx.subscribe) {
    ctx.subscribe(name, () => {
      forceUpdate();
    });
  }

  if (!name) throw new Error(`Slot: You forget to pass id to <Slot>`);

  const children = ctx.getFillForSlot(name);

  return !children ? false : React.cloneElement(children, props);
};
