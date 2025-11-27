import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";

const NoIngredient = () => {
	return (
		<div className='flex flex-col items-center justify-center py-12 px-4'>
			<Empty>
				<EmptyHeader>
					<EmptyTitle>No ingredients in your shopping list yet.</EmptyTitle>
					<EmptyDescription>
						Add meals to your meal plan to see ingredients here.
					</EmptyDescription>
				</EmptyHeader>
			</Empty>
		</div>
	);
};

export default NoIngredient;
