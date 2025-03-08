// store/store.ts
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// This uses localStorage; if you want sessionStorage or another storage, adjust accordingly.
import storage from 'redux-persist/lib/storage'; // Uses localStorage by default
import { authReducer } from '../reducers/authReducer';

// Configuration for Redux Persist
const persistConfig = {
  key: 'root', // Key used to store the data in localStorage
  storage, // Defines the storage mechanism (localStorage in this case)
};

// Create a persisted reducer using the authReducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Create the Redux store with the persisted reducer
export const store = createStore(persistedReducer);

// Create the persistor, which allows Redux Persist to rehydrate the store
export const persistor = persistStore(store);

// Export RootState type for use in selectors
export type RootState = ReturnType<typeof store.getState>;
