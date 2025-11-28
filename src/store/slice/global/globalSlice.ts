import {
	CURRENT_TAB_STORAGE_KEY,
	CURRENT_WEEK_STORAGE_KEY,
	INGREDIENTS_LIST_STORAGE_KEY,
	MEAL_PLAN_STORAGE_KEY,
} from "@/data/index.data";
import {
	loadCurrentTabFromStorage,
	loadCurrentWeekFromStorage,
	loadIngredientsListFromStorage,
	loadMealPlanFromStorage,
} from "@/lib/localstorage";
import { calculateIngredientsList } from "@/lib/receipe";
import type {
	GlobalState,
	IngredientsList,
	MealPlanRecipe,
	TabsType,
} from "@/types";
import {
	createSlice,
	type Middleware,
	type PayloadAction,
} from "@reduxjs/toolkit";

const loadedMealPlan = loadMealPlanFromStorage();
const loadedIngredientsList = loadIngredientsListFromStorage();

const initialState: GlobalState = {
	mealPlan: loadedMealPlan,
	currentTab: loadCurrentTabFromStorage(),
	currentWeek: loadCurrentWeekFromStorage(),
	ingredientsList: calculateIngredientsList(
		loadedMealPlan,
		loadedIngredientsList,
		true
	),
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
			state.ingredientsList = calculateIngredientsList(
				state.mealPlan,
				state.ingredientsList
			);
		},
		removeFromMealPlan(state, action: PayloadAction<string>) {
			delete state.mealPlan[action.payload];
			state.ingredientsList = calculateIngredientsList(
				state.mealPlan,
				state.ingredientsList
			);
		},
		clearMealPlan(state) {
			state.mealPlan = {};
			state.ingredientsList = {};
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
		setIngredientsList(state, action: PayloadAction<IngredientsList>) {
			state.ingredientsList = action.payload;
		},
		addToIngredientsList(
			state,
			action: PayloadAction<{
				ingredient: string;
				purchased: boolean;
				measures: string[];
			}>
		) {
			state.ingredientsList[action.payload.ingredient] = {
				purchased: action.payload.purchased,
				measures: action.payload.measures,
			};
		},
		removeFromIngredientsList(state, action: PayloadAction<string>) {
			delete state.ingredientsList[action.payload];
		},
		purchaseIngredient(state, action: PayloadAction<string>) {
			state.ingredientsList[action.payload].purchased = true;
		},
		unpurchaseIngredient(state, action: PayloadAction<string>) {
			state.ingredientsList[action.payload].purchased = false;
		},
		clearIngredientsList(state) {
			state.ingredientsList = {};
		},
		clearPurchasedIngredients(state) {
			state.ingredientsList = Object.fromEntries(
				Object.entries(state.ingredientsList).filter(
					([, value]) => !value.purchased
				)
			);
		},
	},
});

export const {
	addToMealPlan,
	removeFromMealPlan,
	clearMealPlan,
	setCurrentTab,
	setCurrentWeek,
	setIngredientsList,
	addToIngredientsList,
	removeFromIngredientsList,
	purchaseIngredient,
	unpurchaseIngredient,
	clearIngredientsList,
	clearPurchasedIngredients,
} = globalSlice.actions;
export default globalSlice.reducer;

export const globalSliceMiddleware: Middleware =
	(store) => (next) => (action) => {
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
				// Also save ingredientsList since it's recalculated when mealPlan changes
				localStorage.setItem(
					INGREDIENTS_LIST_STORAGE_KEY,
					JSON.stringify(state.global.ingredientsList)
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

		if (
			setIngredientsList.match(action) ||
			addToIngredientsList.match(action) ||
			removeFromIngredientsList.match(action) ||
			purchaseIngredient.match(action) ||
			unpurchaseIngredient.match(action) ||
			clearIngredientsList.match(action) ||
			clearPurchasedIngredients.match(action)
		) {
			const state = store.getState() as { global: GlobalState };
			try {
				localStorage.setItem(
					INGREDIENTS_LIST_STORAGE_KEY,
					JSON.stringify(state.global.ingredientsList)
				);
			} catch (error) {
				console.error(
					"Failed to save ingredients list to localStorage:",
					error
				);
			}
		}
		return result;
	};
