import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProjectApi } from "../../services/projectService";
import toast from "react-hot-toast";

export default function useRemoveProject() {
  const queryClient = useQueryClient();

  const { mutate: removeProject, isPending } = useMutation({
    mutationFn: removeProjectApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["owner-projects"],
      });
    },
    onError: (data) => {
      console.log(data);
      toast.error(data?.response?.data?.message);
    },
  });
  return { removeProject, isPending };
}
