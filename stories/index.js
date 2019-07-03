import { storiesOf } from '@storybook/react';
import React from 'react';
import { Fill, Provider, Slot } from '../src';
import './index.css';

const Toolbar = () => (
  <div className="wrap">
    <Slot name="Toolbar.Item" />
  </div>
);

Toolbar.Item = () => (
  <>
    <Fill name="Toolbar.Item">
      <div className="block red">Red Box</div>
    </Fill>
    <Fill name="Toolbar.Item">
      <div className="block green">Green Box</div>
    </Fill>
    <Fill name="Toolbar.Item">
      <div className="block pink">Pink Box</div>
    </Fill>
  </>
);

const Feature = () => <Toolbar.Item />;

storiesOf('Slot-Fill', module).add('Slot-Fill Demo', () => (
  <Provider>
    <Toolbar />
    <Feature />
  </Provider>
));
