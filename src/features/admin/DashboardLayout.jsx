import useProjects from "../../hooks/useProjects";
import DashboardHeader from "../../ui/DashboardHeader";
import Loading from "../../ui/Loading";
import useProposals from "../proposals/useProposals";
import CreateRecommend from "../recommendation/CreateRecommendationSystem";
import Stats from "./Stats";
import useUsers from "./useUsers";

export default function DashboardLayout() {
  const { isLoading: isLoading1, proposals } = useProposals();
  const { isLoading: isLoading2, projects } = useProjects();
  const { isLoading: isLoading3, users } = useUsers();

  if (isLoading1 || isLoading2 || isLoading3) return <Loading />;

  return (
    <div>
      <DashboardHeader />
      <Stats
        projects={projects.length}
        users={users.length}
        proposals={proposals.length}
      />
      <CreateRecommend />
    </div>
  );
}
