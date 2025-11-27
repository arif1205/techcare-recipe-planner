import { useCurrentTabState } from "@/hooks/store/global.store.hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsData } from "@/data/index.data";
import BrowseAllRecipe from "../browse-receipe/BrowseAllRecipe";
import MealPlanContainer from "../meal-plan/MealPlanContainer";
import ShoppingListContainer from "../shopping-list/ShoppingListContainer";

const MainContainer = () => {
	const { currentTab, handleChangeTab } = useCurrentTabState();

	return (
		<main className='max-w-7xl mx-auto px-4 pb-8 mt-10'>
			<Tabs defaultValue={currentTab} className='w-full'>
				<TabsList className='grid w-full grid-cols-3 backdrop-blur-sm shadow-lg'>
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
	);
};

export default MainContainer;
