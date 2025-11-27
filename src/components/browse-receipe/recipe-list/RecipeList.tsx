import { useState } from "react";
import { useRecipes } from "@/hooks/recipe/useRecipes.hooks";
import type { Category, Recipe } from "@/types";
import ReceipeEmptyList from "./empty/ReceipeEmptyList";
import ReceipeLoadError from "./error/ReceipeLoadError";
import ReceipeCardSkeleton from "./ReceipeCardSkeleton";
import RecipeCard from "./RecipeCard";
import RecipeModal from "@/components/modal/recipe/RecipeModal";

interface RecipeListProps {
	debouncedSearchQuery?: string;
	selectedCategory?: Category["idCategory"];
}

const RecipeList = ({
	debouncedSearchQuery,
	selectedCategory,
}: RecipeListProps) => {
	const [selectedRecipeId, setSelectedRecipeId] = useState<string>();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { data, isLoading, isError, emptyMeals } = useRecipes({
		searchQuery: debouncedSearchQuery ?? "",
		selectedCategory,
	});

	const handleRecipeClick = (recipeId: string) => {
		setSelectedRecipeId(recipeId);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedRecipeId(undefined);
	};

	if (isLoading) return <ReceipeCardSkeleton />;
	if (isError) return <ReceipeLoadError />;
	if (emptyMeals) return <ReceipeEmptyList />;

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{data?.meals?.map((recipe: Recipe) => (
					<RecipeCard
						key={recipe.idMeal}
						recipe={recipe}
						onClick={handleRecipeClick}
					/>
				))}
			</div>

			<RecipeModal
				recipeId={selectedRecipeId}
				open={isModalOpen}
				onOpenChange={handleModalClose}
			/>
		</>
	);
};

export default RecipeList;
