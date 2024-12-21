import toast from "react-hot-toast";
import useProjects from "../../hooks/useProjects";
import useUser from "../authentication/useUser";
// import Recommend from "./Recommend";
import Recommender from "./Recommender";

export default function CreateRecommend() {
  const { user } = useUser();
  const skills = user.skills;

  const { projects } = useProjects();

  if (!user || !user.skills) {
    toast.error("User or skills are undefined:", user);
    return <p>Error: User or skills not found</p>;
  }

  if (!projects || projects.length === 0) {
    toast.error("Projects are undefined or empty:", projects);
    return <p>Error: No projects available</p>;
  }

  return (
    <div className="mt-16">
      {/* <Recommend skills={skills} projects={projects} /> */}
      <Recommender skills={skills} projects={projects} />
    </div>
  );
}
