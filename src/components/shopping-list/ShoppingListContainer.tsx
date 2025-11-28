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
		<Card className='border-gray-200 shadow-none!'>
			<CardContent className=''>
				<IngredientsListComponent
					ingredientsList={ingredientsList}
					onToggleIngredient={updateIngredientsByPurchasedStatus}
					onClearCompleted={clearCompletedIngredients}
					hasCompletedItems={hasCompletedItems}
				/>
			</CardContent>
		</Card>
	);
};

export default ShoppingListContainer;
