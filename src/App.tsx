import { format } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TabsData } from "./data/index.data";
import BrowseAllRecipe from "./components/browse-receipe/BrowseAllRecipe";

function App() {
	return (
		<div className='min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-green-50'>
			<header className='pt-8 pb-6 px-4'>
				<h1 className='text-center text-6xl font-semibold font-nunito bg-linear-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent'>
					Recipe Meal Planner
				</h1>
			</header>

			<main className='max-w-6xl mx-auto px-4 pb-8'>
				<div className='mb-6 text-center'>
					<p className='text-lg font-semibold text-emerald-700 font-inter'>
						{format(new Date(), "EEEE, MMM dd, yyyy")}
					</p>
				</div>

				<Tabs defaultValue='browse' className='w-full'>
					<TabsList className='grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-lg border border-emerald-200'>
						{TabsData.map((tab) => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
								className='data-[state=active]:bg-linear-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white font-inter font-semibold'>
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value='browse'>
						<BrowseAllRecipe />
					</TabsContent>
					<TabsContent value='meal-planner'></TabsContent>
					<TabsContent value='shopping-list'></TabsContent>
				</Tabs>
			</main>
		</div>
	);
}

export default App;
