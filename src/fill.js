import { useContext } from 'react';
import { SlotFillContext } from './context';

const isEmpty = (x) => x === null || x === undefined;

export const Fill = ({ name, id, children }) => {
  const ctx = useContext(SlotFillContext);

  if (!ctx || !ctx.setFill) {
    throw new Error(
      `Fill: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`,
    );
  } else {
    if (!name) {
      throw new Error('Fill: name is null or undefined.');
    }

    if (isEmpty(id)) {
      throw new Error('Fill: id is null or undefined.');
    }

    if (Array.isArray(children) && children.length === 0) {
      throw new Error('Fill: children array is empty.');
    }

    ctx.setFill({ name, id, content: () => children });
  }

  return false;
};
