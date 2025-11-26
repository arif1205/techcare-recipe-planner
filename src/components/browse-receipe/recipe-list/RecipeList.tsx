import { useRecipes } from "@/hooks/recipe/useRecipes.hook";
import type { Category, Recipe } from "@/types";
import ReceipeEmptyList from "./empty/ReceipeEmptyList";
import ReceipeLoadError from "./error/ReceipeLoadError";
import ReceipeCardSkeleton from "./ReceipeCardSkeleton";
import RecipeCard from "./RecipeCard";

interface RecipeListProps {
	debouncedSearchQuery?: string;
	selectedCategory?: Category["idCategory"];
}

const RecipeList = ({
	debouncedSearchQuery,
	selectedCategory,
}: RecipeListProps) => {
	const { data, isLoading, isError } = useRecipes({
		searchQuery: debouncedSearchQuery ?? "",
		selectedCategory,
	});

	if (isLoading) return <ReceipeCardSkeleton />;

	if (isError) return <ReceipeLoadError />;

	if (!data?.meals || data.meals.length === 0) {
		return <ReceipeEmptyList />;
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{data.meals.map((recipe: Recipe) => (
				<RecipeCard key={recipe.idMeal} recipe={recipe} />
			))}
		</div>
	);
};

export default RecipeList;
