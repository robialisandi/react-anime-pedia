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
    deleteCollection: (state, action) => {
      return {
        ...state,
        collects: state.collects.filter(coll => coll.id !== action.payload),
      };
    },
  },
});

export const { addNewCollection, addToCollection, deleteCollection } =
  collectionsSlice.actions;
export const allListCollections = state => {
  const allList = [];
  state.collections.collects.map(coll =>
    coll.list.map(animeItem =>
      allList.push({ idCollection: coll.id, idAnime: animeItem.id })
    )
  );
  return allList;
};
export default collectionsSlice.reducer;
