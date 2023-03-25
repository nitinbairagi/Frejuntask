import {createSlice} from '@reduxjs/toolkit';

const initialState = {item: []};

const ListSlice = createSlice({
  name: 'ListSlice',
  initialState,
  reducers: {
    addlist: (state, payload) => {
      // console.log(state);
      // console.log(payload.payload.products);
      state.item = payload.payload.products;
    },
  },
});

export const actions = ListSlice.actions;
export default ListSlice.reducer;
