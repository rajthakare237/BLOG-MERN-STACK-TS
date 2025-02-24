// store/store.ts
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// This uses localStorage; if you want sessionStorage or another storage, adjust accordingly.
import storage from 'redux-persist/lib/storage';
import { authReducer } from '../reducers/authReducer';

const persistConfig = {
  key: 'root', // key in storage
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

// Export RootState type for use in selectors
export type RootState = ReturnType<typeof store.getState>;



// // store/store.ts
// import { authReducer } from '../reducers/authReducer';

// type Listener = () => void;

// class Store<TState, TAction> {
//   private state: TState;
//   private listeners: Listener[] = [];
//   private reducer: (state: TState, action: TAction) => TState;

//   constructor(reducer: (state: TState, action: TAction) => TState, initialState: TState) {
//     this.reducer = reducer;
//     this.state = initialState;
//   }

//   getState(): TState {
//     return this.state;
//   }

//   dispatch(action: TAction): void {
//     this.state = this.reducer(this.state, action);
//     this.listeners.forEach((listener) => listener());
//   }

//   subscribe(listener: Listener): () => void {
//     this.listeners.push(listener);
//     return () => {
//       this.listeners = this.listeners.filter((l) => l !== listener);
//     };
//   }
// }

// const initialAuthState = {
//   isAuthenticated: Boolean(localStorage.getItem("authToken")),
//   email: localStorage.getItem("email") || null,
//   token: localStorage.getItem("authToken") || null,
//   username: localStorage.getItem("username") || null,
//   bio: localStorage.getItem("bio") || null,
//   profilePicUrl: localStorage.getItem("profilePic") || null,
// };


// // Exporting the store
// export const store = new Store(authReducer, initialAuthState);

// export type RootState = ReturnType<typeof store.getState>;
