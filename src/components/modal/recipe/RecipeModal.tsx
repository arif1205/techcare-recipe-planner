import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { INSTRUCTIONS_PREVIEW_LENGTH } from "@/data/index.data";
import { useRecipeDetails } from "@/hooks/recipe/useRecipeDetails.hook";
import { useState } from "react";

interface RecipeModalProps {
	recipeId?: string;
	open: boolean;
	onOpenChange: () => void;
}

const RecipeModal = ({ recipeId, open, onOpenChange }: RecipeModalProps) => {
	const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(false);
	const { data, isLoading, isError, ingredients } = useRecipeDetails({
		recipeId,
		shouldSkip: !recipeId || !open,
	});

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				setIsInstructionsExpanded(false);
				onOpenChange();
			}}>
			<DialogContent className='max-w-full w-2xl max-h-[90vh] overflow-y-auto'>
				{isLoading && (
					<div className='flex items-center justify-center py-12'>
						<Spinner className='size-8' />
					</div>
				)}

				{isError && (
					<div className='text-center py-12'>
						<p className='text-red-600 font-inter text-lg'>
							Failed to load recipe details. Please try again later.
						</p>
					</div>
				)}

				{!isLoading && !isError && data && (
					<>
						<DialogHeader>
							<DialogTitle className='text-2xl font-nunito'>
								{data.strMeal}
							</DialogTitle>
							<DialogDescription className='font-inter'>
								<Badge variant='emerald'>{data.strCategory}</Badge> •{" "}
								{data.strArea}
							</DialogDescription>
						</DialogHeader>

						<div className='space-y-6'>
							<div className='relative w-full h-64 rounded-lg overflow-hidden'>
								<img
									src={data.strMealThumb}
									alt={data.strMeal}
									className='w-full h-full object-cover'
									loading='lazy'
									fetchPriority='low'
								/>
							</div>

							<Separator />

							<div>
								<h3 className='text-lg font-semibold font-nunito mb-2'>
									Instructions
								</h3>
								<p className='text-gray-700 font-inter whitespace-pre-line text-sm italic'>
									{isInstructionsExpanded ||
									data.strInstructions.length <= INSTRUCTIONS_PREVIEW_LENGTH
										? data.strInstructions
										: `${data.strInstructions.slice(
												0,
												INSTRUCTIONS_PREVIEW_LENGTH
										  )}...`}
								</p>
								{data.strInstructions.length > INSTRUCTIONS_PREVIEW_LENGTH && (
									<Button
										variant='ghost'
										size='sm'
										onClick={() =>
											setIsInstructionsExpanded(!isInstructionsExpanded)
										}
										className='mt-2 hover:cursor-pointer font-inter text-sm px-0 py-0! hover:bg-transparent underline'>
										{isInstructionsExpanded ? "See less" : "See more"}
									</Button>
								)}
							</div>

							<Separator />

							<div>
								<h3 className='text-lg font-semibold font-nunito mb-3'>
									Ingredients
								</h3>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
									{ingredients.map((item, index) => (
										<div
											key={index}
											className='flex items-center gap-2 p-2 rounded-md bg-gray-50'>
											<span className='font-inter text-sm'>
												{item.measure && (
													<span className='font-semibold'>{item.measure}</span>
												)}{" "}
												{item.ingredient}
											</span>
										</div>
									))}
								</div>
							</div>

							<Separator />

							{data.strTags && (
								<div>
									<h3 className='text-lg font-semibold font-nunito mb-2'>
										Tags
									</h3>
									<div className='flex flex-wrap gap-2'>
										{data.strTags.split(",").map((tag) => (
											<Badge variant='emerald'>{tag.trim()}</Badge>
										))}
									</div>
								</div>
							)}

							<div>
								{data.strYoutube && (
									<div>
										<a
											href={data.strYoutube}
											target='_blank'
											rel='noopener noreferrer'
											className='text-blue-600 hover:text-blue-700 underline font-inter text-sm'>
											Watch on YouTube
										</a>
									</div>
								)}

								{data.strSource && (
									<div>
										<a
											href={data.strSource}
											target='_blank'
											rel='noopener noreferrer'
											className='text-blue-600 hover:text-blue-700 underline font-inter text-sm'>
											View Original Recipe Source
										</a>
									</div>
								)}
							</div>
						</div>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default RecipeModal;
