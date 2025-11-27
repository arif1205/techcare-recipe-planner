import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const ReceipeLoadError = () => {
	return (
		<Alert
			variant='destructive'
			className='min-h-48 bg-red-50 flex items-center justify-center flex-col'>
			<AlertCircleIcon className='size-10! text-red-500' />
			<AlertTitle className='text-xl'>Couldn&apos;t Load Recipes</AlertTitle>
			<AlertDescription>
				Failed to load recipes. Please try again later.
			</AlertDescription>
		</Alert>
	);
};

export default ReceipeLoadError;
