import { useRecipeFilters } from "@/hooks/recipe/useRecipeFilters.hooks";
import CategoryFilter from "./filter/CategoryFilter";

const BrowseAllRecipe = () => {
	const {
		searchQuery,
		setSearchQuery,
		selectedCategory,
		setSelectedCategory,
		selectedCategoryLabel,
		categoryOptions,
		isLoadingCategories,
		isErrorCategories,
	} = useRecipeFilters();

	return (
		<div className='space-y-6'>
			<CategoryFilter
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				selectedCategory={selectedCategory}
				onCategoryChange={setSelectedCategory}
				categoryOptions={categoryOptions}
				isLoading={isLoadingCategories}
				isError={isErrorCategories}
				selectedCategoryLabel={selectedCategoryLabel}
			/>
		</div>
	);
};

export default BrowseAllRecipe;
