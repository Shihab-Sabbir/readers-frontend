import React from 'react';
import DisplayProduct from '../components/DisplayProduct';
import book from "../asset/images/book.png";

export default function Home() {
  return (
    <div className='w-full overflow-x-hidden'>
     <div className='pb-12 h-[calc(100vh_/_1.5)] container max-w-[1300px] mx-auto'>
     <img src={book} className='max-h-[calc(100vh_/_1.5)]  w-full' />
     </div>
      <DisplayProduct limit={10} />
    </div>
  );
}
