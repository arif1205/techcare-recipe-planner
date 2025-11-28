import type { Recipe } from "@/types";
import { useMemo } from "react";
import { useApi } from "../api/useApi.hooks";

export const useRecipeDetails = ({
	recipeId,
	shouldSkip = false,
}: {
	recipeId?: string;
	shouldSkip?: boolean;
}) => {
	const { data, isFetching, isError } = useApi().queries.recipes.getRecipeById(
		recipeId!,
		{ skip: shouldSkip }
	);

	/**
	 * To get the formatted ingredients list with name and measure
	 */
	const ingredients = useMemo(() => {
		if (!data) return [];
		const ingredients: { ingredient: string; measure: string }[] = [];
		for (let i = 1; i <= 20; i++) {
			const ingredient = data[`strIngredient${i}` as keyof Recipe] as string;
			const measure = data[`strMeasure${i}` as keyof Recipe] as string;
			if (ingredient && ingredient.trim()) {
				ingredients.push({
					ingredient: ingredient.trim(),
					measure: (measure || "").trim(),
				});
			}
		}
		return ingredients;
	}, [data]);

	return {
		data,
		isLoading: isFetching,
		isError,
		ingredients,
	};
};
