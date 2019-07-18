import React from 'react';

export const SlotFillContext = React.createContext({});

export class SlotFillManager {
  slotsAndFills = new Map();

  subscribers = [];

  setFills = (slotId, renderCallback) => {
    const fills = this.slotsAndFills.get(slotId);

    if (fills) {
      this.slotsAndFills.set(slotId, [...fills, renderCallback]);
    } else {
      this.slotsAndFills.set(slotId, [renderCallback]);
    }
  };

  setFillForSlot = (slotId, renderCallback = () => false) => {
    this.setFills(slotId, renderCallback);
    this.notify(slotId);
  };

  getFillForSlot = (slotId) => {
    const fillById = this.slotsAndFills.get(slotId);
    if (!fillById) {
      return () => false;
    }

    return () => <>{fillById.map((fill) => fill())}</>;
  };

  subscribe = (slotId, callback) => {
    this.subscribers = [...this.subscribers, { slotId, callback }];
  };

  unsubscribe = (slotId, slotIndex) => {
    this.subscribers = this.subscribers.filter(
      (subscriber, index) =>
        subscriber.slotId !== slotId && index !== slotIndex,
    );
  };

  notify = (slotId) => {
    this.subscribers.forEach((subscriber, index) => {
      if (subscriber.slotId !== slotId) {
        return;
      }

      subscriber.callback(index);
    });
  };
}
