import { useState } from "react";
import Table from "../../ui/Table";
import truncateText from "../../utils/truncateText";
import Modal from "../../ui/Modal";
import ChangeProposalStatus from "./ChangeProposalStatus";

const statusStyle = [
  { label: "رد شده", className: "badge--danger" },
  { label: "در انتظار تایید", className: "badge--secondary" },
  { label: "تایید شده", className: "badge--success" },
];

export default function ProposalsRow({ proposals, index }) {
  const [open, setOpen] = useState(false);
  // console.log(proposals);

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{proposals.user.name}</td>
      <td>
        <p>{truncateText(proposals.description, 50)}</p>
      </td>
      <td>{proposals.duration} روز</td>
      <td>{proposals.price}</td>
      <td>
        <span className={`badge ${statusStyle[proposals.status].className}`}>
          {statusStyle[proposals.status].label}
        </span>
      </td>
      <td>
        <Modal
          title="تغییر وضعیت درخواست"
          open={open}
          onClose={() => setOpen(false)}
        >
          <ChangeProposalStatus
            proposalId={proposals._id}
            onClose={() => setOpen(false)}
          />
        </Modal>
        <button onClick={() => setOpen(true)}>تغییر وضعیت</button>
      </td>
    </Table.Row>
  );
}
