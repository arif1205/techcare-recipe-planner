import type { RootState } from "@/store/store";
import { useAppSelector } from "./store.hooks";

export function useGlobalState() {
	return useAppSelector((state: RootState) => state.global);
}

export function useMealPlanState(dateRange?: {
	startDate: Date;
	endDate: Date;
}) {
	const mealPlan = useAppSelector((state: RootState) => state.global.mealPlan);

	if (!dateRange) return { mealPlan };

	const mealPlanDates = Object.keys(mealPlan);

	const mealPlanDatesInRange = mealPlanDates.filter((date) => {
		const dateObj = new Date(date);
		return dateObj >= dateRange.startDate && dateObj <= dateRange.endDate;
	});

	return {
		mealPlan: mealPlanDatesInRange,
		startDate: dateRange.startDate,
		endDate: dateRange.endDate,
	};
}
