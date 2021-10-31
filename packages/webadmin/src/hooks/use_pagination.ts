import { useState } from "react";

/**
 * Use the usePagination hook to create a pagination component.
 * @param defaultLimit The default limit to be used when the user has not selected a limit.
 * @returns The usePagination hook returns an object with the following properties:
 */
const usePagination = (defaultLimit?: number) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(defaultLimit || 10);

  const onChangePage = (selectPage: number) => setPage(selectPage);
  const onChangeLimit = (selectLimit: number) => setLimit(selectLimit);

  return {
    page,
    limit,
    onChangeLimit,
    onChangePage,
  };
};

export default usePagination;
