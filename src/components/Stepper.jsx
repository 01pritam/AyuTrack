import React, { useState } from 'react';
import { TiTick } from 'react-icons/ti';

const Stepper = () => {
  const steps = ['Order Placed', 'Dispatched', 'In Transit', 'Delivered'];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex-1 flex items-center"
          >
            <div
              className={`w-12 h-8 rounded-full flex items-center justify-center ${
                currentStep === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              } ${
                (i + 1 < currentStep || complete) && 'bg-green-500 text-white'
              }`}
            >
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500 text-center w-full">{step}</p>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
            )}
          </div>
        ))}
      </div>
      {!complete && (
        <button
          className="mr-4 mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? 'Finish' : 'Next'}
        </button>
      )}
    </>
  );
};

export default Stepper;