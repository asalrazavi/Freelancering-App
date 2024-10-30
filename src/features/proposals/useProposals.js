import { useQuery } from "@tanstack/react-query";
import { getProposalsApi } from "../../services/proposalService";

export default function useProposals() {
  const { data, isLoading } = useQuery({
    queryKey: ["proposals"],
    queryFn: getProposalsApi,
  });

  //   console.log(data);

  const { proposals } = data || {};
  return { isLoading, proposals };
}
