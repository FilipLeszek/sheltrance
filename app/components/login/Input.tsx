import { Ref } from "react";

const Input: React.FC<{
  placeholder: string;
  type: string;
  reference: Ref<HTMLInputElement>;
}> = (props) => {
  return (
    <input
      ref={props.reference}
      type={props.type}
      className="w-full rounded-lg border-gray-200 border-2 p-4 pe-12 text-sm shadow-md"
      placeholder={props.placeholder}
    />
  );
};

export default Input;
