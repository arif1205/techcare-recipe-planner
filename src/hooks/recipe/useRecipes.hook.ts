import type { Category } from "@/types";
import { useApi } from "../api/useApi.hooks";

export const useRecipes = ({
	searchQuery,
	selectedCategory,
}: {
	searchQuery?: string;
	selectedCategory?: Category["idCategory"];
}) => {
	/**
	 * !IMPORTANT: This endpoint runs both queries in parallel if both filters are provided.
	 * Please check at: @src/store/api/api.ts:43
	 */
	const { data, isFetching, isError } =
		useApi().queries.recipes.getRecipesWithFilters({
			searchQuery: searchQuery || undefined,
			category: selectedCategory || undefined,
		});

	const emptyMeals = !data?.meals || data.meals.length === 0;

	return {
		data,
		isLoading: isFetching,
		isError,
		emptyMeals,
	};
};
