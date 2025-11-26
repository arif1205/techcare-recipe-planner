import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecipes } from "@/hooks/recipe/useRecipes.hook";
import type { Category, Recipe } from "@/types";

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

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{Array.from({ length: 6 }).map((_, index) => (
					<Card key={index} className='overflow-hidden border-gray-200'>
						<Skeleton className='w-full h-48' />
						<CardHeader>
							<Skeleton className='h-6 w-3/4' />
							<Skeleton className='h-4 w-1/2 mt-2' />
						</CardHeader>
					</Card>
				))}
			</div>
		);
	}

	if (isError) {
		return (
			<div className='text-center py-12'>
				<p className='text-red-600 font-inter text-lg'>
					Failed to load recipes. Please try again later.
				</p>
			</div>
		);
	}

	if (!data?.meals || data.meals.length === 0) {
		return (
			<div className='text-center py-12'>
				<p className='text-gray-600 font-inter text-lg'>
					No recipes found. Try a different search term.
				</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{data.meals.map((recipe: Recipe) => (
				<Card
					key={recipe.idMeal}
					className='overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-gray-200'>
					<div className='relative w-full h-48 overflow-hidden'>
						<img
							src={recipe.strMealThumb}
							alt={recipe.strMeal}
							className='w-full h-full object-cover'
						/>
					</div>
					<CardHeader>
						<CardTitle className='font-nunito text-lg line-clamp-2'>
							{recipe.strMeal}
						</CardTitle>
						<p className='text-sm text-gray-600 font-inter mt-1'>
							{recipe.strCategory} • {recipe.strArea}
						</p>
					</CardHeader>
					<CardContent>
						<p className='text-sm text-gray-700 font-inter line-clamp-3'>
							{recipe.strInstructions}
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default RecipeList;
