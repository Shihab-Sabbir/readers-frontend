import React from 'react';
import DisplayProduct from '../components/DisplayProduct';

export default function Home() {
  return (
    <div>
      <DisplayProduct limit={10} />
    </div>
  );
}
