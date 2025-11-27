import AddMealModal from "@/components/modal/meal-planner/AddMealModal";
import { useMealPlan } from "@/hooks/recipe/useMealplan.hook";
import { useAppDispatch } from "@/hooks/store/store.hooks";
import {
	addToMealPlan,
	removeFromMealPlan,
} from "@/store/slice/global/globalSlice";
import type { Recipe } from "@/types";
import { convertRecipeToMealPlanRecipe } from "@/utils/recipe.utils";
import DayCard from "./calendar/DayCard";
import WeekNavigator from "./calendar/WeekNavigator";
import { toast } from "sonner";
import { format } from "date-fns";
import { useWeek } from "@/hooks/week/useWeek.hook";

const MealPlanContainer = () => {
	const dispatch = useAppDispatch();

	const {
		weekDays,
		weekDateRange,
		goToPreviousWeek,
		goToNextWeek,
		goToCurrentWeek,
		formatDateKey,
		formatDayLabel,
		formatDayNumber,
		isToday,
	} = useWeek();

	const {
		isModalOpen,
		selectedDate,
		setIsModalOpen,
		setSelectedDate,
		getMealForDate,
		handleAddMeal,
	} = useMealPlan();

	const handleSelectRecipe = (recipe: Recipe) => {
		if (!selectedDate) return;

		const dateKey = formatDateKey(selectedDate);
		const mealPlanRecipe = convertRecipeToMealPlanRecipe(recipe);

		dispatch(
			addToMealPlan({
				date: dateKey,
				recipe: mealPlanRecipe,
			})
		);

		setSelectedDate(null);
		setIsModalOpen(false);

		toast.success(
			`Recipe "${recipe.strMeal}" added to meal plan for ${format(
				selectedDate,
				"EEEE, MMM dd, yyyy"
			)}`
		);
	};

	const handleRemoveMeal = (date: Date) => {
		const dateKey = formatDateKey(date);
		dispatch(removeFromMealPlan(dateKey));
		toast.success(
			`Meal removed from meal plan for ${format(date, "EEEE, MMM dd, yyyy")}`
		);
	};

	return (
		<div className='space-y-6'>
			<WeekNavigator
				formattedDateRange={weekDateRange}
				onPreviousWeek={goToPreviousWeek}
				onNextWeek={goToNextWeek}
				onGoToCurrentWeek={goToCurrentWeek}
			/>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2'>
				{weekDays.map((day) => (
					<div key={formatDateKey(day)} className='flex flex-col relative'>
						<DayCard
							dayLabel={formatDayLabel(day)}
							dayNumber={formatDayNumber(day)}
							meal={getMealForDate(day)}
							isToday={isToday(day)}
							onAddMeal={() => handleAddMeal(day)}
							onRemoveMeal={() => handleRemoveMeal(day)}
						/>
					</div>
				))}
			</div>

			<AddMealModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				onSelectRecipe={handleSelectRecipe}
			/>
		</div>
	);
};

export default MealPlanContainer;
