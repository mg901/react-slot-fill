import React from 'react';

export const SlotFillContext = React.createContext({});

export class SlotFillManager {
  allFills = {};

  timers = {};

  slotsSubscribers = {};

  setFill = ({ name, id, content }) => {
    const currentFill = this.allFills[name];

    if (currentFill) {
      if (!currentFill[id]) {
        this.allFills[name] = { ...currentFill, [id]: content };
      }
    } else {
      this.allFills[name] = { [id]: content };
    }

    /* Waits for the next fill call. 
      If it is, we delete the previous timeout, 
      if we don’t render it, slot by the last parameter.
    */
    if (this.timers[name]) {
      clearTimeout(this.timers[name]);
    }

    this.timers[name] = setTimeout(() => {
      this.notify(name);
    }, 100);
  };

  // Give fills to the slot.
  getFillForSlot = (name) => {
    const fillById = this.allFills[name];
    if (!fillById) {
      return false;
    }

    return <>{Object.values(fillById).map((render) => render())}</>;
  };

  // Unsubscribe from the function of the renderer to avoid memory leaks.
  unsubscribe = (name) => {
    delete this.slotsSubscribers[name];
  };

  // Save the name of the slot and the function for the renderer.
  subscribe = (name, updateCallback) => {
    this.slotsSubscribers = {
      [name]: updateCallback,
      ...this.slotsSubscribers,
    };
  };

  // Render the outgoing slots (all fills).
  notify = (name) => {
    if (this.slotsSubscribers[name]) {
      this.slotsSubscribers[name]();
    }
  };
}
