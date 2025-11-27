import type { IngredientsList } from "@/types";
import IngredientItem from "../ingredient-item/IngredientItem";
import NoIngredient from "./empty/NoIngredient";
import ShoppingListActions from "../actions/ShoppingListActions";

interface IngredientsListProps {
	ingredientsList: IngredientsList;
	onToggleIngredient: (ingredient: string, purchased: boolean) => void;
	onClearCompleted: () => void;
	hasCompletedItems: boolean;
}

const IngredientsListComponent = ({
	ingredientsList,
	onToggleIngredient,
	onClearCompleted,
	hasCompletedItems,
}: IngredientsListProps) => {
	const ingredients = Object.entries(ingredientsList);
	const purchasedCount = ingredients.filter(
		([, value]) => value.purchased
	).length;

	if (ingredients.length === 0) return <NoIngredient />;

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center justify-start gap-2 px-1'>
					<h3 className='text-lg font-semibold font-nunito text-gray-800'>
						Shopping List
					</h3>
					<span className='text-sm font-inter text-gray-800'>
						{purchasedCount} / {ingredients.length} completed
					</span>
				</div>

				<ShoppingListActions
					onClearCompleted={onClearCompleted}
					hasCompletedItems={hasCompletedItems}
				/>
			</div>

			{ingredients.length > 0 && (
				<div className='space-y-2'>
					{ingredients.map(([ingredient, value], index) => (
						<IngredientItem
							key={ingredient}
							ingredient={ingredient}
							purchased={value.purchased}
							onToggle={onToggleIngredient}
							isLast={index === ingredients.length - 1}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default IngredientsListComponent;
