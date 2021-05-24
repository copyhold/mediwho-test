import React from 'react'
import {useSelector} from 'react-redux'



export function Price({price}) {
  const currency = useSelector(state => state.cart.currency)
  return <p className="price">
    <em>{currency}</em>
    <span>{price}</span>
  </p>
}

