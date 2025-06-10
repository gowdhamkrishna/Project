  import { configureStore } from '@reduxjs/toolkit'
  import authReducer from './features/auth/slice'
  import productReducer from './features/products/products'
  export const store = configureStore({
    reducer: {
      auth: authReducer,
      product:productReducer
    },
  })
