import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart_items: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const {sku,product,price,quantity=1} = action.payload
      if (state.cart_items[sku]) { // we already have one in the list
        state.cart_items[sku].quantity += quantity
      } else {
        state.cart_items[sku] = {
          quantity,
          product: action.payload.product,
          price: action.payload.price
        }
      }
    },
    removeProduct: (state, action) => {
      state.cart_items.delete(action.sku)
    }
  }
})

export const { addProduct, removeProduct } = cartSlice.actions;
export const cartTotal = (state) => state.cart_items.reduce((sum,item) => sum + item.price * item.quantity)
export const currency = "₪"
export default cartSlice.reducer;
