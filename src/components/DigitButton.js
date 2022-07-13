import React from "react";
import { Actions } from "./Actions";
export function DigitButton({dispatch,digit}){
    return (
        <button onClick={() => dispatch({type:Actions.ADD_DIGIT,payload:{digit}})} >
            {digit}
        </button>
    )
}