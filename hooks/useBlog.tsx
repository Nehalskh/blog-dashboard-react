import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../api/blogs";

export function useBlog(id: number | null) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id as number),
    enabled: !!id,
  });
}
