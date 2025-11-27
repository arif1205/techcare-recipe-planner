import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ReceipeCardSkeleton = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
			{Array.from({ length: 10 }).map((_, index) => (
				<Card
					key={index}
					className='overflow-hidden border-gray-200 pt-0 shadow-xs group gap-2'>
					<Skeleton className='w-full h-48' />
					<CardHeader className='px-4'>
						<Skeleton className='h-6 w-3/4' />
						<Skeleton className='h-4 w-1/2 mt-2' />
					</CardHeader>
				</Card>
			))}
		</div>
	);
};

export default ReceipeCardSkeleton;
