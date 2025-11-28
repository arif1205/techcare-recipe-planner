import CategoryFilter from "@/components/browse-receipe/filter/CategoryFilter";
import ReceipeEmptyList from "@/components/browse-receipe/recipe-list/empty/ReceipeEmptyList";
import ReceipeLoadError from "@/components/browse-receipe/recipe-list/error/ReceipeLoadError";
import ReceipeCardSkeleton from "@/components/browse-receipe/recipe-list/ReceipeCardSkeleton";
import RecipeCard from "@/components/browse-receipe/recipe-list/RecipeCard";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useRecipeFilters } from "@/hooks/recipe/useRecipeFilters.hooks";
import { useRecipes } from "@/hooks/recipe/useRecipes.hooks";
import type { Recipe } from "@/types";

interface AddMealModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSelectRecipe: (recipe: Recipe) => void;
}

const AddMealModal = ({
	open,
	onOpenChange,
	onSelectRecipe,
}: AddMealModalProps) => {
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

	const { data, isLoading, isError, emptyMeals } = useRecipes({
		searchQuery: debouncedSearchQuery ?? "",
		selectedCategory: selectedCategoryLabel ?? undefined,
	});

	const handleRecipeSelect = (recipe: Recipe) => {
		onSelectRecipe(recipe);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-full! w-6xl! max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-nunito'>
						Select a Recipe
					</DialogTitle>
					<DialogDescription className='font-inter'>
						Search and filter recipes to add to your meal plan
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-6 mt-4'>
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

					{isLoading && <ReceipeCardSkeleton />}
					{isError && <ReceipeLoadError />}
					{emptyMeals && <ReceipeEmptyList />}
					{!isLoading && !isError && !emptyMeals && (
						<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto'>
							{data?.meals?.map((recipe: Recipe) => (
								<RecipeCard
									key={recipe.idMeal}
									recipe={recipe}
									onClick={() => handleRecipeSelect(recipe)}
								/>
							))}
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddMealModal;
