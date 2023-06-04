import { AlertMessage } from "@/types/alerts";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

const SuccessAlert: React.FC<{ message?: AlertMessage; time?: number }> = (
  props
) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const timeout = props.time ? props.time : 3000;

  useEffect(() => {
    if (!isActive) return;
    setTimeout(() => {
      setIsActive(false);
    }, timeout);
  }, [isActive]);

  useEffect(() => {
    if (props.message) setIsActive(true);
  }, [props.message]);

  return (
    <div className="absolute w-full left-0 top-0 flex justify-center">
      <CSSTransition
        in={isActive}
        timeout={props.time ? props.time : 300}
        classNames={{
          enter: "opacity-0 translate-y-[-100px]",
          enterActive:
            "opacity-100 translate-y-[60px] transition-all duration-300",
          enterDone: "opacity-100 translate-y-[60px]",
          exitActive:
            "opacity-0 translate-y-[-100px] transition-all duration-300",
          exitDone: "opacity-0 translate-y-[-100px]",
        }}
      >
        <div
          role="alert"
          className="rounded-xl border border-gray-100 bg-white p-4 shadow-xl"
        >
          <div className="flex items-start gap-4">
            <span className="text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>

            <div className="flex-1">
              <strong className="block font-medium text-gray-900">
                {" "}
                Changes saved{" "}
              </strong>

              <p className="mt-1 text-sm text-gray-700">
                Your product changes have been saved.
              </p>
            </div>

            <button className="text-gray-500 transition hover:text-gray-600">
              <span className="sr-only">Dismiss popup</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
