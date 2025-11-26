import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, X } from "lucide-react";
import type { MealPlanRecipe } from "@/types";
import { cn } from "@/lib/utils";

interface DayCardProps {
	dayLabel: string;
	dayNumber: string;
	meal: MealPlanRecipe | null;
	isToday: boolean;
	onAddMeal: () => void;
	onRemoveMeal: () => void;
}

const DayCard = ({
	dayLabel,
	dayNumber,
	meal,
	isToday,
	onAddMeal,
	onRemoveMeal,
}: DayCardProps) => {
	return (
		<div className='flex flex-col h-full'>
			<Card
				className={cn("flex-1 flex flex-col border transition-all gap-2", {
					"border-emerald-500 bg-emerald-50/50": isToday,
					"border-gray-200 bg-white": !isToday,
				})}>
				<CardHeader className=''>
					<div className='flex flex-col items-center gap-1'>
						<span className='text-sm font-semibold text-gray-600 font-inter uppercase'>
							{dayLabel}
						</span>
						<span
							className={cn("text-4xl font-bold font-nunito", {
								"text-emerald-600": isToday,
								"text-gray-800": !isToday,
							})}>
							{dayNumber}
						</span>
					</div>
				</CardHeader>

				<Separator />

				<CardContent className='flex-1 flex flex-col gap-3 sm:min-h-52 px-2'>
					{meal ? (
						<div className='flex-1 flex flex-col gap-2'>
							<div className='relative w-full h-28'>
								<figure className='w-full h-full overflow-hidden rounded-sm'>
									<img
										src={meal.thumbnail}
										alt={meal.name}
										className='w-full h-full object-cover'
										loading='lazy'
									/>
								</figure>
								<Button
									variant='destructive'
									size='icon'
									onClick={(e) => {
										e.stopPropagation();
										onRemoveMeal();
									}}
									className='absolute -top-1 -right-1 size-7 rounded-full bg-red-500/90 hover:bg-red-600 shadow-lg transition-opacity cursor-pointer'>
									<X className='size-4' />
								</Button>
							</div>
							<div>
								<h3 className='font-semibold text-center font-nunito line-clamp-2 text-gray-800'>
									{meal.name}
								</h3>
								<p className='text-sm text-center font-inter mt-1 italic'>
									{meal.category}
								</p>
							</div>
						</div>
					) : (
						<div className='flex-1 flex items-center justify-center'>
							<p className='text-sm text-gray-400 font-inter text-center'>
								No meal planned
							</p>
						</div>
					)}

					<Button
						variant='outline'
						size='sm'
						onClick={onAddMeal}
						className='w-full gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-inter'>
						<Plus className='size-4' />
						{meal ? "Change Meal" : "Add Meal"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default DayCard;
