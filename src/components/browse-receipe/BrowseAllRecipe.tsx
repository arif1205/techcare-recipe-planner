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
			/>

			{selectedCategories.length > 0 && (
				<div className='flex flex-wrap gap-2'>
					<span className='text-sm font-semibold text-emerald-700 font-inter'>
						Selected:
					</span>
					{selectedCategoryLabels.map((label) => (
						<span
							key={label}
							className='inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 font-inter'>
							{label}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default BrowseAllRecipe;
