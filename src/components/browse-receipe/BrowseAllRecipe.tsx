import { useRecipeFilters } from "@/hooks/recipe/useRecipeFilters";
import CategoryFilter from "../filter/CategoryFilter";

const BrowseAllRecipe = () => {
	const {
		searchQuery,
		setSearchQuery,
		selectedCategories,
		setSelectedCategories,
		selectedCategoryLabels,
		categoryOptions,
		isLoadingCategories,
		isErrorCategories,
	} = useRecipeFilters();

	return (
		<div className='space-y-6'>
			<CategoryFilter
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				selectedCategories={selectedCategories}
				onCategoryChange={setSelectedCategories}
				categoryOptions={categoryOptions}
				isLoading={isLoadingCategories}
				isError={isErrorCategories}
				selectedCategoryLabels={selectedCategoryLabels}
			/>
		</div>
	);
};

export default BrowseAllRecipe;
