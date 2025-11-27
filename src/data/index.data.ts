import type { TabsType } from "@/types";

export const TabsData: { label: string; value: TabsType }[] = [
	{
		label: "Browse",
		value: "browse",
	},
	{
		label: "Meal Planner",
		value: "meal-planner",
	},
	{
		label: "Shopping List",
		value: "shopping-list",
	},
];

export const INSTRUCTIONS_PREVIEW_LENGTH = 200;
export const MEAL_PLAN_STORAGE_KEY = "mealPlan";
export const CURRENT_TAB_STORAGE_KEY = "currentTab";
export const CURRENT_WEEK_STORAGE_KEY = "currentWeek";
export const INGREDIENTS_LIST_STORAGE_KEY = "ingredientsList";
