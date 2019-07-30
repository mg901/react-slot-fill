/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { storiesOf } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { Fill, Provider, Slot } from '../src';
import './index.css';

const items = [
  { id: 0, label: 'red' },
  { id: 1, label: 'green' },
  { id: 2, label: 'pink' },
];

const mockFetchData = (ms) =>
  new Promise((res) => setTimeout(() => res(items), ms));

const LoadingFills = () => {
  const [arr, setArr] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await mockFetchData(1000);
      setArr(result);
    };

    fetchData();
  }, []);

  return arr.length > 0 ? (
    <>
      {arr.map(({ id, label }, index) => (
        <>
          <Slot name={`loading-demo-${id}`} />
          <Fill key={id} name={`loading-demo-${id}`} id={id}>
            <div key={id} className={cx('block', label, { active })}>
              {label}
            </div>
          </Fill>
        </>
      ))}
    </>
  ) : (
    <div>loading ...</div>
  );
};

const Test = ({ data }) =>
  data.map(({ id, label }) => {
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
  ))
  .add('loading elements', () => (
    <Provider>
      <div className="wrap">
        <Slot name="loading-demo" />
        <LoadingFills />
      </div>
    </Provider>
  ));
