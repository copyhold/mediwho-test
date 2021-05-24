import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart_items: {},
  currency: 'USD',
  currencySymbols: {
    NIS: "₪",
    USD: "$"
  },
  currencyRates: {
    NIS: 3.5,
    USD: 1
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCurrency: (state,action) => {
      if (state.currencies[action.payload]) {
        state.currency = action.payload
        // recalculate prices
      }
    },
    addProduct: (state, action) => {
      const {sku,product,price,quantity=1} = action.payload
      if (state.cart_items[sku]) { // we already have one in the list
        state.cart_items[sku].quantity += quantity
      } else {
        state.cart_items[sku] = {
          quantity,
          product: product,
          price: price
        }
      }
    },
    removeProduct: (state, action) => {
      delete(state.cart_items[action.payload])
    }
  }
})

export const { addProduct, removeProduct } = cartSlice.actions;
export const cartTotal = (state) => Object.values(state.cart.cart_items).reduce((sum,item) => sum + item.price * item.quantity, 0)
export const currencySymbol = state => state.cart.currencySymbols[state.cart.currency]
export default cartSlice.reducer;
