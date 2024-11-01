import useProjects from "../../../hooks/useProjects";
import Table from "../../../ui/Table";
import Loading from "../../../ui/Loading";
import Empty from "../../../ui/Empty";
import ProjectsRow from "./ProjectsRow";

export default function ProjectsTable() {
  const { isLoading, projects } = useProjects();
  if (isLoading) return <Loading />;
  if (!projects.length) return <Empty />;
  return (
    <Table>
      <Table.Header>
        <td>#</td>
        <td>عنوان پروژه</td>
        <td>بودجه</td>
        <td>ددلاین</td>
        <td>وضعیت</td>
        <td>عملیات</td>
      </Table.Header>
      <Table.Body>
        {projects.map((project, index) => (
          <ProjectsRow key={project._id} project={project} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}
