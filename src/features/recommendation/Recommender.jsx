import { useEffect, useState } from "react";
import useRecommend from "./useRecommend";
import Table from "../../ui/Table";
import ProjectsRow from "../freelancer/projects/ProjectsRow";
import Loading from "../../ui/Loading";

export default function Recommender({ skills, projects, user }) {
  const [recommendProjectsID, setRecommendProjectsID] = useState([]);
  const { createRecommend, isPending } = useRecommend();
  const userId = user._id;
  console.log(userId);

  const handleSubmit = () => {
    const payload = { skills, projects, userId };
    createRecommend(payload, {
      onSuccess: (response) => {
        const recommendedIds = response?.body?.recommended_projects || [];
        setRecommendProjectsID(recommendedIds);
      },
    });
  };

  useEffect(() => {}, []);

  const recommendedProjects = recommendProjectsID
    .map((id) => projects.find((project) => project._id === id))
    .filter(Boolean);

  if (isPending) return <Loading />;

  return (
    <div className="text-secondary-600 mt-10">
      <div className="flex flex-row justify-between items-center mb-5">
        <h3 className="font-bold text-xl text-secondary-800">
          پروژه های پیشنهادی
        </h3>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="text-primary-100 border p-2 rounded-lg"
        >
          {isPending ? "Fetching..." : "Get Recommendations"}
        </button>
      </div>

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
          {recommendedProjects.length > 0 ? (
            recommendedProjects.map((project, index) => (
              <ProjectsRow key={project._id} project={project} index={index} />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                پروژه‌ای برای نمایش وجود ندارد
              </td>
            </tr>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
