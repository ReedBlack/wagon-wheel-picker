import React, { useState } from 'react';
import { WagonWheelPicker } from '@reedblack/wagon-wheel-picker';

/**
 * Basic example showing simple usage of WagonWheelPicker
 */
function BasicExample() {
  const [selected, setSelected] = useState('beef');

  const options = [
    { key: 'beef', label: 'Beef', image: '/images/beef.png' },
    { key: 'chicken', label: 'Chicken', image: '/images/chicken.png' },
    { key: 'pork', label: 'Pork', image: '/images/pork.png' },
    { key: 'fish', label: 'Fish', image: '/images/fish.png' },
    { key: 'veggie', label: 'Veggie', image: '/images/veggie.png' },
  ];

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Choose Your Protein</h1>

      <WagonWheelPicker
        options={options}
        value={selected}
        onClick={setSelected}
      />

      <div style={{ marginTop: '20px' }}>
        <p>Selected: <strong>{selected}</strong></p>
      </div>
    </div>
  );
}

export default BasicExample;
