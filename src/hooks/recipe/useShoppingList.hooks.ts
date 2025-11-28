import {
	useIngredientsListState,
	useMealPlanState,
} from "@/hooks/store/global.store.hooks";
import { saveIngredientsListToStorage } from "@/lib/localstorage";
import {
	clearPurchasedIngredients,
	purchaseIngredient,
	setIngredientsList as setIngredientsListAction,
	unpurchaseIngredient,
} from "@/store/slice/global/globalSlice";
import type { IngredientsList, Recipe, RecipesResponse } from "@/types";
import axios from "axios";
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	useTransition,
} from "react";
import { useAppDispatch } from "../store/store.hooks";

export const useShoppingList = () => {
	const dispatch = useAppDispatch();

	/**
	 * Ingredients list state controller
	 */
	const [ingredientsList, setIngredientsList] = useState<IngredientsList>({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	/**
	 * Get the meal plans from the store
	 */
	const { mealPlan } = useMealPlanState();
	const { ingredientsList: currentIngredientsList } = useIngredientsListState();

	const mealPlanIds = useMemo(
		() => Object.keys(mealPlan).map((mealPlanId) => mealPlan[mealPlanId].id),
		[mealPlan]
	);

	/**
	 * @IMPORTANT
	 * Generate the ingredients list from the meal plans
	 * This is the demo of the parallel requests implementation.
	 * Otherwise, we can use parallel queries with RTK Query.
	 * Please check at example at: @src/store/api/api.ts:43
	 */
	const generateIngredientsList = useCallback(
		(mealPlanIds: string[]) => {
			if (mealPlanIds.length === 0) return;

			startTransition(() => {
				setIsLoading(true);
				setError(null);
			});

			const mealPlanDetails = mealPlanIds.map((mealPlanId) => {
				return axios.get<RecipesResponse>(
					`${import.meta.env.VITE_API_BASE_URL}/lookup.php?i=${mealPlanId}`
				);
			});

			Promise.all(mealPlanDetails)
				.then((responses) => {
					const recipes = responses.map((response) => response.data.meals?.[0]);

					/**
					 * This is necessary since Redux state object mutating act as a shallow copy and become frozen
					 */
					const initialAccumulator: IngredientsList = Object.fromEntries(
						Object.entries(currentIngredientsList).map(([key, value]) => [
							key,
							{
								...value,
								measures: [...value.measures], // Create a new array copy
							},
						])
					);

					const ingredientsList = recipes.reduce(
						(acc: IngredientsList, recipe) => {
							for (let i = 1; i <= 20; i++) {
								const ingredient = recipe[
									`strIngredient${i}` as keyof Recipe
								] as string;
								const measure = recipe[
									`strMeasure${i}` as keyof Recipe
								] as string;

								if (ingredient && ingredient.trim()) {
									const trimmedIngredient = ingredient.trim();
									const trimmedMeasure = measure ? measure.trim() : "";

									if (acc[trimmedIngredient]) {
										if (
											trimmedMeasure &&
											!acc[trimmedIngredient].measures.includes(trimmedMeasure)
										) {
											acc[trimmedIngredient] = {
												...acc[trimmedIngredient],
												measures: [
													...acc[trimmedIngredient].measures,
													trimmedMeasure,
												],
											};
										}
									} else {
										acc[trimmedIngredient] = {
											purchased: false,
											measures: trimmedMeasure ? [trimmedMeasure] : [],
										};
									}
								}
							}
							return acc;
						},
						initialAccumulator
					);

					setIngredientsList(ingredientsList);

					/**
					 * Update the state and localStorage
					 */
					dispatch(setIngredientsListAction(ingredientsList));
					// saveIngredientsListToStorage(ingredientsList);
				})
				.catch((error) => {
					setError(
						error.message ||
							"Failed to generate ingredients list please try again later"
					);
				})
				.finally(() => {
					setIsLoading(false);
				});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[mealPlanIds]
	);

	useEffect(() => {
		generateIngredientsList(mealPlanIds);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mealPlanIds]);

	const toggleIngredientsPurchasedStatus = (
		ingredient: string,
		purchased: boolean
	) => {
		const newIngredientsList = {
			...ingredientsList,
			[ingredient]: {
				...ingredientsList[ingredient],
				purchased,
			},
		};
		setIngredientsList(newIngredientsList);

		/**
		 * Update the state and localStorage also
		 */
		saveIngredientsListToStorage(newIngredientsList);
		if (purchased) dispatch(purchaseIngredient(ingredient));
		else dispatch(unpurchaseIngredient(ingredient));
	};

	const clearCompletedItems = () => {
		const newIngredientsList = Object.fromEntries(
			Object.entries(ingredientsList).filter(([, value]) => !value.purchased)
		);
		setIngredientsList(newIngredientsList);
		dispatch(clearPurchasedIngredients());
	};

	return {
		ingredientsList,
		isLoading: isLoading || isPending,
		error,
		setIngredientsList,
		toggleIngredientsPurchasedStatus,
		clearCompletedItems,
	};
};
