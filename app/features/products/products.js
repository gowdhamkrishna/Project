import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const res = await axios.get(API_URL);
  return res.data.products;
});

export const addProduct = createAsyncThunk('product/addProduct', async (product) => {
  const res = await axios.post(API_URL + '/add', product, {
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
});

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, product }) => {
  const res = await axios.put(`${API_URL}/${id}`, product, {
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return id;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.products.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) {
          state.products[idx] = action.payload;
        }
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
