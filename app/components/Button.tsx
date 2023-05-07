import { ReactNode } from "react";

const Button: React.FC<{
  children: ReactNode;
  color?: string;
  type?: "submit";
  onClick?: ([]: number[]) => void;
  args?: any[];
}> = (props) => {

  const clickHandler = () => {
    if (props.onClick) {
      props.onClick!(props.args!);
    }
  };

  return (
    <button
      type={props.type}
      onClick={clickHandler}
      className={
        `inline-block rounded border border-[#FA5E47] bg-[#FA5E47] px-12 py-3 text-sm font-medium text-black hover:bg-transparent hover:text-[#FA5E47] focus:outline-none focus:ring active:text-[#FA5E47]`
      }
    >
      {props.children}
    </button>
  );
};

export default Button;
