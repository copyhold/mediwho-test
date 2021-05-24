import React from 'react'
import {useSelector} from 'react-redux'
import {currencySymbol} from './features/cartSlice'

import styled from 'styled-components'

const PriceElm = styled.p`
* {
  font-style: normal;
}
b {
  font-size: 1.1em;
} `


export function Price({price}) {
  const currencySym = useSelector(currencySymbol)
  return <PriceElm>
    <i>{currencySym}</i>
    <b>{price}</b>
  </PriceElm>
}

