import { useGetAllCategoriesQuery } from "@/store/api/api";

export function useApi() {
	return {
		queries: {
			categories: {
				getAllCategories: useGetAllCategoriesQuery,
			},
		},
		mutations: {},
	};
}
