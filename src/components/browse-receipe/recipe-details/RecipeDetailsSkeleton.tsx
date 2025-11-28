import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const RecipeDetailsSkeleton = () => {
	return (
		<div className='space-y-6'>
			<div>
				<Skeleton className='h-8 w-48 mb-2' />
				<div className='flex items-center gap-2'>
					<Skeleton className='h-6 w-20' />
					<span>•</span>
					<Skeleton className='h-4 w-24' />
				</div>
			</div>

			<div className='relative w-full h-64 rounded-lg overflow-hidden'>
				<Skeleton className='w-full h-full' />
			</div>

			<Separator />

			<div>
				<Skeleton className='h-6 w-32 mb-2' />
				<div className='space-y-2'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-3/4' />
				</div>
				<Skeleton className='h-4 w-20 mt-2' />
			</div>

			<Separator />

			<div>
				<Skeleton className='h-6 w-32 mb-3' />
				<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							key={index}
							className='flex items-center gap-2 p-2 rounded-md bg-gray-50'>
							<Skeleton className='h-4 w-16' />
							<Skeleton className='h-4 w-24' />
						</div>
					))}
				</div>
			</div>

			<Separator />

			<div>
				<Skeleton className='h-6 w-24 mb-2' />
				<div className='flex flex-wrap gap-2'>
					<Skeleton className='h-6 w-16' />
					<Skeleton className='h-6 w-20' />
					<Skeleton className='h-6 w-18' />
				</div>
			</div>
		</div>
	);
};

export default RecipeDetailsSkeleton;
