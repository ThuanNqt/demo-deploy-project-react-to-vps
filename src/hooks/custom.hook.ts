import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constant/key";

export const useFetchUser = (currentPage: number, pageSize: number) => {
  const queryInfo = useQuery({
    queryKey: QUERY_KEY.getUsersPagination(currentPage),
    queryFn: async (): Promise<any> => {
      return fetch(
        `http://localhost:8000/users?_page=${currentPage}&_limit=${pageSize}`
      ).then(async (res) => {
        const totalItems = Number(res?.headers?.get("X-Total-Count") ?? 0);
        const totalPages = Math.ceil(totalItems / pageSize);

        const data = await res.json();

        return {
          totalItems,
          totalPages,
          users: data,
        };
      });
    },
  });

  console.log(">>> queryInfo", queryInfo);

  return {
    ...queryInfo,
    data: queryInfo?.data?.users ?? [],
    count: queryInfo?.data?.totalItems ?? 0,
    totalPages: queryInfo?.data?.totalPages ?? 0,
  };
};
