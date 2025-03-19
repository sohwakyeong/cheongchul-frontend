import { useInfiniteQuery } from "@tanstack/react-query";

const fetchTutoringItems = async ({ pageParam = 1, category, sortType, search }) => {
  const API_URL = `/api/board/all?page=${pageParam}&size=3&category=${category}&sortType=${sortType}&search=${encodeURIComponent(search)}`;
  const accessToken = localStorage.getItem("accessToken");

  const headers = accessToken
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }
    : {};

  const response = await fetch(API_URL, { headers });
  if (!response.ok) throw new Error("데이터 요청 실패");

  return response.json();
};

export const useFetchTutoringItems = (category, sortType, search) => {
  return useInfiniteQuery({
    queryKey: ["tutoringItems", category, sortType, search],
    queryFn: ({ pageParam }) => fetchTutoringItems({ pageParam, category, sortType, search }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data.length ? allPages.length + 1 : null;
    },
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10, 
    keepPreviousData: true, 
  });
};
