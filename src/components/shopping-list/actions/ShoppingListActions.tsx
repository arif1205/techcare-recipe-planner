import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ShoppingListActionsProps {
	onClearCompleted: () => void;
	hasCompletedItems: boolean;
}

const ShoppingListActions = ({
	onClearCompleted,
	hasCompletedItems,
}: ShoppingListActionsProps) => {
	if (!hasCompletedItems) {
		return null;
	}

	return (
		<div className='flex justify-end'>
			<Button
				variant='destructive'
				size='sm'
				onClick={onClearCompleted}
				className='gap-1 font-inter text-xs! py-0.5 h-7 px-2 cursor-pointer hover:bg-red-500/90 hover:text-white bg-red-500 border-red-500!'>
				<Trash2 className='size-4 text-white' />
				<span className='text-white mt-0.5'>Clear Completed</span>
			</Button>
		</div>
	);
};

export default ShoppingListActions;
