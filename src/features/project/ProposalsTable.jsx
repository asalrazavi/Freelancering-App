import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import ProposalsRow from "./ProposalRow";

export default function ProposalsTable({ proposals }) {
  if (!proposals.length) return <Empty resourceName="درخواستی" />;

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>فریلنسر</th>
        <th>توضیحات</th>
        <th>زمان تحویل</th>
        <th>هزینه</th>
        <th>وضعیت</th>
        <th>عملیات</th>
      </Table.Header>
      <Table.Body>
        {proposals.map((proposals, index) => (
          <ProposalsRow
            key={proposals._id}
            proposals={proposals}
            index={index}
          />
        ))}
      </Table.Body>
    </Table>
  );
}
