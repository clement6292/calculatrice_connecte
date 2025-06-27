import { useRef, useState, useEffect } from 'react'
import './App.css'


function App() {
const [firstNumber, setFirstNumber] = useState("0");
const [secondNumber, setSecondNumber] = useState("0");
const [operator, setOperator] = useState("");
const [result, setResult] = useState("0");
const [isResultDisplayed, setIsResultDisplayed] = useState(false);
const ref = useRef(null);

useEffect (() => {
  ref.current.focus()
}); // This is just to show that the component is mounted






const formatResult = (value) => {
  const formatedValue = value.toString();
  let result ;

  if (formatedValue.length > 10) {
    result = value.toPrecision(10);
  } else {
    result = value;
  }
  setResult(result);
}



  const handleNumberClick = (value) => {
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
      console.log("Maximum number length reached");
       setFirstNumber((prev) => prev == "0" ? value : prev + value);
    }else if (secondNumberlength < 10 && operator) {
      console.log("Maximum number length reached for second number");
      setSecondNumber((prev) => prev == "0" ? value : prev + value);
    }
   
    console.log('Number clicked',firstNumberlength , value  );
    
  }

  const handleOperatorClick = (operator) => {
   console.log('Operator clicked', operator);
   setOperator(operator);
  }

  const handleClear = () => {
    setFirstNumber("0");
    setSecondNumber("0");
    setOperator("");
    setResult("0");
    console.log('Calculator cleared');
  }



  const handleEqualClick = () => {
    if (firstNumber && secondNumber && operator) {
     
      const num1 = parseInt(firstNumber);
      const num2 = parseInt(secondNumber);
      

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
            setResult(0);
          }else{
            formatResult(num1 / num2);
          }
          break;
        // default:
        //   calculation = "Error";
      }
      setIsResultDisplayed(true);
    }
  }


  const handleKeyDown = (event) => {
  const key = event.key;

  const verifTypeOfKey = isNaN(Number(key));
  if (!verifTypeOfKey){
    handleNumberClick(key)
  }else if (["+", "-", "*", "/"].includes(key)) {
    handleOperatorClick(key);
  }else if (key === "Enter") {
    handleEqualClick();
  }else if (key === "c" || key === "C") {
    handleClear();
  }
  
}



  return (
    <>
     <div 
     ref ={ref}
     className="calculator"
     onKeyDown={handleKeyDown}
     tabIndex="0"
     style={{ outline: "none" }} // To make the div focusable
     >
        <div className="display">
          <div>{firstNumber} </div>
          <div className="operator"> {operator} </div>
          <div> {secondNumber} </div>
          <div className="result">
            <div> = </div>
            <div>{result ? result : "0"}</div>
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => handleNumberClick("1")}>1</button>
          <button onClick={() => handleNumberClick("2")}>2</button>
          <button onClick={() => handleNumberClick("3")}>3</button>
          <button onClick={() => handleOperatorClick("+")}>+</button>
          <button onClick={() => handleNumberClick("4")}>4</button>
          <button onClick={() => handleNumberClick("5")}>5</button>
          <button onClick={() => handleNumberClick("6")}>6</button>
          <button onClick={() => handleOperatorClick("-")}>-</button>
          <button onClick={() => handleNumberClick("7")}>7</button>
          <button onClick={() => handleNumberClick("8")}>8</button>
          <button onClick={() => handleNumberClick("9")}>9</button>
          <button onClick={() => handleOperatorClick("*")}>*</button>
          <button onClick={() => handleNumberClick("0")}>0</button>
          <button onClick={handleClear}>C</button>
          <button onClick={() => handleEqualClick()}>=</button>
          <button onClick={() => handleOperatorClick("/")}>/</button>
        </div>
      </div>
    </>
      

  )
  }


export default App
