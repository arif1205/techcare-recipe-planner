import { configureStore } from "@reduxjs/toolkit";
import globalReducer, { mealPlanMiddleware } from "./slice/global/globalSlice";
import { api } from "./api/api";

export const store = configureStore({
	reducer: {
		global: globalReducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware, mealPlanMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
