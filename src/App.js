import { useReducer } from "react";
import { Actions } from "./components/Actions";
import { DigitButton } from "./components/DigitButton";
import { OperationButton } from "./components/OperationButton";
import "./styles.css";
function reducer(state,{type,payload}){
  switch(type)
  {
      case Actions.ADD_DIGIT:
        if(payload.digit === "0" && state.currentOperand === "0"){
          return state;
        }

        if(payload.digit === "." && state.currentOperand.includes("."))
        {
          return state; 
        }
        if(state.overwrite)
        {
          return{
            ...state,
            currentOperand:payload.digit,
            overwrite:false,
          }
        }
        return {
          ...state,
          currentOperand:`${state.currentOperand || ""}${payload.digit}`,
        }
    
      case Actions.CHOOSE_OPERATOR:
        if(state.currentOperand == null && state.previousOperand == null){
          return state;
        }
        if(state.previousOperand == null)
        {
       
            return {
              ...state,
              operation:payload.operator,
              previousOperand:state.currentOperand,
              currentOperand:null
            }
        }
        if(state.currentOperand == null)
        {
          return {
            ...state,
            operation:payload.operator
          }
        }

        return {
          ...state,
          operation:payload.operator,
          previousOperand:evaluate(state),
          currentOperand:null
        }
      
     
      case Actions.EVALUATE:
        if(state.operation == null | state.previousOperand == null || state.currentOperand == null)
        {
          return state;
        }
        return {
          ...state,
          operation :null,
          previousOperand:null,
          currentOperand:evaluate(state),
          overwrite:true
        }
      case Actions.DELETE_DIGIT :
        if(state.overwrite)
        {
          return {
            ...state,
            currentOperand:null,
            overwrite:false
          }
        }
        if(state.currentOperand == null)
        {
            return state;
        }
        if(state.currentOperand.length === 1)
        {
          return {
            ...state,
            currentOperand:null
          }
        }
        return {
          ...state,
          currentOperand:state.currentOperand.slice(0,-1)
        }
      
      case Actions.CLEAR :
        return {};
        
  }
}
function evaluate({currentOperand,previousOperand,operation}){
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if(isNaN(prev) || isNaN(curr))
    {
      return  "";
    }
    let computation = "";
    switch(operation)
    {
        case "+":
          computation = prev + curr;
          break;
        case "-":
          computation = prev - curr;
          break;
        case "*":
          computation = prev * curr;
          break;
        case "/":
          computation = prev / curr;
          break;
    }
    return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
function App() {
  const[{currentOperand,previousOperand,operation},dispatch]=useReducer(reducer,{});
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({type:Actions.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type:Actions.DELETE_DIGIT})}>DEL</button>
      <OperationButton operator="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operator="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operator="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operator="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({type:Actions.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
