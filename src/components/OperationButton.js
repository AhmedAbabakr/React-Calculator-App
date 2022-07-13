import React from "react";
import { Actions } from "./Actions";
export function OperationButton({dispatch,operator}){
    return (
        <button onClick={() => dispatch({type:Actions.CHOOSE_OPERATOR,payload:{operator}})} >
            {operator}
        </button>
    )
}