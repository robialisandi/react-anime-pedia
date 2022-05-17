import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
  collects: [
    {
      id: '1',
      title: 'Koleksi Robi alisandi',
      list: [],
    },
    {
      id: '2',
      title: 'Koleksi Sinan',
      list: [],
    },
  ],
  fav: true,
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    addToCollection: (state, action) => {
      return {
        ...state,
        collects: state.collects.map(coll =>
          coll.id === action.payload.id
            ? {
                ...coll,
                list: [...coll.list, action.payload.data],
              }
            : coll
        ),
      };
    },
    getCollection: (state, action) => {
      return state.collects.filter(coll => coll.id === action.payload);
    },
    detailCollection: (state, action) => {},
  },
});

export const { addToCollection } = collectionsSlice.actions;
export default collectionsSlice.reducer;
