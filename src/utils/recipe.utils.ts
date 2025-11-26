import type { Recipe, MealPlanRecipe } from "@/types";

export const convertRecipeToMealPlanRecipe = (
	recipe: Recipe
): MealPlanRecipe => {
	const ingredients: { name: string; measure: string }[] = [];

	for (let i = 1; i <= 20; i++) {
		const ingredient = recipe[`strIngredient${i}` as keyof Recipe] as string;
		const measure = recipe[`strMeasure${i}` as keyof Recipe] as string;

		if (ingredient && ingredient.trim()) {
			ingredients.push({
				name: ingredient.trim(),
				measure: (measure || "").trim(),
			});
		}
	}

	return {
		id: recipe.idMeal,
		name: recipe.strMeal,
		category: recipe.strCategory,
		area: recipe.strArea,
		instructions: recipe.strInstructions,
		thumbnail: recipe.strMealThumb,
		ingredients,
	};
};
