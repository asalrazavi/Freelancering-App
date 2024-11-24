import Table from "../../ui/Table";
import ProjectsRow from "../freelancer/projects/ProjectsRow";
import EncodeBinaryVector from "./EncodeBinaryVector";

export default function Recommend({ skills, projects }) {
  // console.log("projects", projects);
  const encodedProjects = EncodeBinaryVector({ skills, projects });
  console.log("encodedProjects", encodedProjects);

  // Sort projects by similarity score in descending order
  const rankedProjects = encodedProjects.sort(
    (a, b) => b.similarityScore - a.similarityScore
  );

  // Filter projects with a non-zero similarity score
  const filteredProjects = rankedProjects.filter(
    (project) => project.similarityScore > 0
  );

  console.log("Recommended Projects:", filteredProjects);

  if (!filteredProjects || filteredProjects.length === 0)
    return <p>No matching projects available</p>;

  return (
    <div>
      <h3 className="font-bold text-xl text-secondary-800 mb-5">
        پروژه های پیشنهادی
      </h3>
      <Table>
        <Table.Header>
          <td>#</td>
          <td>عنوان پروژه</td>
          <td>بودجه</td>
          <td>ددلاین</td>
          <td>تگ ها</td>
          <td>وضعیت</td>
          <td>عملیات</td>
        </Table.Header>
        <Table.Body>
          {filteredProjects.map((project, index) => (
            <ProjectsRow key={project._id} project={project} index={index} />
          ))}
        </Table.Body>
        {/* {filteredProjects.map((project) => (
          <li key={project.id || project._id}>
            {project.title} - Score: {project.similarityScore}
          </li>
        ))} */}
      </Table>
    </div>
  );
}
