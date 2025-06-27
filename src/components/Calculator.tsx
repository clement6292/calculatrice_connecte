import React, { useRef, useState, useEffect } from "react";
import '../App.css';
import Display from "./Display";
import Boutton from "./Button";

const Calculator: React.FC = () => {
  const [firstNumber, setFirstNumber] = useState("0");
  const [secondNumber, setSecondNumber] = useState("0");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("0");
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const formatResult = (value: number) => {
    const formatedValue = value.toString();
    let finalResult;

    if (formatedValue.length > 10) {
      finalResult = value.toPrecision(10);
    } else {
      finalResult = value;
    }
    setResult(finalResult.toString());
  };

  const handleNumberClick = (value: string) => {
    if (isResultDisplayed) {
      setFirstNumber(value);
      setSecondNumber("0");
      setOperator("");
      setResult("0");
      setIsResultDisplayed(false);
      return;
    }
    const firstNumberlength = firstNumber.length;
    const secondNumberlength = secondNumber.length;

    if (firstNumberlength < 10 && !operator) {
      setFirstNumber((prev) => (prev === "0" ? value : prev + value));
    } else if (secondNumberlength < 10 && operator) {
      setSecondNumber((prev) => (prev === "0" ? value : prev + value));
    }
  };

  const handleOperatorClick = (op: string) => {
    setOperator(op);
  };

  const handleClear = () => {
    setFirstNumber("0");
    setSecondNumber("0");
    setOperator("");
    setResult("0");
    setIsResultDisplayed(false);
  };

  const handleEqualClick = () => {
    if (firstNumber && secondNumber && operator) {
      const num1 = parseFloat(firstNumber);
      const num2 = parseFloat(secondNumber);

      switch (operator) {
        case "+":
          formatResult(num1 + num2);
          break;
        case "-":
          formatResult(num1 - num2);
          break;
        case "*":
          formatResult(num1 * num2);
          break;
        case "/":
          if (num2 === 0) {
            setResult("0");
          } else {
            formatResult(num1 / num2);
          }
          break;
      }
      setIsResultDisplayed(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;

    if (!isNaN(Number(key))) {
      handleNumberClick(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
      handleOperatorClick(key);
    } else if (key === "Enter") {
      handleEqualClick();
    } else if (key.toLowerCase() === "c") {
      handleClear();
    }
  };

  // Tableau regroupé des opérateurs
  const operators = ["+", "-", "*", "/"];

  return (
    <div
      className="calculator"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={ref}
      style={{ outline: "none" }}
    >
      <Display
        firstNumber={firstNumber}
        secondNumber={secondNumber}
        operator={operator}
        result={result}
      />

      <div className="buttons">
        {/* Chiffres 1 à 9 */}
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
          <Boutton key={num} label={num} onClick={() => handleNumberClick(num)} />
        ))}

      
        {operators.map((op) => (
          <Boutton key={op} label={op} onClick={() => handleOperatorClick(op)} />
        ))}

        {/* Boutons 0, Clear, égal */}
        <Boutton label="0" onClick={() => handleNumberClick("0")} />
        <Boutton label="C" onClick={handleClear} />
        <Boutton label="=" onClick={handleEqualClick} />
      </div>
    </div>
  );
};

export default Calculator;
