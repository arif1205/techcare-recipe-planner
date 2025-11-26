import { useMealPlan } from "@/hooks/recipe/useMealplan.hook";
import DayCard from "./calendar/DayCard";
import WeekNavigator from "./calendar/WeekNavigator";

const MealPlanContainer = () => {
	const {
		weekDays,
		weekDateRange,
		getMealForDate,
		goToPreviousWeek,
		goToNextWeek,
		goToCurrentWeek,
		formatDateKey,
		formatDayLabel,
		formatDayNumber,
		isToday,
	} = useMealPlan();

	const handleAddMeal = (date: Date) => {
		const dateKey = formatDateKey(date);
		console.log("Add meal for date:", dateKey);
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
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default MealPlanContainer;
