import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Recipe } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: API_BASE_URL,
	}),

	endpoints: (builder) => ({
		getRecipes: builder.query<Recipe[], void>({
			query: () => "/",
		}),
	}),
});

export const { useGetRecipesQuery } = api;
