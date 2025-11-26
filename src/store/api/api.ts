import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CategoriesResponse, RecipesResponse } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: API_BASE_URL,
	}),
	tagTypes: ["Categories", "Recipes"],
	endpoints: (builder) => ({
		getAllCategories: builder.query<CategoriesResponse, void>({
			query: () => "/categories.php",
			providesTags: (result) =>
				result
					? [{ type: "Categories", id: "LIST" }]
					: [{ type: "Categories", id: "LIST" }],
			transformErrorResponse: (response) => {
				return response.data;
			},
			keepUnusedDataFor: 60 * 60,
		}),
		getAllRecipes: builder.query<RecipesResponse, string>({
			query: (searchQuery: string) => `/search.php?s=${searchQuery}`,
			providesTags: (result) =>
				result
					? [{ type: "Recipes", id: "LIST" }]
					: [{ type: "Recipes", id: "LIST" }],
			transformErrorResponse: (response) => {
				return response.data;
			},
			keepUnusedDataFor: 60 * 60,
		}),
		getRecipeByCategory: builder.query<RecipesResponse, string>({
			query: (category: string) => `/filter.php?c=${category}`,
			providesTags: (result, _error, category) =>
				result
					? [{ type: "Recipes", id: category }]
					: [{ type: "Recipes", id: category }],
			transformErrorResponse: (response) => {
				return response.data;
			},
			keepUnusedDataFor: 60 * 60,
		}),
	}),
});

export const { useGetAllCategoriesQuery, useGetAllRecipesQuery } = api;
