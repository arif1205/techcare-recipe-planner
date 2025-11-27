import {
	CURRENT_TAB_STORAGE_KEY,
	CURRENT_WEEK_STORAGE_KEY,
	MEAL_PLAN_STORAGE_KEY,
} from "@/data/index.data";
import type { MealPlan, TabsType } from "@/types";

export const loadMealPlanFromStorage = (): MealPlan => {
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

export const loadCurrentTabFromStorage = (): TabsType => {
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

export const loadCurrentWeekFromStorage = (): {
	weekStart: Date;
	weekEnd: Date;
} => {
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
