import type { Recipe, MealPlanRecipe } from "@/types";

export const convertRecipeToMealPlanRecipe = (
	recipe: Recipe
): MealPlanRecipe => {
	return {
		id: recipe.idMeal,
		name: recipe.strMeal,
		category: recipe.strCategory,
		area: recipe.strArea,
		thumbnail: recipe.strMealThumb,
	};
};
