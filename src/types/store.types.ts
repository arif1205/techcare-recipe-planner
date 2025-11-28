import type { MealPlanRecipe } from "./api.types";
import type { TabsType } from "./index.types";

export interface MealPlan {
	[date: string]: MealPlanRecipe;
}

export interface IngredientsList {
	[key: string]: {
		purchased: boolean;
		measures: string[];
	};
}

export interface GlobalState {
	mealPlan: MealPlan;
	currentTab: TabsType;
	currentWeek: {
		weekStart: string; // ISO date string for Redux serialization
		weekEnd: string; // ISO date string for Redux serialization
	};
	ingredientsList: IngredientsList;
}
