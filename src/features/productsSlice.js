import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './products.api';

const initialState = {
  status: 'idle',
  products: []
};

// this is a sugar for using async actions
export const loadProducts = createAsyncThunk(
  'products/load',
  async () => {
    try {
      const products = await fetchProducts();
      return products
    } catch (err) {
      console.error(err)
      throw err
    }
  }
);

// createSlice uses immer under the hood so we can update array elements easily
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: { 
    updatePrice: (state, action) => {
      const i = state.products.findIndex(product => product.sku === action.sku)
      state.products[i].price = action.price
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loadProducts.rejected, console.log)
    .addCase(loadProducts.pending, state => {
      state.status = 'loading'
    })
    .addCase(loadProducts.fulfilled, (state, action) => {
      state.status = 'idle'
      state.products = action.payload
    })
  }
})

export const {updatePrice} = productsSlice.actions;
export const productsCount = (state) => state.products.length
export default productsSlice.reducer;
