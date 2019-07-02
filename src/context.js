import React from 'react';

export const SlotFillContext = React.createContext({});

export class SlotFillManager {
  slotsAndFills = new Map();
  subscribers = [];

  setFillForSlot = (slotId, renderCallback = () => false) => {
    const fillForSlot = this.slotsAndFills.get(slotId);

    if (fillForSlot) {
      throw new Error(
        `SlotAndFillManager: You've already registered a Fill for the following slotId: ${slotId}`,
      );
    }

    this.slotsAndFills.set(slotId, renderCallback);
    this.notify(slotId);
  };

  getFillForSlot = (slotId) => {
    const fillById = this.slotsAndFills.get(slotId);

    return !fillById ? () => false : fillById;
  };

  subscribe = (slotId, callback) => {
    this.subscribers = [...this.subscribers, { slotId, callback }];
  };

  unsubscribe = (slotId, slotIndex) => {
    this.subscribers = this.subscribers.filter(
      (subscriber, index) =>
        subscriber.slotId === slotId && index === slotIndex,
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
