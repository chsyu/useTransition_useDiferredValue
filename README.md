# useTransition + useDiferredValue

> 在這個範例中，我們將創建一個組件，它允許用戶通過輸入欄位輸入文本，然後使用這個文本來過濾一個項目列表。我們將使用 useTransition 來最佳化過濾運算的過程，並使用 useDeferredValue 來最佳化渲染過濾結果的速度。此外，我們將記錄過濾操作和渲染的時間，以顯示這些 React Hooks 的效果。

***

## 分析預期結果
1. useTransition:
   - 用於延遲狀態更新（inputValue），允許瀏覽器有時間處理其他重要任務（如保持動畫流暢），進而改善用戶體驗。
   - 當用戶輸入時，startTransition 會將 inputValue 的更新標記為非緊急更新。如果有任何長時間運行的任務，它們將被延遲，直到主要任務完成。

2. useDeferredValue:
   - 用於延遲 FilterComponent 使用的 inputValue。這樣，當 inputValue 頻繁改變時（如用戶快速輸入），過濾操作不會立即執行，從而避免對性能造成影響。
   - 渲染 FilterComponent 時使用的是 deferredInputValue，這個值的更新會比 inputValue 慢。

3. 效能記錄:
   - 在 FilterComponent 中，我們記錄了過濾操作的執行時間。
   - 在 App 組件的 useEffect 中，我們記錄了渲染時間。

透過比較有無 useTransition 和 useDeferredValue 時的執行時間，我們可以觀察到這些 React Hooks 如何提高應用的整體效能和響應能力。

```javascript
import React, { useState, useTransition, useDeferredValue, useEffect } from 'react';

const ListItem = ({ item }) => {
  return <li>{item}</li>;
};

const FilterComponent = ({ items, filter }) => {
  const startTime = new Date().getTime();
  const filteredItems = items.filter(item => item.includes(filter));
  const endTime = new Date().getTime();

  console.log(`過濾操作時間: ${endTime - startTime} 毫秒`);

  return (
    <ul>
      {filteredItems.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </ul>
  );
};

const App = () => {
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
    console.log('渲染時間:', new Date().getTime());
  });

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {isPending ? <p>Loading...</p> : <FilterComponent items={items} filter={deferredInputValue} />}
    </div>
  );
};

export default App;
```