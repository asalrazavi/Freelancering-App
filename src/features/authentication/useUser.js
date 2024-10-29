import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/authService";

export default function useUser() {
  // const { data } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: true,
  });

  console.log(data);
  const { user } = data || {};

  return { user, isLoading };
}
