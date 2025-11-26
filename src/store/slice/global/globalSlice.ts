import { MEAL_PLAN_STORAGE_KEY } from "@/data/index.data";
import type { GlobalState, MealPlan, MealPlanRecipe } from "@/types";
import {
	createSlice,
	type Middleware,
	type PayloadAction,
} from "@reduxjs/toolkit";

const loadMealPlanFromStorage = (): MealPlan => {
	try {
		const stored = localStorage.getItem(MEAL_PLAN_STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (error) {
		console.error("Failed to load meal plan from localStorage:", error);
	}
	return {};
};

const initialState: GlobalState = {
	mealPlan: loadMealPlanFromStorage(),
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		addToMealPlan(
			state,
			action: PayloadAction<{ date: string; recipe: MealPlanRecipe }>
		) {
			state.mealPlan[action.payload.date] = action.payload.recipe;
		},
		removeFromMealPlan(state, action: PayloadAction<string>) {
			delete state.mealPlan[action.payload];
		},
		clearMealPlan(state) {
			state.mealPlan = {};
		},
	},
});

export const { addToMealPlan, removeFromMealPlan, clearMealPlan } =
	globalSlice.actions;
export default globalSlice.reducer;

export const mealPlanMiddleware: Middleware = (store) => (next) => (action) => {
	const result = next(action);

	if (
		addToMealPlan.match(action) ||
		removeFromMealPlan.match(action) ||
		clearMealPlan.match(action)
	) {
		const state = store.getState() as { global: GlobalState };
		try {
			localStorage.setItem(
				MEAL_PLAN_STORAGE_KEY,
				JSON.stringify(state.global.mealPlan)
			);
		} catch (error) {
			console.error("Failed to save meal plan to localStorage:", error);
		}
	}

	return result;
};
