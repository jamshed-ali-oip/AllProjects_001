// import { Iterable, isImmutable  } from 'immutable'
import { configureStore, ThunkAction, Action, createSerializableStateInvariantMiddleware, isPlain } from '@reduxjs/toolkit';
// import counterReducer from '../store/Slice/test';
import banersReducer from './Slice/baners.slice';
import videosReducer from './Slice/videos.slice';

// // Augment middleware to consider Immutable.JS iterables serializable
// const isSerializable = (value: any) => Iterable.isIterable(value) || isPlain(value)

// const getEntries = (value: any) => Iterable.isIterable(value) ? value.entries() : Object.entries(value)

// const serializableMiddleware = createSerializableStateInvariantMiddleware({
//   isSerializable,
//   getEntries,
// });

export const store = configureStore({
  reducer: {
    baner: banersReducer,
    videos: videosReducer,
  },
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: true,
  // middleware: [serializableMiddleware],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { ignoredPaths: ['some.nested.path'] },
    serializableCheck: { ignoredPaths: ['some.nested.path'] }
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
