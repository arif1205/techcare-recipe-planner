import { Card, CardContent } from "@/components/ui/card";
import { useShoppingList } from "@/hooks/recipe/useShoppingList.hooks";
import { useMemo } from "react";
import IngredientsListComponent from "./ingredients-list/IngredientsList";
import IngredientListSkeleton from "./ingredients-list/loading/IngredientListSkeleton";

const ShoppingListContainer = () => {
	const {
		ingredientsList,
		toggleIngredientsPurchasedStatus,
		isLoading,
		clearCompletedItems,
	} = useShoppingList();

	const hasCompletedItems = useMemo(() => {
		return Object.values(ingredientsList).some((item) => item.purchased);
	}, [ingredientsList]);

	return (
		<Card className='border-gray-200 shadow-none!'>
			<CardContent className=''>
				{isLoading ? (
					<IngredientListSkeleton />
				) : (
					<IngredientsListComponent
						ingredientsList={ingredientsList}
						onToggleIngredient={toggleIngredientsPurchasedStatus}
						onClearCompleted={clearCompletedItems}
						hasCompletedItems={hasCompletedItems}
					/>
				)}
			</CardContent>
		</Card>
	);
};

export default ShoppingListContainer;
