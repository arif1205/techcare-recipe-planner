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
				variant='outline'
				size='sm'
				onClick={onClearCompleted}
				className='gap-2 font-inter text-xs'>
				<Trash2 className='size-4' />
				Clear Completed
			</Button>
		</div>
	);
};

export default ShoppingListActions;
