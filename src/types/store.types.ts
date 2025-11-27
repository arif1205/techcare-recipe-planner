import type { MealPlanRecipe } from "./api.types";
import type { TabsType } from "./index.types";

export interface MealPlan {
	[date: string]: MealPlanRecipe;
}

export interface GlobalState {
	mealPlan: MealPlan;
	currentTab: TabsType;
}
