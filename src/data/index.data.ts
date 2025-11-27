import type { TabsType } from "@/types";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Calendar, ShoppingBag } from "lucide-react";

export interface TabData {
	label: string;
	value: TabsType;
	icon?: LucideIcon;
}

export const TabsData: TabData[] = [
	{
		label: "Browse",
		value: "browse",
		icon: BookOpen,
	},
	{
		label: "Meal Planner",
		value: "meal-planner",
		icon: Calendar,
	},
	{
		label: "Shopping List",
		value: "shopping-list",
		icon: ShoppingBag,
	},
];

export const INSTRUCTIONS_PREVIEW_LENGTH = 200;
export const MEAL_PLAN_STORAGE_KEY = "mealPlan";
export const CURRENT_TAB_STORAGE_KEY = "currentTab";
export const CURRENT_WEEK_STORAGE_KEY = "currentWeek";
export const INGREDIENTS_LIST_STORAGE_KEY = "ingredientsList";
