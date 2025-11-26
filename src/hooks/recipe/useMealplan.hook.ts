import { useState, useMemo } from "react";
import {
	startOfWeek,
	endOfWeek,
	addWeeks,
	subWeeks,
	format,
	eachDayOfInterval,
	isSameDay,
} from "date-fns";
import { useMealPlanState } from "@/hooks/store/global.store.hooks";
import type { MealPlanRecipe } from "@/types";

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
	 * Week controllers
	 */
	const [weekStart, setWeekStart] = useState(() =>
		startOfWeek(new Date(), { weekStartsOn: 1 })
	);
	const weekEnd = useMemo(
		() => endOfWeek(weekStart, { weekStartsOn: 1 }),
		[weekStart]
	);

	const goToPreviousWeek = () => {
		setWeekStart((prev) => subWeeks(prev, 1));
	};
	const goToNextWeek = () => {
		setWeekStart((prev) => addWeeks(prev, 1));
	};
	const goToCurrentWeek = () => {
		setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
	};

	/**
	 * Week UI helpers
	 */
	const weekDays = useMemo(() => {
		return eachDayOfInterval({ start: weekStart, end: weekEnd });
	}, [weekStart, weekEnd]);

	const weekDateRange = useMemo(() => {
		return `${format(weekStart, "MMM dd")} - ${format(
			weekEnd,
			"MMM dd, yyyy"
		)}`;
	}, [weekStart, weekEnd]);

	const formatDateKey = (date: Date): string => {
		return format(date, "yyyy-MM-dd");
	};

	const formatDayLabel = (date: Date): string => {
		return format(date, "EEE");
	};

	const formatDayNumber = (date: Date): string => {
		return format(date, "d");
	};

	const isToday = (date: Date): boolean => {
		return isSameDay(date, new Date());
	};

	/**
	 * Meal plan controllers
	 */
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
		weekStart,
		weekEnd,
		weekDays,
		weekDateRange,
		isModalOpen,
		selectedDate,
		setSelectedDate,
		mealPlan,
		setIsModalOpen,
		handleAddMeal,
		getMealForDate,
		goToPreviousWeek,
		goToNextWeek,
		goToCurrentWeek,
		formatDateKey,
		formatDayLabel,
		formatDayNumber,
		isToday,
	};
};
