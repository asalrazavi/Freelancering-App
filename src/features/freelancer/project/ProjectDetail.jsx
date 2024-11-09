import useProject from "../../project/useProject";
import Loading from "../../../ui/Loading";
import ProjectHeader from "../../project/ProjectHeader";
import ProjectBody from "./ProjectBody";

export default function ProjectDetail() {
  const { project, isLoading } = useProject();
  console.log(project);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-x-4">
      <ProjectHeader project={project} title={"جزئیات"} />
      <ProjectBody project={project} />
    </div>
  );
}
