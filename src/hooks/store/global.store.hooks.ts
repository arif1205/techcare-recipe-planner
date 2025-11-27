import {
	clearPurchasedIngredients,
	purchaseIngredient,
	setCurrentTab,
	setCurrentWeek,
	unpurchaseIngredient,
} from "@/store/slice/global/globalSlice";
import type { RootState } from "@/store/store";
import type { IngredientsList, MealPlanRecipe, TabsType } from "@/types";
import { useAppDispatch, useAppSelector } from "./store.hooks";

export function useGlobalState() {
	return useAppSelector((state: RootState) => state.global);
}

export function useMealPlanState(dateRange?: {
	startDate: Date;
	endDate: Date;
}): {
	mealPlan: Record<string, MealPlanRecipe>;
	startDate?: Date;
	endDate?: Date;
} {
	const mealPlan = useAppSelector((state: RootState) => state.global.mealPlan);

	if (!dateRange) return { mealPlan };

	const mealPlanDates = Object.keys(mealPlan);

	const mealPlansInRange = mealPlanDates.reduce<Record<string, MealPlanRecipe>>(
		(acc, date) => {
			const dateObj = new Date(date);
			if (dateObj >= dateRange.startDate && dateObj <= dateRange.endDate) {
				acc[date] = mealPlan[date as keyof typeof mealPlan];
				return acc;
			}
			return acc;
		},
		{}
	);

	return {
		mealPlan: mealPlansInRange,
		startDate: dateRange.startDate,
		endDate: dateRange.endDate,
	};
}

export function useCurrentTabState(): {
	currentTab: TabsType;
	handleChangeTab: (tab: TabsType) => void;
} {
	const currentTab = useAppSelector(
		(state: RootState) => state.global.currentTab
	);
	const dispatch = useAppDispatch();
	const handleChangeTab = (tab: TabsType) => {
		dispatch(setCurrentTab(tab));
	};
	return { currentTab, handleChangeTab };
}

export function useCurrentWeekState(): {
	weekStart: Date;
	weekEnd: Date;
	updateCurrentWeek: (weekStart: Date, weekEnd: Date) => void;
} {
	const currentWeek = useAppSelector(
		(state: RootState) => state.global.currentWeek
	);
	const dispatch = useAppDispatch();

	const updateCurrentWeek = (weekStart: Date, weekEnd: Date) => {
		dispatch(setCurrentWeek({ weekStart, weekEnd }));
	};

	return {
		weekStart: new Date(currentWeek.weekStart || new Date()),
		weekEnd: new Date(currentWeek.weekEnd || new Date()),
		updateCurrentWeek,
	};
}

export function useIngredientsListState(): {
	ingredientsList: IngredientsList;
	updateIngredientsByPurchasedStatus: (
		ingredient: string,
		purchased: boolean
	) => void;
	clearCompletedIngredients: () => void;
} {
	const ingredientsList = useAppSelector(
		(state: RootState) => state.global.ingredientsList
	);
	const dispatch = useAppDispatch();
	const updateIngredientsByPurchasedStatus = (
		ingredient: string,
		purchased: boolean
	) => {
		if (purchased) {
			dispatch(purchaseIngredient(ingredient));
		} else {
			dispatch(unpurchaseIngredient(ingredient));
		}
	};

	const clearCompletedIngredients = () => {
		dispatch(clearPurchasedIngredients());
	};

	return {
		ingredientsList,
		updateIngredientsByPurchasedStatus,
		clearCompletedIngredients,
	};
}
