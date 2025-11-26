import type {
	CategoriesResponse,
	Recipe,
	RecipesByCategoryResponse,
	RecipesResponse,
} from "@/types";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
		/**
		 * !IMPORTANT: This endpoint runs both queries in parallel if both filters are provided.
		 */
		getRecipesWithFilters: builder.query<
			RecipesResponse,
			{ searchQuery?: string; category?: string }
		>({
			async queryFn(
				{ searchQuery, category },
				_queryApi,
				_extraOptions,
				fetchWithBQ
			) {
				const promises: Promise<
					| { data: RecipesResponse }
					| { error: { status: string; error: string } }
				>[] = [];

				promises.push(
					Promise.resolve(
						fetchWithBQ({
							url: `/search.php?s=${searchQuery || ""}`,
							method: "GET",
						})
					).then((result) => {
						if ("error" in result) {
							return {
								error: {
									status: "FETCH_ERROR",
									error: String(result.error),
								},
							};
						}
						return { data: result.data as RecipesResponse };
					})
				);

				if (category) {
					promises.push(
						Promise.resolve(
							fetchWithBQ({
								url: `/filter.php?c=${category}`,
								method: "GET",
							})
						).then((result) => {
							if ("error" in result) {
								return {
									error: {
										status: "FETCH_ERROR",
										error: String(result.error),
									},
								};
							}
							return { data: result.data as RecipesResponse };
						})
					);
				}

				const results = await Promise.all(promises);

				/**
				 * Handling errors
				 */
				const errorResult = results.find((r) => "error" in r);
				if (errorResult && "error" in errorResult) {
					return {
						error: errorResult.error as FetchBaseQueryError,
					};
				}

				/**
				 * Handling single result
				 */
				if (results.length === 1) {
					const result = results[0] as { data: RecipesResponse };
					return { data: result.data };
				}

				/**
				 * Handling both search and category results
				 */
				const searchResult = results[0] as { data: RecipesResponse };
				const categoryResult = results[1] as {
					data: RecipesByCategoryResponse;
				};
				const searchResults = searchResult.data;
				const categoryResults = categoryResult.data;

				if (!searchResults?.meals?.length || !categoryResults?.meals?.length) {
					return { data: { meals: [] } as RecipesResponse };
				}

				const categoryMealIds = new Set(
					categoryResults.meals.map((meal) => meal.idMeal)
				);
				const filteredMeals = searchResults.meals.filter((meal) =>
					categoryMealIds.has(meal.idMeal)
				);

				return { data: { meals: filteredMeals } as RecipesResponse };
			},
			providesTags: (_result, _error, { searchQuery, category }) => [
				{
					type: "Recipes",
					id: `search-${searchQuery || ""}-cat-${category || ""}`,
				},
			],
			keepUnusedDataFor: 60 * 60,
		}),
		getRecipeById: builder.query<Recipe, string>({
			query: (id: string) => `/lookup.php?i=${id}`,
			transformErrorResponse: (response) => {
				return response.data;
			},
			keepUnusedDataFor: 60 * 60,
			providesTags: (result) =>
				result
					? [{ type: "Recipes", id: result.idMeal }]
					: [{ type: "Recipes", id: "NOT_FOUND" }],
			transformResponse: (response) => {
				return (response as RecipesResponse).meals[0];
			},
		}),
	}),
});

export const {
	useGetAllCategoriesQuery,
	useGetAllRecipesQuery,
	useGetRecipesWithFiltersQuery,
	useGetRecipeByIdQuery,
} = api;
