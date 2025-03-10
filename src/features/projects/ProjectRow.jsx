import { HiEye, HiOutlineTrash } from "react-icons/hi";
import Table from "../../ui/Table";
import toLocalDateShort from "../../utils/toLocalDateShort";
import { toPersianNumbersWithComma } from "../../utils/toPersianNumbers";
import truncateText from "../../utils/truncateText";
import { TbPencilMinus } from "react-icons/tb";
import Modal from "../../ui/Modal";
import { useState } from "react";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useRemoveProject from "./useRemoveProject";
import CreateProjectForm from "./CreateProjectForm";
import ToggleProjectStatus from "./ToggleProjectStatus";
import { Link } from "react-router-dom";

export default function ProjectRow({ project, index, onClick }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { removeProject } = useRemoveProject();

  return (
    <Table.Row key={project.id} onClick={onClick}>
      <td>{index + 1}</td>
      <td>
        <Link to={`detail/${project._id}`}>
          {truncateText(project.title, 30)}
        </Link>
      </td>
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
        <ToggleProjectStatus project={project} />
      </td>
      <td>
        <div className="flex items-center gap-x-4">
          <button>
            <TbPencilMinus
              onClick={() => setIsEditOpen(true)}
              className="w-5 h-5 text-primary-900"
            />
          </button>
          <Modal
            open={isEditOpen}
            title={`ویرایش ${project.title}`}
            onClose={() => setIsEditOpen(false)}
          >
            <CreateProjectForm
              projectToEdit={project}
              onClose={() => setIsEditOpen(false)}
            />
          </Modal>
          <button>
            <HiOutlineTrash
              onClick={() => {
                setIsDeleteOpen(true);
              }}
              className="w-5 h-5 text-error"
            />
          </button>
          <Modal
            open={isDeleteOpen}
            title={`حذف ${project.title}`}
            onClose={() => setIsDeleteOpen(false)}
          >
            <ConfirmDelete
              resourceName={project.title}
              onClose={() => setIsDeleteOpen(false)}
              onConfirm={() => removeProject(project._id)}
              disabled={false}
            />
          </Modal>
        </div>
      </td>
      <td>
        <Link to={project._id} className="flex justify-center">
          <HiEye className="w-5 h-5 text-primary-800" />
        </Link>
      </td>
    </Table.Row>
  );
}
