import { useDispatch, useSelector } from "react-redux";
import { store } from "../store/store.ts";

export const useAppSelector =
  useSelector.withTypes<ReturnType<typeof store.getState>>();
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
