import { ReactNode } from "react";

const Button: React.FC<{
  children: ReactNode;
  color?: string;
  type?: "submit";
  onClick?: ([]: number[]) => void;
  args?: any[];
}> = (props) => {
  const colorClass = props.color ? props.color : "bg-blue-500";

  const clickHandler = () => {
    if (props.onClick) {
      props.onClick!(props.args!);
    }
  };

  return (
    <button
      type={props.type}
      onClick={clickHandler}
      className={`p-[0.5vw] px-[0.8vw] min-w-[3vw] rounded-md text-white hover:scale-105 transition ${colorClass} `}
    >
      {props.children}
    </button>
  );
};

export default Button;
