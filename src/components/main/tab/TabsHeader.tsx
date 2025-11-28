import { TabsData } from "@/data/index.data";
import { TabsList, TabsTrigger } from "../../ui/tabs";
import type { TabsType } from "@/types/index.types";
import { cn } from "@/lib/utils";

const TabsHeader = ({
	handleChangeTab,
}: {
	handleChangeTab: (tab: TabsType) => void;
}) => {
	return (
		<TabsList className='flex h-auto w-full items-center justify-start gap-0 bg-transparent p-0 border-b border-gray-200'>
			{TabsData.map((tab) => {
				const Icon = tab.icon;
				return (
					<TabsTrigger
						onClick={() => handleChangeTab(tab.value)}
						key={tab.value}
						value={tab.value}
						className={cn(
							"relative h-auto px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border-0 rounded-none transition-colors w-fit flex-0 cursor-pointer",
							"hover:text-gray-900 hover:bg-transparent",
							"data-[state=active]:text-green-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none",
							"data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-green-600",
							"focus-visible:outline-none focus-visible:ring-0"
						)}>
						{Icon && <Icon className='size-4' />}
						{tab.label}
					</TabsTrigger>
				);
			})}
		</TabsList>
	);
};

export default TabsHeader;
