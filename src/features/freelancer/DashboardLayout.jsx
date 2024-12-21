import Loading from "../../ui/Loading";
import useProposals from "../proposals/useProposals";
import DashboardHeader from "../../ui/DashboardHeader";
import Stats from "./Stats";
import CreateRecommend from "../recommendation/CreateRecommendationSystem";

export default function DashboardLayout() {
  const { isLoading, proposals } = useProposals();

  if (isLoading) return <Loading />;

  return (
    <div>
      <DashboardHeader />
      <Stats proposals={proposals} />
      <CreateRecommend />
    </div>
  );
}
