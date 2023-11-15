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

  console.log(`[WithHook]: 過濾操作時間: ${endTime - startTime} 毫秒`);

  return (
    <ul>
      {filteredItems.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </ul>
  );
};

const WithHook = () => {
  const [inputValue, setInputValue] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredInputValue = useDeferredValue(inputValue);

  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

  const handleInputChange = (e) => {
    startTransition(() => {
      setInputValue(e.target.value);
    });
  };

  useEffect(() => {
    console.log('[WithHook]: 渲染時間:', new Date().getTime());
  });

  return (
    <div>
      <h2>With Hook</h2>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {isPending ? <p>Loading...</p> : <FilterComponent items={items} filter={deferredInputValue} />}
    </div>
  );
};

export default WithHook;
