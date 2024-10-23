import Empty from "../../ui/Empty";
import Loading from "../../ui/Loading";
import Table from "../../ui/Table";
import toLocalDateShort from "../../utils/toLocalDateShort";
import { toPersianNumbersWithComma } from "../../utils/toPersianNumbers";
import truncateText from "../../utils/truncateText";
import useOwnerProjects from "./useOwnerProjects";

export default function ProjectTable() {
  const { isLoading, projects } = useOwnerProjects();
  if (isLoading) return <Loading />;
  if (!projects.length) return <Empty resourceName="پروژه" />;

  // console.log(projects);

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>عنوان پروژه</th>
        <th>دسته بندی</th>
        <th>بودجه</th>
        <th>ددلاین</th>
        <th>تگ ها</th>
        <th>فریلنسر ها</th>
        <th>وضعیت</th>
        <th>عملیات</th>
      </Table.Header>
      <Table.Body>
        {projects.map((project, index) => (
          <tr key={project._id}>
            <td>{index + 1}</td>
            <td>{truncateText(project.title, 30)}</td>
            <td>{project.category.title}</td>
            <td>{toPersianNumbersWithComma(project.budget)}</td>
            <td>{toLocalDateShort(project.deadline)}</td>
            <td>
              <div className="flex flex-wrap items-center gap-2 max-w-[200px]">
                {project.tags.map((tag) => (
                  <span className="badge badge--secondary" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </td>
            <td>{project.freelancer?.name || "-"}</td>
            <td>
              {project.status === "OPEN" ? (
                <span className="badge badge--success">باز</span>
              ) : (
                <span className="badge badge--danger">بسته</span>
              )}
            </td>
            <td>...</td>
          </tr>
        ))}
      </Table.Body>
    </Table>
  );
}
