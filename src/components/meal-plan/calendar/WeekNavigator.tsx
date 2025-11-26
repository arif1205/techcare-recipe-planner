import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface WeekNavigatorProps {
	formattedDateRange: string;
	onPreviousWeek: () => void;
	onNextWeek: () => void;
	onGoToCurrentWeek: () => void;
}

const WeekNavigator = ({
	formattedDateRange,
	onPreviousWeek,
	onNextWeek,
	onGoToCurrentWeek,
}: WeekNavigatorProps) => {
	return (
		<div className='flex items-center justify-center gap-4 mb-6'>
			<Button
				variant='outline'
				size='icon'
				onClick={onPreviousWeek}
				className='rounded-full'>
				<ChevronLeft className='size-4' />
			</Button>

			<div className='flex items-center gap-3 px-4 py-2 bg-white rounded-lg shadow-sm border border-emerald-200'>
				<Calendar className='size-5 text-emerald-600' />
				<span className='text-lg font-semibold text-emerald-700 font-inter'>
					{formattedDateRange}
				</span>
			</div>

			<Button
				variant='outline'
				size='icon'
				onClick={onNextWeek}
				className='rounded-full'>
				<ChevronRight className='size-4' />
			</Button>

			<Button
				variant='ghost'
				size='sm'
				onClick={onGoToCurrentWeek}
				className='text-emerald-600 hover:text-emerald-700 font-inter'>
				Today
			</Button>
		</div>
	);
};

export default WeekNavigator;
