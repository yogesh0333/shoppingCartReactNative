import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  price: number;
  count: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({...action.payload, count: 1});
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseCount: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.count += 1;
      }
    },
    decreaseCount: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.count > 1) {
          item.count -= 1;
        } else {
          // Remove item from cart if count is 1
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
    },
  },
});

export const {addToCart, removeFromCart, increaseCount, decreaseCount} =
  cartSlice.actions;
export default cartSlice.reducer;
