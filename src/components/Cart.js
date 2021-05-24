import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {removeProduct} from '../features/cartSlice'
import {Price} from '../utils'

export default function Cart() {
  const dispatch = useDispatch()
  const handleRemove = sku => dispatch(removeProduct(sku))
  const cart_items = useSelector(state => state.cart.cart_items)
  return <div className="cart">
  <header></header>
  <ul>{Object.keys(cart_items).map(sku => <CartItem item={cart_items[sku]} key={sku} />)}</ul>
  <Totals />
</div>
}
export function CartItem({item}) {
  console.log(item)
  return <li>
  <span className="title">{item.product.name}</span>
  <span className="quantity">{item.quantity}</span>
  <Price price={item.quantity * item.product.price} />
</li>
}
export function Totals() {
  const total = useSelector(state => state.cart.cartTotal)
  return <Price price={total} />
}
