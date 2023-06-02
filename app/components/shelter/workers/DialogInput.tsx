import React, { forwardRef, Ref } from "react";

type Props = {
  type: string;
  name: string;
  ref: Ref<any>
};

const DialogInput: React.FC<Props> = forwardRef((props: Props, ref: Ref<HTMLInputElement>) => {
  return (
    <label
        className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <span className="text-xs font-medium text-gray-700"> {props.name} </span>

          <input
              ref={ref}
              type={props.type}
              className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
  )
}
);

export default DialogInput;
