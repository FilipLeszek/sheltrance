import { AlertMessage } from "@/types/alerts";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

const ErrorAlert: React.FC<{
  error?: AlertMessage;
  time?: number;
}> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const timeout = props.time ? props.time : 3000;

  useEffect(() => {
    if (!isActive) return;
    setTimeout(() => {
      setIsActive(false);
    }, timeout);
  }, [isActive]);

  useEffect(() => {
    if (props.error) setIsActive(true);
  }, [props.error]);

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
          className="absolute rounded border-s-4 border-red-500 bg-red-50 p-4 max-w-xl h-max opacity-0 translate-y-[-100px]"
        >
          <div className="flex items-center gap-2 text-red-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>

            <strong className="block font-medium">{props.error?.title}</strong>
          </div>
          <p className="mt-2 text-sm text-red-700">{props.error?.message}</p>
        </div>
      </CSSTransition>
    </div>
  );
};

export default ErrorAlert;
