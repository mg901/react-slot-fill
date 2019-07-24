/* eslint-disable react/prop-types */
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Fill, Provider, Slot } from '../src';
import './index.css';

const mockFetchData = (ms) =>
  new Promise((res) => setTimeout(() => res(['text1', 'text2', 'text3']), ms));

const LoadingFills = () => {
  const [arr, setArr] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await mockFetchData(2000);
      setArr(result);
    };

    fetchData();
  }, []);

  return arr.length > 0 ? (
    <>
      {arr.map((item, id) => (
        <Fill key={item} name="loading-demo" id={id}>
          {item}
        </Fill>
      ))}
    </>
  ) : (
    false
  );
};

const items = [
  { id: 0, label: 'red' },
  { id: 1, label: 'green' },
  { id: 2, label: 'pink' },
];

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
