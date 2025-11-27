import { useWeek } from "@/hooks/week/useWeek.hook";
import WeekNavigator from "../meal-plan/calendar/WeekNavigator";

const MealPlanContainer = () => {
	const { weekDateRange, goToPreviousWeek, goToNextWeek, goToCurrentWeek } =
		useWeek();

	return (
		<div className='space-y-6'>
			<WeekNavigator
				formattedDateRange={weekDateRange}
				onPreviousWeek={goToPreviousWeek}
				onNextWeek={goToNextWeek}
				onGoToCurrentWeek={goToCurrentWeek}
			/>
		</div>
	);
};

export default MealPlanContainer;
