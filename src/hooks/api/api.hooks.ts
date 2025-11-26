import { useGetRecipesQuery } from "@/store/api/api";

export function useApi() {
	return {
		queries: {
			receipes: {
				getRecipes: useGetRecipesQuery,
			},
		},
		mutations: {},
	};
}
