import React from 'react';
import { SlotFillContext, SlotFillManager } from '../context';

export const SlotFillProvider = ({ children }) => (
  <SlotFillContext.Provider value={new SlotFillManager()}>
    {children}
  </SlotFillContext.Provider>
);

SlotFillProvider.defaultProps = {
  children: [],
};
