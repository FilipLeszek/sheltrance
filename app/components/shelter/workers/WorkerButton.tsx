import React, { ReactNode } from "react";

const WorkerButton: React.FC<{
  children: ReactNode;
  color?: string;
  type?: "submit" | "button";
  mr?: string;
  onClick?: ([]: number[]) => void;
  args?: any[];
}> = (props) => {
  const colorClass = props.color ? props.color : "bg-[#F4694D]";
  const margin = props.mr ? props.mr : "";
  const type = props.type ? props.type : "submit";

  const clickHandler = () => {
    if (props.onClick) {
      props.onClick!(props.args!);
    }
  };

  return (
    <button
      type={type}
      onClick={clickHandler}
      className={`inline-flex items-center ${margin} gap-2 ${colorClass} rounded px-8 py-3 text-base font-medium text-black transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-${colorClass}  `}
    >
      {props.children}
    </button>
  );
};

export default WorkerButton;
