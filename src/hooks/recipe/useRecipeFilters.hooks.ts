import type { Category, OptionType } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useApi } from "../api/useApi.hooks";

export const useRecipeFilters = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] =
		useState<Category["idCategory"]>();

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchQuery(searchQuery);
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [searchQuery]);

	/**
	 * Fetching all categories from the API
	 * Returnes the list of the categories.
	 * Process the data to be used in the dropdown menu
	 */
	const {
		data: categoriesData,
		isLoading,
		isError,
	} = useApi().queries.categories.getAllCategories();

	const categoryOptions = useMemo<OptionType[]>(() => {
		return (categoriesData?.categories ?? [])
			.filter((cat) => cat.strCategory?.toLowerCase() !== "pork")
			.map((cat) => ({
				id: cat.idCategory,
				label: cat.strCategory,
			}));
	}, [categoriesData?.categories]);

	const selectedCategoryLabel = useMemo(() => {
		return categoryOptions?.find((cat) => cat.id === selectedCategory)?.label;
	}, [categoryOptions, selectedCategory]);

	const clearFilters = () => {
		setSearchQuery("");
		setSelectedCategory(undefined);
	};

	const hasActiveFilters =
		searchQuery.length > 0 || selectedCategory !== undefined;

	return {
		searchQuery,
		setSearchQuery,
		debouncedSearchQuery,
		selectedCategory,
		setSelectedCategory,
		selectedCategoryLabel,
		categoryOptions,
		isLoadingCategories: isLoading,
		isErrorCategories: isError,
		clearFilters,
		hasActiveFilters,
	};
};
