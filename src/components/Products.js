import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {addProduct} from '../features/cartSlice'
import {loadProducts} from '../features/productsSlice'
import {Price} from '../utils'

import styled from 'styled-components'
const ProductsList = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-gap: 1em;
max-width: 1000px;
margin: auto;
}`

const SingleProduct = styled.div`
display:flex;
flex-wrap: wrap;
gap: .5em;
justify-content: space-between;
align-items: center;
padding: 1em;
box-shadow: 0 0 4px 1px rgba(0,0,0,.2);
&:hover {
box-shadow: 0 0 4px 1px rgba(0,0,0,.6);
}
img {
flex-basis: 100%;
height: 200px;
object-fit: cover;
}
`
const Title = styled.p`
font-weight: bold;
height: 2em;
line-height: 1.0;
font-size: 1.3em;
margin: 0 0 .5em;
text-transform: uppercase;
}`
export default function Products() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.products)
  const ready = useSelector(state => 'idle' === state.products.status)

  useEffect(() => {
    dispatch(loadProducts())
  },[dispatch])

  if (!ready) return <div className="product">loading products...</div>
  return <ProductsList>{products.map(product => <Product key={product.sku} product={product} />)}</ProductsList>
}

export function Product({product}) {
  const dispatch = useDispatch()
  const handleAddProduct = e => dispatch(addProduct({
    product,
    sku: product.sku,
    price: product.price,
    quantity: 1
  }))

  return <SingleProduct>
  <Title>{product.name}</Title>
  <img src={product.image} alt={product.name} />
  <span className="description">{product.description}</span>
  <Price price={product.price}/>
  <button onClick={handleAddProduct}>add to cart</button>
</SingleProduct>
}

