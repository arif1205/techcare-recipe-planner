import type { RootState } from "../../store/store";
import { useAppSelector } from "./store.hooks";

export function useGlobalState() {
	return useAppSelector((state: RootState) => state.global);
}
