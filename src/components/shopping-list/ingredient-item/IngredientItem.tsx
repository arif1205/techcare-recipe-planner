import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface IngredientItemProps {
	ingredient: string;
	purchased: boolean;
	onToggle: (ingredient: string, purchased: boolean) => void;
	isLast: boolean;
}

const IngredientItem = ({
	ingredient,
	purchased,
	onToggle,
	isLast,
}: IngredientItemProps) => {
	return (
		<div className=''>
			<div
				className={cn(
					"flex items-center gap-3 p-3 transition-all cursor-pointer hover:bg-gray-50",
					{
						"bg-gray-50 opacity-60": purchased,
						"bg-white": !purchased,
					}
				)}
				onClick={() => onToggle(ingredient, !purchased)}>
				<Checkbox
					checked={purchased}
					onCheckedChange={(checked) => onToggle(ingredient, checked === true)}
					className='shrink-0'
				/>
				<span
					className={cn("flex-1 font-inter text-sm", {
						"line-through text-gray-500": purchased,
						"text-gray-800": !purchased,
					})}>
					{ingredient}
				</span>
			</div>
			{!isLast && <Separator />}
		</div>
	);
};

export default IngredientItem;
