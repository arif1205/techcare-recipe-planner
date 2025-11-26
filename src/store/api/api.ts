import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CategoriesResponse } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: API_BASE_URL,
	}),
	tagTypes: ["Categories"],
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
	}),
});

export const { useGetAllCategoriesQuery } = api;
