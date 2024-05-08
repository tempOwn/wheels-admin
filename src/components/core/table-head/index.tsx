import ArrowDownIcon from "../../icons/ArrowDownIcon";

type TableHeadProps = {
  name: string;
};

export default function TableHead({ name }: TableHeadProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="font-medium text-wheels-primary">{name}</span>
      <ArrowDownIcon />
    </div>
  );
}
