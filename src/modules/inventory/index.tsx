"use client";
import { useQueryState } from "nuqs";

export default function Inventory() {
  const [tab, setTab] = useQueryState("tab");

  return (
    <div>
      <div className="flex items-center">
        {[
          { name: "All Assets", count: 690, value: "all" },
          { name: "Reeddi System", count: 550, value: "reeddi-system" },
          { name: "Others", count: 140, value: "others" },
        ].map(({ name, count, value }, index) => (
          <button
            key={index}
            onClick={() => setTab(value)}
            className={`$ flex items-center space-x-2 px-4 py-2.5 ${value === tab ? "text-wheels-primary rounded rounded-bl-none rounded-br-none bg-white" : "text-wheels-grey"}`}
          >
            <div
              className={`text-10 rounded-md px-2 py-0.5 font-medium text-white ${value === tab ? "bg-wheels-purple" : "bg-wheels-grey"}`}
            >
              {count}
            </div>
            <p className="text-sm font-medium">{name}</p>
          </button>
        ))}
      </div>
      <div className="rounded bg-white p-5">Table</div>
    </div>
  );
}
