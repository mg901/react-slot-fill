import React from 'react';
import { node } from 'prop-types';
import { SlotFillContext, SlotFillManager } from './context';

export const SlotFillProvider = ({ children }) => (
  <SlotFillContext.Provider value={new SlotFillManager()}>
    {children}
  </SlotFillContext.Provider>
);

SlotFillProvider.defaultProps = {
  children: [],
};

SlotFillProvider.propTypes = {
  children: node,
};
