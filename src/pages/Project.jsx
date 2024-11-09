import ProjectHeader from "../features/project/ProjectHeader";
import ProposalsTab from "../features/project/ProposalsTable";
import useProject from "../features/project/useProject";
import Loading from "../ui/Loading";

export default function Project() {
  const { isLoading, project } = useProject();
  // console.log(project);

  if (isLoading) return <Loading />;

  return (
    <div>
      <ProjectHeader project={project} title={"لیست درخواست های"} />
      <ProposalsTab proposals={project.proposals} />
    </div>
  );
}
