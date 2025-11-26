import {
	useGetAllCategoriesQuery,
	useGetAllRecipesQuery,
} from "@/store/api/api";

export function useApi() {
	return {
		queries: {
			categories: {
				getAllCategories: useGetAllCategoriesQuery,
			},
			recipes: {
				getAllRecipes: useGetAllRecipesQuery,
			},
		},
		mutations: {},
	};
}
