import { useCurrentTabState } from "@/hooks/store/global.store.hooks";
import { SoupIcon } from "lucide-react";
import BrowseAllRecipe from "../browse-receipe/BrowseAllRecipe";
import MealPlanContainer from "../meal-plan/MealPlanContainer";
import ShoppingListContainer from "../shopping-list/ShoppingListContainer";
import { Tabs, TabsContent } from "../ui/tabs";
import TabsHeader from "./tab/TabsHeader";
import TabsContentContainer from "./tab/TabsContentContainer";

const MainContainer = () => {
	const { currentTab, handleChangeTab } = useCurrentTabState();

	return (
		<main className='max-w-7xl mx-auto px-4 pb-8 mt-6'>
			{/* Main title  */}
			<div className='mb-6'>
				<div className='title-with-icon flex items-end gap-2'>
					<SoupIcon className='size-8 sm:size-10' />
					<h1 className='text-xl sm:text-3xl font-bold uppercase'>
						Recipe Planner
					</h1>
				</div>
			</div>

			{/* Tabs container */}

			<Tabs defaultValue={currentTab} className='w-full'>
				<TabsHeader handleChangeTab={handleChangeTab} />

				<TabsContentContainer>
					<TabsContent value='browse'>
						<BrowseAllRecipe />
					</TabsContent>
					<TabsContent value='meal-planner'>
						<MealPlanContainer />
					</TabsContent>
					<TabsContent value='shopping-list'>
						<ShoppingListContainer />
					</TabsContent>
				</TabsContentContainer>
			</Tabs>
		</main>
	);
};

export default MainContainer;
