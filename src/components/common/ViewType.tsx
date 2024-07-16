import { useState } from "react";
import GridIcon from "../icons/GridIcon";
import ListIcon from "../icons/ListIcon";

export type TViewType = "list" | "grid";

type ViewTypeProps = {
  handleDataChange: (key: string, value: any) => void;
};

const items: { icon: React.ReactNode; value: TViewType }[] = [
  {
    icon: <ListIcon />,
    value: "list",
  },
  {
    icon: <GridIcon />,
    value: "grid",
  },
];

export default function ViewType({ handleDataChange }: ViewTypeProps) {
  const [view, setView] = useState<TViewType>("list");

  function handleViewChange(value: TViewType) {
    setView(value);
    handleDataChange("view", value);
  }

  return (
    <div className="hidden items-center sm:flex">
      {items.map(({ icon, value }, index) => (
        <button
          key={index}
          onClick={handleViewChange.bind(null, value)}
          className={`p-2 ${index === 0 ? "rounded-bl-sm rounded-tl-sm" : "rounded-br-sm rounded-tr-sm"} ${view === value ? "bg-wheels-primary text-white" : "bg-wheels-grey-2 text-wheels-grey-3"}`}>
          {icon}
        </button>
      ))}
    </div>
  );
}
