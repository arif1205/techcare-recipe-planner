import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
	theme: "light" | "dark";
}

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
