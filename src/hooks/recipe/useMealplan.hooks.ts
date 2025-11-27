import { useMealPlanState } from "@/hooks/store/global.store.hooks";
import type { MealPlanRecipe } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import { useWeek } from "../week/useWeek.hook";

export const useMealPlan = () => {
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
	const { weekStart, weekEnd } = useWeek();
	const { mealPlan } = useMealPlanState({
		startDate: weekStart,
		endDate: weekEnd,
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
