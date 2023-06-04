import React from "react";

const StepOneForm: React.FC<{
}> = (props) => {
  return (
    <div>
      <p className="text-lg font-semibold mb-1">Szczegóły etapu 4</p>
      <div className="flex mb-4">
        <div className="flex flex-col">
          <label htmlFor="stepOneDate" className="text-lg font-semibold mb-1"> Data podpisania </label>
          <input
              type="date"
              id="stepOneDate"
              placeholder=""
              className="w-72 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
          />
        </div>
        <div className="flex flex-col ml-10 justify-content">
          <label htmlFor="stepOneFinish" className="text-lg font-semibold mb-1"> Czy chcesz zakończyć etap?</label>
          <input
              type="checkbox"
              id="stepOneFinish"
              placeholder=""
              className="h-5 rounded-md border-gray-200 shadow-sm sm:text-sm mt-3"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="stepOneComment" className="text-lg font-semibold mb-1"> Uwagi do przebiegu etapu </label>
        <textarea
            id="stepOneComment"
            placeholder="Opisz przebieg etapu..."
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
        />
      </div>

    </div>
  );
};

export default StepOneForm;
