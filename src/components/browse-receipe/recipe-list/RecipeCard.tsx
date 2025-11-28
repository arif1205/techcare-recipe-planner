import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Recipe } from "@/types";

interface RecipeCardProps {
	recipe: Recipe;
	onClick: (recipeId: string) => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
	return (
		<Card
			key={recipe.idMeal}
			onClick={() => onClick(recipe.idMeal)}
			className='overflow-hidden cursor-pointer border-gray-200 pt-0 shadow-xs group gap-2'>
			<div className='relative w-full h-48 overflow-hidden'>
				<img
					src={recipe.strMealThumb}
					alt={recipe.strMeal}
					className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
					loading='lazy'
					fetchPriority='low'
				/>
			</div>
			<CardHeader className='px-4'>
				<CardTitle className='font-nunito text-lg line-clamp-1'>
					{recipe.strMeal}
				</CardTitle>
				<div className='text-sm text-gray-600 font-inter mt-1 flex items-center gap-1'>
					<Badge variant='outline' className='text-gray-600'>
						{recipe.strCategory}
					</Badge>
					<span className='text-xs'>•</span>
					<Badge variant='outline'>{recipe.strArea}</Badge>
				</div>
			</CardHeader>
			<CardContent className='px-4'>
				<p className='text-sm text-gray-700 font-inter line-clamp-3 whitespace-pre-line italic'>
					{recipe.strInstructions}
				</p>
			</CardContent>
		</Card>
	);
};

export default RecipeCard;
