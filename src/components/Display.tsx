import React from "react";

interface DisplayProps {
  firstNumber: string;
  secondNumber: string;
  operator: string;
  result: string;
}

const Display: React.FC<DisplayProps> = ({ firstNumber, secondNumber, operator, result }) => {
  return (
    <div className="display">
      <div>{firstNumber}</div>
      <div className="operator">{operator}</div>
      <div>{secondNumber}</div>
      <div className="result">
        <div>=</div>
        <div>{result || "0"}</div>
      </div>
    </div>
  );
};

export default Display;
