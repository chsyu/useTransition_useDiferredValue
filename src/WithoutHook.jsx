// eslint-disable-next-line no-unused-vars
import React, { useState, useTransition, useDeferredValue, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const ListItem = ({ item }) => {
  return <li>{item}</li>;
};

// eslint-disable-next-line react/prop-types
const FilterComponent = ({ items, filter }) => {
  const startTime = new Date().getTime();
  // eslint-disable-next-line react/prop-types
  const filteredItems = items.filter(item => item.includes(filter));
  const endTime = new Date().getTime();

  console.log(`[WithoutHook]: 過濾操作時間: ${endTime - startTime} 毫秒`);

  return (
    <ul>
      {filteredItems.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </ul>
  );
};

const WithoutHook = () => {
  const [inputValue, setInputValue] = useState('');

  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

  const handleInputChange = (e) => {
      setInputValue(e.target.value);
  };

  useEffect(() => {
    console.log('[WithoutHook]: 渲染時間:', new Date().getTime());
  });

  return (
    <div>
      <h2>Without Hook</h2>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <FilterComponent items={items} filter={inputValue} />
    </div>
  );
};

export default WithoutHook;
