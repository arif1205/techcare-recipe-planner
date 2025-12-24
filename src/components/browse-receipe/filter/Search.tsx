import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Search } from "lucide-react";

interface SearchFilterProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	isLoading: boolean;
}

const SearchFilter = ({
	searchQuery,
	setSearchQuery,
	isLoading,
}: SearchFilterProps) => {
	return (
		<div className='w-full sm:w-auto'>
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
	);
};

export default SearchFilter;
