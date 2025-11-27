import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Category, OptionType } from "@/types";
import { Filter, Search } from "lucide-react";
import { Input } from "../../ui/input";
import { Skeleton } from "../../ui/skeleton";
import { Spinner } from "../../ui/spinner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
	searchQuery,
	setSearchQuery,
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
			<div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
				<div className='flex-1 w-full sm:w-auto'>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400' />
						<Input
							type='text'
							placeholder='Search recipes...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='pl-10 pr-10 max-w-md bg-white border border-gray-300'
						/>
						{isLoading && (
							<div className='absolute right-3 top-1/2 -translate-y-1/2'>
								<Spinner className='size-5' />
							</div>
						)}
					</div>
				</div>

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
		</div>
	);
};

export default CategoryFilter;
