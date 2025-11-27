import { configureStore } from "@reduxjs/toolkit";
import globalReducer, {
	globalSliceMiddleware,
} from "./slice/global/globalSlice";
import { api } from "./api/api";

export const store = configureStore({
	reducer: {
		global: globalReducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware, globalSliceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
