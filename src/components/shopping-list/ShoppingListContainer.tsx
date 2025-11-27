import { Card, CardContent } from "@/components/ui/card";
import { useShoppingList } from "@/hooks/recipe/useShoppingList.hooks";
import { useMemo } from "react";
import IngredientsListComponent from "./ingredients-list/IngredientsList";

const ShoppingListContainer = () => {
	const {
		ingredientsList,
		clearCompletedIngredients,
		updateIngredientsByPurchasedStatus,
	} = useShoppingList();

	const hasCompletedItems = useMemo(() => {
		return Object.values(ingredientsList).some((item) => item.purchased);
	}, [ingredientsList]);

	return (
		<div className='space-y-6'>
			<Card className='border-emerald-200'>
				<CardContent className=''>
					<div className='space-y-6'>
						<IngredientsListComponent
							ingredientsList={ingredientsList}
							onToggleIngredient={updateIngredientsByPurchasedStatus}
							onClearCompleted={clearCompletedIngredients}
							hasCompletedItems={hasCompletedItems}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ShoppingListContainer;
