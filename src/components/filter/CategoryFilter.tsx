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
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

interface CategoryFilterProps {
	selectedCategories: Category["idCategory"][];
	onCategoryChange: (categories: Category["idCategory"][]) => void;
	categoryOptions: OptionType[];
	isLoading?: boolean;
	isError?: boolean;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
}

const CategoryFilter = ({
	selectedCategories,
	onCategoryChange,
	categoryOptions,
	isLoading = false,
	isError = false,
	searchQuery,
	setSearchQuery,
}: CategoryFilterProps) => {
	const handleCategoryToggle = (categoryId: Category["idCategory"]) => {
		if (selectedCategories.includes(categoryId)) {
			onCategoryChange(selectedCategories.filter((id) => id !== categoryId));
		} else {
			onCategoryChange([...selectedCategories, categoryId]);
		}
	};

	return (
		<div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
			<div className='flex-1 w-full sm:w-auto'>
				<div className='relative'>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400' />
					<Input
						type='text'
						placeholder='Search recipes...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='pl-10 font-inter'
					/>
				</div>
			</div>

			<div className='w-full sm:w-auto'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							className='gap-2 font-inter'
							disabled={isLoading}>
							<Filter className='size-4' />
							Filter
							{selectedCategories.length > 0 && (
								<span className='ml-1 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white'>
									{selectedCategories.length}
								</span>
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='w-56'>
						<DropdownMenuLabel>Categories</DropdownMenuLabel>
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
									checked={selectedCategories.includes(category.id)}
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
