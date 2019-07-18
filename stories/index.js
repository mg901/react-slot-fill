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
  <Fill name="dynamic-demo" id={id}>
    <div className={className}>{label}</div>
  </Fill>
);

const Test = ({ data }) =>
  data.map(({ id, label }) => {
    console.log('wrap ids', id);
    return (
      <Fill name="dynamic-demo" id={id}>
        <div className={`block ${label}`}>{label}</div>
      </Fill>
    );
  });

storiesOf('Slot-Fill', module)
  .add('simple-demo', () => (
    <Provider>
      <div className="wrap">
        <Slot name="simple-demo" />
        <>
          <Fill name="simple-demo" id="1">
            <div className="block red">Red Box</div>
          </Fill>
          <Fill name="simple-demo" id="2">
            <div className="block green">Green Box</div>
          </Fill>
          <Fill name="simple-demo" id="3">
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
