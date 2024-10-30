import Loading from "../../ui/Loading";
import useProposals from "../proposals/useProposals";
import DashboardHeader from "../../ui/DashboardHeader";
import Stats from "./Stats";

export default function DashboardLayout() {
  const { isLoading, proposals } = useProposals();

  //   console.log(proposals);
  if (isLoading) return <Loading />;

  return (
    <div>
      <DashboardHeader />
      <Stats proposals={proposals} />
    </div>
  );
}
