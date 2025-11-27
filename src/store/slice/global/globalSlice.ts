import {
	CURRENT_TAB_STORAGE_KEY,
	CURRENT_WEEK_STORAGE_KEY,
	MEAL_PLAN_STORAGE_KEY,
} from "@/data/index.data";
import type { GlobalState, MealPlan, MealPlanRecipe, TabsType } from "@/types";
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

const loadCurrentTabFromStorage = (): TabsType => {
	try {
		const stored = localStorage.getItem(CURRENT_TAB_STORAGE_KEY);
		if (stored) {
			return stored as TabsType;
		}
	} catch (error) {
		console.error("Failed to load current tab from localStorage:", error);
	}

	return "browse";
};

const loadCurrentWeekFromStorage = (): { weekStart: Date; weekEnd: Date } => {
	try {
		const stored = localStorage.getItem(CURRENT_WEEK_STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (error) {
		console.error("Failed to load current week from localStorage:", error);
	}

	return {
		weekStart: new Date(),
		weekEnd: new Date(),
	};
};

const initialState: GlobalState = {
	mealPlan: loadMealPlanFromStorage(),
	currentTab: loadCurrentTabFromStorage(),
	currentWeek: loadCurrentWeekFromStorage(),
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
		setCurrentTab(state, action: PayloadAction<TabsType>) {
			state.currentTab = action.payload;
		},
		setCurrentWeek(
			state,
			action: PayloadAction<{ weekStart: Date; weekEnd: Date }>
		) {
			state.currentWeek = action.payload;
		},
	},
});

export const {
	addToMealPlan,
	removeFromMealPlan,
	clearMealPlan,
	setCurrentTab,
	setCurrentWeek,
} = globalSlice.actions;
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

	if (setCurrentTab.match(action)) {
		const state = store.getState() as { global: GlobalState };
		try {
			localStorage.setItem(CURRENT_TAB_STORAGE_KEY, state.global.currentTab);
		} catch (error) {
			console.error("Failed to save current tab to localStorage:", error);
		}
	}

	if (setCurrentWeek.match(action)) {
		const state = store.getState() as { global: GlobalState };
		try {
			localStorage.setItem(
				CURRENT_WEEK_STORAGE_KEY,
				JSON.stringify(state.global.currentWeek)
			);
		} catch (error) {
			console.error("Failed to save current week to localStorage:", error);
		}
	}

	return result;
};
