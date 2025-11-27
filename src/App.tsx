import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrowseAllRecipe from "./components/browse-receipe/BrowseAllRecipe";
import MealPlanContainer from "./components/meal-plan/MealPlanContainer";
import ShoppingListContainer from "./components/shopping-list/ShoppingListContainer";
import { TabsData } from "./data/index.data";
import { useCurrentTabState } from "./hooks/store/global.store.hooks";

function App() {
	const { currentTab, handleChangeTab } = useCurrentTabState();

	return (
		<div className='min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-green-50'>
			<header className='pt-8 pb-6 px-4'>
				<h1 className='text-center text-6xl font-semibold font-nunito bg-linear-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent'>
					Recipe Meal Planner
				</h1>
			</header>

			<main className='max-w-6xl mx-auto px-4 pb-8'>
				<Tabs defaultValue={currentTab} className='w-full'>
					<TabsList className='grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-lg border border-emerald-200'>
						{TabsData.map((tab) => (
							<TabsTrigger
								onClick={() => handleChangeTab(tab.value)}
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
					<TabsContent value='meal-planner'>
						<MealPlanContainer />
					</TabsContent>
					<TabsContent value='shopping-list'>
						<ShoppingListContainer />
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}

export default App;
