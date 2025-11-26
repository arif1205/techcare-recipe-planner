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
	 * Parallel execution is handled by the RTK Query library.
	 * At: @src/store/api/api.ts:47
	 */
	const { data, isLoading, isError } =
		useApi().queries.recipes.getRecipesWithFilters({
			searchQuery: searchQuery || undefined,
			category: selectedCategory || undefined,
		});

	return {
		data,
		isLoading,
		isError,
	};
};
