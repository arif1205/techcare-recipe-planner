import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface WeekNavigatorProps {
	formattedDateRange: string;
	onPreviousWeek: () => void;
	onNextWeek: () => void;
}

const WeekNavigator = ({
	formattedDateRange,
	onPreviousWeek,
	onNextWeek,
}: WeekNavigatorProps) => {
	return (
		<div className='flex items-center justify-center gap-2 mb-2'>
			<Button
				variant='outline'
				size='icon'
				onClick={onPreviousWeek}
				className='rounded-full size-7 cursor-pointer select-none'>
				<ChevronLeft className='size-4' />
			</Button>

			<div className='flex items-center gap-3 px-2 py-1 bg-white rounded-sm border border-gray-400 select-none'>
				<Calendar className='size-4' />
				<span className='text-sm'>{formattedDateRange}</span>
			</div>

			<Button
				variant='outline'
				size='icon'
				onClick={onNextWeek}
				className='rounded-full size-7 cursor-pointer user-select-none'>
				<ChevronRight className='size-4' />
			</Button>
		</div>
	);
};

export default WeekNavigator;
