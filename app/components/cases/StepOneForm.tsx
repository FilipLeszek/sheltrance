import React from "react";

type StepOneFormProps = {
  firstStepDate: string,
  firstStepFinish: string,
  firstStepComment: string,
  onInputDate: (date: any) => void
  onInputFinished: (check: any) => void;
  onInputComment: (text: any) => void;
};

const StepOneForm: React.FC<StepOneFormProps> = (props) => {

  return (
    <div>
      <p className="text-lg font-semibold mb-1">Szczegóły etapu 1</p>
      <div className="flex mb-4">
        <div className="flex flex-col">
          <label htmlFor="stepOneDate" className="text-lg font-semibold mb-1"> Data rozmowy </label>
          <input
              value={props.firstStepDate}
              onChange={props.onInputDate}
              type="date"
              id="stepOneDate"
              placeholder=""
              className="w-72 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
          />
        </div>
        <div className="flex flex-col ml-10 justify-content">
          <label htmlFor="stepOneFinish" className="text-lg font-semibold mb-1"> Czy chcesz zakończyć etap?</label>
          <div className="flex mt-3 justify-center align-center">
            <input
                value={props.firstStepFinish}
                onChange={props.onInputFinished}
                checked={props.firstStepFinish as unknown as boolean}
                type="checkbox"
                id="stepOneFinish"
                placeholder=""
                className="h-6 w-6 rounded-md border-gray-200 shadow-sm"
            />
            <p className="text-sm  h-8 w-8 font-bold ml-1">Tak</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="stepOneComment" className="text-lg font-semibold mb-1"> Uwagi do przebiegu etapu </label>
        <textarea
            value={props.firstStepComment}
            onChange={props.onInputComment}
            id="stepOneComment"
            placeholder="Opisz przebieg etapu..."
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
        />
      </div>
    </div>
  );
};

export default StepOneForm;
