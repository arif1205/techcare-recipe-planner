import type { Category, OptionType } from "@/types";
import { useMemo, useState } from "react";
import { useApi } from "../api/api.hooks";

export const useRecipeFilters = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<
		Category["idCategory"][]
	>([]);

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

	const selectedCategoryLabels = useMemo(() => {
		return categoryOptions
			.filter((cat) => selectedCategories.includes(cat.id))
			.map((cat) => cat.label);
	}, [categoryOptions, selectedCategories]);

	const clearFilters = () => {
		setSearchQuery("");
		setSelectedCategories([]);
	};

	const hasActiveFilters =
		searchQuery.length > 0 || selectedCategories.length > 0;

	return {
		searchQuery,
		setSearchQuery,
		selectedCategories,
		setSelectedCategories,
		selectedCategoryLabels,
		categoryOptions,
		isLoadingCategories: isLoading,
		isErrorCategories: isError,
		clearFilters,
		hasActiveFilters,
	};
};
