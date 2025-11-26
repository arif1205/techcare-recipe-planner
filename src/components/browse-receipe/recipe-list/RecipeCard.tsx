import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Recipe } from "@/types";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
	return (
		<Card
			key={recipe.idMeal}
			className='overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-gray-200'>
			<div className='relative w-full h-48 overflow-hidden'>
				<img
					src={recipe.strMealThumb}
					alt={recipe.strMeal}
					className='w-full h-full object-cover'
					loading='lazy'
					fetchPriority='low'
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
	);
};

export default RecipeCard;
