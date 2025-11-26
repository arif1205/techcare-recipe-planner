import {
	useGetAllCategoriesQuery,
	useGetAllRecipesQuery,
	useGetRecipesWithFiltersQuery,
} from "@/store/api/api";

export function useApi() {
	return {
		queries: {
			categories: {
				getAllCategories: useGetAllCategoriesQuery,
			},
			recipes: {
				getAllRecipes: useGetAllRecipesQuery,
				getRecipesWithFilters: useGetRecipesWithFiltersQuery,
			},
		},
		mutations: {},
	};
}
