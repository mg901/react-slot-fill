import React, { useContext, useEffect, useState, useCallback } from 'react';
import { SlotFillContext } from './context';

export const Slot = ({ name }) => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const ctx = useContext(SlotFillContext);

  useEffect(() => {
    if (!ctx || !ctx.getFillForSlot) {
      throw new Error(
        'Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.',
      );
    }

    return () => ctx.unsubscribe(name);
  }, []);

  // When all the fills came to re-render them in the slot.
  if (ctx.subscribe) {
    ctx.subscribe(name, () => {
      forceUpdate();
    });
  }

  if (!name) throw new Error(`Slot: You forget to pass id to <Slot>`);
  const children = ctx.getFillForSlot(name);

  return !children ? false : React.cloneElement(children);
};
