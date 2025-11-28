import { Skeleton } from "@/components/ui/skeleton";

const IngredientListSkeleton = () => {
	return (
		<div className='flex flex-col gap-2'>
			{Array.from({ length: 10 }).map((_, index) => (
				<Skeleton key={index} className='w-full h-7' />
			))}
		</div>
	);
};

export default IngredientListSkeleton;
