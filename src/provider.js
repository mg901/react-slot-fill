import React from 'react';
import { SlotFillContext, SlotFillManager } from './context';

// eslint-disable-next-line react/prop-types
export const SlotFillProvider = ({ children }) => (
  <SlotFillContext.Provider value={new SlotFillManager()}>
    {children}
  </SlotFillContext.Provider>
);

SlotFillProvider.defaultProps = {
  children: [],
};
