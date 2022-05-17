import { combineReducers, configureStore } from '@reduxjs/toolkit';
import collectionsReducer from './collections/collectionsSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  collections: collectionsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
let persistor = persistStore(store);

export { store, persistor };
