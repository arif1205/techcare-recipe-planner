import type { RootState } from "@/store/store";
import { useAppSelector } from "./store.hooks";
import type { MealPlanRecipe } from "@/types";

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
