import type { MealPlanRecipe } from "./api.types";
import type { TabsType } from "./index.types";

export interface MealPlan {
	[date: string]: MealPlanRecipe;
}

export interface IngredientsList {
	[key: string]: {
		purchased: boolean;
	};
}

export interface GlobalState {
	mealPlan: MealPlan;
	currentTab: TabsType;
	currentWeek: {
		weekStart: Date;
		weekEnd: Date;
	};
	ingredientsList: IngredientsList;
}
