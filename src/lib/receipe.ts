import type { IngredientsList, Recipe } from "@/types";

export const calculateIngredientsList = (
	recipes: Recipe[],
	currentIngredientsList: IngredientsList
): IngredientsList => {
	const ingredientList = currentIngredientsList;

	recipes.forEach((recipe) => {
		for (let i = 1; i <= 20; i++) {
			const ingredientName = recipe[
				`strIngredient${i}` as keyof Recipe
			] as string;
			const ingredientMeasure = recipe[
				`strMeasure${i}` as keyof Recipe
			] as string;

			if (ingredientName && ingredientName.trim()) {
				// if already exists, add the measure to the existing measures
				if (ingredientList[ingredientName.trim()]) {
					ingredientList[ingredientName.trim()].measures.push(
						ingredientMeasure.trim()
					);
				} else {
					ingredientList[ingredientName.trim()] = {
						purchased: false,
						measures: [ingredientMeasure.trim()],
					};
				}
			}
		}
	});

	return ingredientList;
};
