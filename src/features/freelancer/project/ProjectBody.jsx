import { MdAssignmentAdd } from "react-icons/md";
import daysCounter from "../../../utils/daysCounter";
import { toPersianNumbersWithComma } from "../../../utils/toPersianNumbers";
import Modal from "../../../ui/Modal";
import CreateProposal from "../../proposals/CreateProposal";
import { useState } from "react";
import useUser from "../../authentication/useUser";

export default function ProjectBody({ project }) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  console.log(user.role);

  return (
    <div className="text-secondary-600">
      <div className="flex flex-col gap-y-6 bg-secondary-0 p-6 rounded-lg">
        <div className="gap-x-2 flex">
          <span>ایجاد شده توسط: </span>
          <span className="text-primary-900">{project.owner.name}</span>
        </div>
        <div className="flex gap-x-2">
          <span>توضیحات:</span>
          <span>{project.description}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span>مهارت های مورد نیاز:</span>
          {project.tags.map((tag) => (
            <span className="badge badge--secondary" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-x-2">
          <span>زمان باقی مانده برای ارسال پیشنهاد:</span>
          <span className="text-primary-600">
            {daysCounter(project.deadline)}
          </span>
        </div>
        <div className="flex gap-x-2">
          <span>بودجه کارفرما:</span>
          <span>{toPersianNumbersWithComma(project.budget)}</span>
        </div>
        <div className="flex justify-end">
          {user.role !== "OWNER" ? (
            <button
              onClick={() => setOpen(true)}
              className="btn flex items-center justify-center gap-x-2 btn--primary"
            >
              <MdAssignmentAdd className="w-5 h-5" />
              <span>درخواست انجام پروژه</span>
            </button>
          ) : (
            ""
          )}
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
        </div>
      </div>
    </div>
  );
}
