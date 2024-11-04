import { useState } from "react";
import Modal from "../../../ui/Modal";
import Table from "../../../ui/Table";
import ChangeUserStatus from "./ChangeUserStatus";

export default function UserRow({ user, index }) {
  const [open, setOpen] = useState(false);
  const userStatus = [
    { Label: "رد شده", calssName: "badge--danger" },
    { Label: "در انتظار تایید", calssName: "badge--secondary" },
    { Label: "تایید شده", calssName: "badge--success" },
  ];

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.role}</td>
      <td>
        <span className={`badge ${userStatus[user.status].calssName}`}>
          {userStatus[user.status].Label}
        </span>
      </td>
      <td>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="تغییر وضعیت کاربر"
        >
          <ChangeUserStatus onClose={() => setOpen(false)} userId={user._id} />
        </Modal>
        <button onClick={() => setOpen(true)}>تغییر وضعیت</button>
      </td>
    </Table.Row>
  );
}
