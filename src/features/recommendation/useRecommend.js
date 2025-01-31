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
      toast.error(err?.response?.data?.message);
    },
  });
  return { createRecommend, isPending, data };
}
