import type { MealPlanRecipe } from "./api.types";

export interface MealPlan {
	[date: string]: MealPlanRecipe;
}

export interface GlobalState {
	mealPlan: MealPlan;
}
