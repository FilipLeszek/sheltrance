import React from "react";

type StepTwoFormProps = {
  secondStepDate: string,
  secondStepFinish: string,
  secondStepComment: string,
  onInputDate: (date: any) => void
  onInputFinished: (check: any) => void;
  onInputComment: (text: any) => void;
};

const StepOneForm: React.FC<StepTwoFormProps> = (props) => {
  return (
    <div>
      <p className="text-lg font-semibold mb-1">Szczegóły etapu 2</p>
      <div className="flex mb-4">
        <div className="flex flex-col">
          <label htmlFor="stepTwoDate" className="text-lg font-semibold mb-1"> Data spotkania </label>
          <input
              value={props.secondStepDate}
              onChange={props.onInputDate}
              type="date"
              id="stepTwoDate"
              placeholder=""
              className="w-72 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
          />
        </div>
        <div className="flex flex-col ml-10 justify-content">
          <label htmlFor="stepTwoFinish" className="text-lg font-semibold mb-1"> Czy chcesz zakończyć etap?</label>
          <input
              value={props.secondStepFinish}
              onChange={props.onInputFinished}
              type="checkbox"
              id="stepTwoFinish"
              placeholder=""
              className="h-5 rounded-md border-gray-200 shadow-sm sm:text-sm mt-3"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="stepTwoComment" className="text-lg font-semibold mb-1"> Uwagi do przebiegu etapu </label>
        <textarea
            value={props.secondStepComment}
            onChange={props.onInputComment}
            id="stepTwoComment"
            placeholder="Opisz przebieg etapu..."
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
        />
      </div>

    </div>
  );
};

export default StepOneForm;
