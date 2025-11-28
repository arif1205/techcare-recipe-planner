import { useMealPlanState } from "@/hooks/store/global.store.hooks";
import type { MealPlanRecipe } from "@/types";
import { format } from "date-fns";
import { useState } from "react";

export const useMealPlan = ({
	week,
}: {
	week: { weekStart: Date; weekEnd: Date };
}) => {
	/**
	 * Modal controllers
	 */
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const handleAddMeal = (date: Date) => {
		setSelectedDate(date);
		setIsModalOpen(true);
	};

	/**
	 * Meal plan controllers
	 */
	const { mealPlan } = useMealPlanState({
		startDate: week.weekStart,
		endDate: week.weekEnd,
	});

	/**
	 * Meal plan UI helpers
	 */
	const getMealForDate = (date: Date): MealPlanRecipe | null => {
		const dateKey = format(date, "yyyy-MM-dd");
		if (Array.isArray(mealPlan)) {
			return null;
		}
		return mealPlan[dateKey] || null;
	};

	return {
		isModalOpen,
		selectedDate,
		setSelectedDate,
		mealPlan,
		setIsModalOpen,
		handleAddMeal,
		getMealForDate,
	};
};
