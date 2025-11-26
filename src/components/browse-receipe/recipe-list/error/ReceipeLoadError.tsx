import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ReceipeLoadError = () => {
	return (
		<Alert variant='destructive'>
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>
				Failed to load recipes. Please try again later.
			</AlertDescription>
		</Alert>
	);
};

export default ReceipeLoadError;
