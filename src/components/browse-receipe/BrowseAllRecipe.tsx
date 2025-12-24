import { useRecipeFilters } from "@/hooks/recipe/useRecipeFilters.hooks";
import CategoryFilter from "./filter/CategoryFilter";
import RecipeList from "./recipe-list/RecipeList";
import SearchFilter from "./filter/Search";

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
		<div className='space-y-4'>
			<div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
				<div className='flex-1'>
					<SearchFilter
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						isLoading={isLoadingCategories}
					/>
				</div>

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

			<RecipeList
				debouncedSearchQuery={debouncedSearchQuery}
				selectedCategory={selectedCategoryLabel}
			/>
		</div>
	);
};

export default BrowseAllRecipe;
