import React from "react";

type StepThreeFormProps = {
  thirdStepDate: string,
  thirdStepFinish: string,
  thirdStepComment: string,
  onInputDate: (date: any) => void
  onInputFinished: (check: any) => void;
  onInputComment: (text: any) => void;
};


const StepOneForm: React.FC<StepThreeFormProps> = (props) => {
  return (
    <div>
      <p className="text-lg font-semibold mb-1">Szczegóły etapu 3</p>
      <div className="flex mb-4">
        <div className="flex flex-col">
          <label htmlFor="stepThreeDate" className="text-lg font-semibold mb-1"> Data wizyty </label>
          <input
              value={props.thirdStepDate}
              onChange={props.onInputDate}
              type="date"
              id="stepThreeDate"
              placeholder=""
              className="w-72 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
          />
        </div>
        <div className="flex flex-col ml-10 justify-content">
          <label htmlFor="stepThreeFinish" className="text-lg font-semibold mb-1"> Czy chcesz zakończyć etap?</label>
          <div  className="flex mt-3 justify-center align-center">
            <input
                value={props.thirdStepFinish}
                checked={props.thirdStepFinish as unknown as boolean}
                onChange={props.onInputFinished}
                type="checkbox"
                id="stepThreeFinish"
                placeholder=""
                className="h-6 w-6 rounded-md border-gray-200 shadow-sm"
            />
            <p className="text-sm  h-8 w-8 font-bold ml-1">Tak</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="stepThreeComment" className="text-lg font-semibold mb-1"> Uwagi do przebiegu etapu </label>
        <textarea
            value={props.thirdStepComment}
            onChange={props.onInputComment}
            id="stepThreeComment"
            placeholder="Opisz przebieg etapu..."
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
        />
      </div>

    </div>
  );
};

export default StepOneForm;
