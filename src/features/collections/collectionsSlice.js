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
    addNewCollection: (state, action) => {
      return {
        ...state,
        collects: [
          ...state.collects,
          { id: uuid(), title: action.payload, list: [] },
        ],
      };
    },
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
  },
});

export const { addNewCollection, addToCollection } = collectionsSlice.actions;
export default collectionsSlice.reducer;
