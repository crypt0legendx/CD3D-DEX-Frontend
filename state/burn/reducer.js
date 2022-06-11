import { createReducer } from '@reduxjs/toolkit'
import { typeInput } from './actions'
import {Field} from "../../constants";

const initialState = {
    independentField: Field.LIQUIDITY_PERCENT,
    typedValue: '0',
}

export default createReducer(initialState, (builder) =>
        builder.addCase(typeInput, (state, { payload: { field, typedValue } }) => {
            return {
                ...state,
                independentField: field,
                typedValue,
            }
        }),
)
