import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {addProduct} from '../features/cartSlice'
import {loadProducts} from '../features/productsSlice'
import {Price} from '../utils'

export default function Products() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.products)
  const ready = useSelector(state => 'idle' === state.products.status)

  useEffect(() => {
    dispatch(loadProducts())
  },[])

  if (!ready) return <div className="product">loading products...</div>
  return <div className="products">{products.map(product => <Product key={product.sku} product={product} />)}</div>
}

export function Product({product}) {
  const dispatch = useDispatch()
  const handleAddProduct = e => dispatch(addProduct({
    product,
    sku: product.sku,
    price: product.price,
    quantity: 1
  }))

  return <div className="product">
  <p className="title">{product.name}</p>
  <img src={product.image} alt={product.name} />
  <span className="description">{product.description}</span>
  <Price price={product.price}/>
  <button onClick={handleAddProduct}>add</button>
</div>
}

