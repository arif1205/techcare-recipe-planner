import {
	useGetAllCategoriesQuery,
	useGetAllRecipesQuery,
	useGetRecipeByCategoryQuery,
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
				getRecipeByCategory: useGetRecipeByCategoryQuery,
				getRecipesWithFilters: useGetRecipesWithFiltersQuery,
			},
		},
		mutations: {},
	};
}
