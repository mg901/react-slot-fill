/* eslint-disable react/prop-types */
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Fill, Provider, Slot } from '../src';
import './index.css';

const items = [
  { id: 0, label: 'red' },
  { id: 1, label: 'green' },
  { id: 2, label: 'pink' },
];

const Item = ({ id, label, className }) => (
  <Fill name="dynamic-demo">
    <div key={id} className={className}>
      {label}
    </div>
  </Fill>
);

const Test = ({ data }) =>
  data.map(({ id, label }) => (
    <Item id={id} label={label} className={`block ${label}`} />
  ));

storiesOf('Slot-Fill', module)
  .add('simple-demo', () => (
    <Provider>
      <div className="wrap">
        <Slot name="simple-demo" />
        <>
          <Fill name="simple-demo">
            <div className="block red">Red Box</div>
          </Fill>
          <Fill name="simple-demo">
            <div className="block green">Green Box</div>
          </Fill>
          <Fill name="simple-demo">
            <div className="block pink">Pink Box</div>
          </Fill>
        </>
      </div>
    </Provider>
  ))
  .add('dynamic elements', () => (
    <Provider>
      <div className="wrap">
        <Slot name="dynamic-demo" />
        <div>
          <Test data={items} />
        </div>
      </div>
    </Provider>
  ));
