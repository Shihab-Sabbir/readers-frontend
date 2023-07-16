import React from 'react'
import DisplayProduct from '../components/DisplayProduct'

export default function AllBooks() {
  return (
    <div>
        <DisplayProduct limit={1000000}/>
    </div>
  )
}
