import { Card } from "@/components/ui/card";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Vegan } from "lucide-react";

const ReceipeEmptyList = () => {
	return (
		<Card className='p-6 border-gray-200'>
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant='icon'>
						<Vegan className='size-6 text-muted-foreground' />
					</EmptyMedia>
					<EmptyTitle>No recipes found</EmptyTitle>
					<EmptyDescription>
						We couldn't find any recipes. Try refining your search or choose a
						different category.
					</EmptyDescription>
				</EmptyHeader>
			</Empty>
		</Card>
	);
};

export default ReceipeEmptyList;
