import { HiArrowRight } from "react-icons/hi";
import useMoveBack from "../../hooks/useMoveBack";

const projectStatus = {
  OPEN: {
    label: "باز",
    className: "badge--success",
  },
  CLOSED: {
    label: "بسته",
    className: "badge--danger",
  },
};

export default function ProjectHeader({ project, title }) {
  const moveBack = useMoveBack();

  return (
    <div className="flex flex-col gap-y-6 mb-8">
      <div>
        <span className={`badge ${projectStatus[project.status].className}`}>
          {projectStatus[project.status].label}
        </span>
      </div>
      <div className="flex items-center gap-x-2">
        <button>
          <HiArrowRight
            onClick={moveBack}
            className="w-5 h-5 text-secondary-500"
          />
        </button>
        <h1 className="font-black text-secondary-700 text-xl">
          {title} {project.title}
        </h1>
      </div>
    </div>
  );
}
