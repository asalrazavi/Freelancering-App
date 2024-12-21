import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recommendApi } from "../../services/recommend";
import toast from "react-hot-toast";

export default function useRecommend() {
  const queryClient = useQueryClient();

  const {
    mutate: createRecommend,
    isPending,
    data,
  } = useMutation({
    mutationFn: recommendApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["recommends"],
      });
    },
    onError: (err) => {
      const errorMessage = err?.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
    },
  });
  return { createRecommend, isPending, data };
}
