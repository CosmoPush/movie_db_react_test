import { FC } from "react";
import { pageActions } from "../../../redux/slices/pageStoreSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/helpers";
import { Button } from "../../UI";

export const PagesButtonComponent: FC = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.pageSlice.page);

  return (
    <div className="flex justify-center py-4 gap-4 max-w-[800px] mx-auto flex-wrap">
      <Button
        variant="secondary"
        size="md"
        disabled={page <= 1}
        leftIcon={
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        }
        onClick={() => {
          if (page > 1) dispatch(pageActions.changePage(page - 1));
        }}
        className="w-[240px]"
      >
        Previous page
      </Button>

      <Button
        variant="secondary"
        size="md"
        rightIcon={
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        }
        onClick={() => {
          dispatch(pageActions.changePage(page + 1));
        }}
        className="w-[240px]"
      >
        Next page
      </Button>
    </div>
  );
};
