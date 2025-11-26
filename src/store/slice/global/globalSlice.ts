import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GlobalState } from "@/types";

const initialState: GlobalState = {
	theme: "light",
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setTheme(state, action: PayloadAction<"light" | "dark">) {
			state.theme = action.payload;
		},
	},
});

export const { setTheme } = globalSlice.actions;
export default globalSlice.reducer;
