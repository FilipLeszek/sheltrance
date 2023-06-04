import React from "react";

type StepFourFormProps = {
  fourthStepDate: string,
  fourthStepFinish: string,
  fourthStepComment: string,
  onInputDate: (date: any) => void
  onInputFinished: (check: any) => void;
  onInputComment: (text: any) => void;
};

const StepOneForm: React.FC<StepFourFormProps> = (props) => {
  return (
    <div>
      <p className="text-lg font-semibold mb-1">Szczegóły etapu 4</p>
      <div className="flex mb-4">
        <div className="flex flex-col">
          <label htmlFor="stepFourDate" className="text-lg font-semibold mb-1"> Data podpisania </label>
          <input
              value={props.fourthStepDate}
              onChange={props.onInputDate}
              type="date"
              id="stepFourDate"
              placeholder=""
              className="w-72 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
          />
        </div>
        <div className="flex flex-col ml-10 justify-content">
          <label htmlFor="stepFourFinish" className="text-lg font-semibold mb-1"> Czy chcesz zakończyć etap?</label>
          <input
              value={props.fourthStepFinish}
              onChange={props.onInputFinished}
              type="checkbox"
              id="stepFourFinish"
              placeholder=""
              className="h-5 rounded-md border-gray-200 shadow-sm sm:text-sm mt-3"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="stepFourComment" className="text-lg font-semibold mb-1"> Uwagi do przebiegu etapu </label>
        <textarea
            value={props.fourthStepComment}
            onChange={props.onInputComment}
            id="stepFourComment"
            placeholder="Opisz przebieg etapu..."
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
        />
      </div>

    </div>
  );
};

export default StepOneForm;
