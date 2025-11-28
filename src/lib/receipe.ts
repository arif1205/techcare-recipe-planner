import type { IngredientsList, MealPlan } from "@/types";
import { saveIngredientsListToStorage } from "./localstorage";

export const calculateIngredientsList = (
	mealPlan: MealPlan,
	currentIngredientsList: IngredientsList,
	isInitialLoad: boolean = false
): IngredientsList => {
	if (
		currentIngredientsList !== undefined &&
		Object.keys(currentIngredientsList).length > 0 &&
		isInitialLoad
	) {
		return currentIngredientsList;
	}

	const ingredientNames = new Set<string>();
	const ingredientMeasures = new Set<string>();

	Object.values(mealPlan).forEach((recipe) => {
		recipe.ingredients.forEach((ingredient) => {
			if (ingredient.name && ingredient.name.trim()) {
				ingredientNames.add(ingredient.name.trim());
				ingredientMeasures.add(ingredient.measure.trim());
			}
		});
	});

	const newIngredientsList: IngredientsList = {};

	ingredientNames.forEach((ingredientName) => {
		if (currentIngredientsList[ingredientName]) {
			newIngredientsList[ingredientName] = {
				purchased: currentIngredientsList[ingredientName].purchased,
				measures: Array.from(ingredientMeasures),
			};
		} else {
			newIngredientsList[ingredientName] = {
				purchased: false,
				measures: Array.from(ingredientMeasures),
			};
		}
	});

	saveIngredientsListToStorage(newIngredientsList);

	return newIngredientsList;
};
