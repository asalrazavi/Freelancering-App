import { useEffect } from "react";
import toast from "react-hot-toast";
import useProjects from "../../hooks/useProjects";
import useUser from "../authentication/useUser";
import Recommender from "./Recommender";

export default function CreateRecommend() {
  const { user, isLoading: isUserLoading } = useUser();
  const { projects, isLoading: isProjectsLoading } = useProjects();

  useEffect(() => {
    if (!isUserLoading && (!user || !user.skills)) {
      toast.error("User or skills are undefined");
    }
    if (!isProjectsLoading && (!projects || projects.length === 0)) {
      toast.error("Projects are undefined or empty");
    }
  }, [user, projects, isUserLoading, isProjectsLoading]);

  return (
    <div className="mt-16">
      <Recommender skills={user.skills} projects={projects} />
    </div>
  );
}
