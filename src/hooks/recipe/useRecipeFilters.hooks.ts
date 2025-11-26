import type { Category, OptionType } from "@/types";
import { useMemo, useState } from "react";
import { useApi } from "../api/useApi.hooks";

export const useRecipeFilters = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] =
		useState<Category["idCategory"]>();

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
		return (categoriesData?.categories ?? []).map((cat) => ({
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
