import {
  HiCollection,
  HiCurrencyDollar,
  HiOutlineViewGrid,
} from "react-icons/hi";
import Stat from "../../ui/Stat";
import { toPersianNumbersWithComma } from "../../utils/toPersianNumbers";

export default function Stats({ proposals }) {
  const numOfProjects = proposals.length;
  const acceptedProposals = proposals.filter((p) => p.status === 2);

  const balance = acceptedProposals.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="grid grid-cols-3 gap-x-8">
      <Stat
        icon={<HiOutlineViewGrid className="w-20 h-20" />}
        title="درخواست ها"
        value={numOfProjects}
        color="primary"
      />
      <Stat
        icon={<HiCurrencyDollar className="w-20 h-20" />}
        title="درخواست های تایید شده"
        value={acceptedProposals.length}
        color="green"
      />
      <Stat
        icon={<HiCollection className="w-20 h-20" />}
        title="کیف پول"
        value={toPersianNumbersWithComma(balance)}
        color="yellow"
      />
    </div>
  );
}
