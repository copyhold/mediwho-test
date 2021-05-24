import React, {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {removeProduct,cartTotal} from '../features/cartSlice'
import {Price} from '../utils'
import styled from 'styled-components'

const CartBlock = styled.div`
position: relative;
header {
cursor: pointer;
em {
display: inline-flex;
vertical-align: middle;
margin-inline-start: .5em;
}
}
ul {
list-style: none;
margin: 1em 0;
padding: 0;
}
`
const CartElm = styled.li`
list-style: none;
padding: 0;
display: flex;
align-items: center;
gap: 1em;
justify-content: space-between;
.title {
margin-inline-end: auto;
}
`
const Badge = styled.em`
border: 1px solid #000;
border-radius: 50%;
font-size: .8em;
display: flex;
ajign-items: center;
justify-content: center;
width: 2em;
height: 2em;
line-height: 2em;
}`
const Payment = styled.footer`
display: flex;
justify-content: space-between;
align-items: center;
}`
const DropDown = styled.div`
position: absolute;
background: #fff;
border: 1px solid #000;
padding: 1em;
right: 0;
}`

export default function Cart() {
  const [cartOpen,setOpen] = useState(false)
  const cart_items = useSelector(state => Object.values(state.cart.cart_items))
  const toggleOpenCart = e => setOpen(!cartOpen)

  return <CartBlock>
    <header onClick={toggleOpenCart}>
      Shopping cart 
      {cart_items.length>0 && <Badge>{cart_items.length}</Badge>}
    </header>
    {cartOpen && cart_items.length>0 && <DropDown>
      <ul>{cart_items.map(item => <CartItem item={item} key={item.product.sku} />)}</ul>
      <Payment><Totals /><button>pay</button></Payment>
    </DropDown>}
</CartBlock>
}
export function CartItem({item}) {
  const dispatch = useDispatch()
  const handleRemove = () => dispatch(removeProduct(item.product.sku))
  return <CartElm>
  <span className="title">{item.product.name}</span>
  <span className="quantity">{item.quantity}</span>
  <Price price={item.quantity * item.product.price} />
  <button onClick={handleRemove}>&times;</button>
</CartElm>
}
export function Totals() {
  const total = useSelector(cartTotal)
  return <React.Fragment>Total: <Price price={total} /></React.Fragment>
}

