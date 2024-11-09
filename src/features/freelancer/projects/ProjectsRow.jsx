import { MdAssignmentAdd } from "react-icons/md";
import Table from "../../../ui/Table";
import toLocalDateShort from "../../../utils/toLocalDateShort";
import { toPersianNumbersWithComma } from "../../../utils/toPersianNumbers";
import truncateText from "../../../utils/truncateText";
import { useState } from "react";
import Modal from "../../../ui/Modal";
import CreateProposal from "../../proposals/CreateProposal";
import { Link } from "react-router-dom";

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

export default function ProjectsRow({ index, project }) {
  const [open, setOpen] = useState(false);

  return (
    <Table.Row key={project._id}>
      <td>{index + 1}</td>
      <td>
        <Link to={project._id}>{truncateText(project.title, 30)}</Link>
      </td>
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
      <td>
        <span className={`badge ${projectStatus[project.status].className}`}>
          {projectStatus[project.status].label}
        </span>
      </td>
      <td>
        <button onClick={() => setOpen(true)}>
          <MdAssignmentAdd className="w-5 h-5 text-primary-900" />
        </button>
        <Modal
          onClose={() => setOpen(false)}
          open={open}
          title={`درخواست انجام پروژه ${project.title}`}
        >
          <CreateProposal
            onClose={() => setOpen(false)}
            projectId={project._id}
          />
        </Modal>
      </td>
    </Table.Row>
  );
}
