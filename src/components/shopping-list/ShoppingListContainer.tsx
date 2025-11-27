import { Card, CardContent } from "@/components/ui/card";
import { useShoppingList } from "@/hooks/recipe/useShoppingList.hooks";
import { useWeek } from "@/hooks/week/useWeek.hook";
import { useMemo } from "react";
import WeekNavigator from "../meal-plan/calendar/WeekNavigator";
import IngredientsListComponent from "./ingredients-list/IngredientsList";

const ShoppingListContainer = () => {
	const { weekDateRange, goToPreviousWeek, goToNextWeek, goToCurrentWeek } =
		useWeek();
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
			<WeekNavigator
				formattedDateRange={weekDateRange}
				onPreviousWeek={goToPreviousWeek}
				onNextWeek={goToNextWeek}
				onGoToCurrentWeek={goToCurrentWeek}
			/>

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
