import { useRecipeFilters } from "@/hooks/recipe/useRecipeFilters.hooks";
import CategoryFilter from "./filter/CategoryFilter";
import RecipeList from "./recipe-list/RecipeList";

const BrowseAllRecipe = () => {
	const {
		searchQuery,
		setSearchQuery,
		debouncedSearchQuery,
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

			<RecipeList
				debouncedSearchQuery={debouncedSearchQuery}
				selectedCategory={selectedCategoryLabel}
			/>
		</div>
	);
};

export default BrowseAllRecipe;
