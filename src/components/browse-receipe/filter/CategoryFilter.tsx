import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Category, OptionType } from "@/types";
import { Filter } from "lucide-react";
import { Skeleton } from "../../ui/skeleton";

interface CategoryFilterProps {
	selectedCategory?: Category["idCategory"];
	onCategoryChange: (category?: Category["idCategory"]) => void;
	categoryOptions: OptionType[];
	isLoading?: boolean;
	isError?: boolean;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	selectedCategoryLabel?: string;
}

const CategoryFilter = ({
	selectedCategory,
	onCategoryChange,
	categoryOptions,
	isLoading = false,
	isError = false,
	selectedCategoryLabel,
}: CategoryFilterProps) => {
	const handleCategoryToggle = (categoryId: Category["idCategory"]) => {
		if (selectedCategory === categoryId) {
			onCategoryChange(undefined);
		} else {
			onCategoryChange(categoryId);
		}
	};

	return (
		<div className='space-y-4'>
			<div className='w-full sm:w-auto'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							className='gap-2 font-inter bg-white border border-gray-300 text-gray-600'
							size='sm'
							disabled={isLoading}>
							<Filter className='size-4' />
							Filter
							{selectedCategoryLabel && (
								<Badge variant='emerald' className=''>
									{selectedCategoryLabel}
								</Badge>
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align='end'
						className='w-56 bg-white border border-gray-300'>
						<DropdownMenuLabel className='text-gray-600 ml-6'>
							Categories
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{isError ? (
							<div className='px-2 py-1.5 text-sm text-red-600 font-inter'>
								Failed to get. Try again later.
							</div>
						) : isLoading ? (
							<div className='px-2 py-1.5 text-sm text-muted-foreground space-y-2'>
								{Array.from({ length: 5 }).map((_, index) => (
									<Skeleton key={index} className='w-full h-4 bg-gray-300' />
								))}
							</div>
						) : categoryOptions.length === 0 ? (
							<div className='px-2 py-1.5 text-sm text-muted-foreground'>
								No categories available
							</div>
						) : (
							categoryOptions.map((category) => (
								<DropdownMenuCheckboxItem
									key={category.id}
									className={cn({
										"bg-gray-100": selectedCategory === category.id,
									})}
									checked={selectedCategory === category.id}
									onCheckedChange={() => handleCategoryToggle(category.id)}>
									{category.label}
								</DropdownMenuCheckboxItem>
							))
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export default CategoryFilter;
