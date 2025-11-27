import { useIngredientsListState } from "@/hooks/store/global.store.hooks";

export const useShoppingList = () => {
	/**
	 * Ingredinets controllers
	 */
	const {
		ingredientsList,
		clearCompletedIngredients,
		updateIngredientsByPurchasedStatus,
	} = useIngredientsListState();

	return {
		ingredientsList,
		clearCompletedIngredients,
		updateIngredientsByPurchasedStatus,
	};
};
