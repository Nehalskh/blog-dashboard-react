import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog, type CreateBlogInput } from "../api/blogs";

export function useCreateBlog() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBlogInput) => createBlog(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}
