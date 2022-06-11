import { createReducer } from '@reduxjs/toolkit'
import { resetMintState, typeInput } from './actions'
import {Field} from "../../constants";

const initialState = {
    independentField: Field.CURRENCY_A,
    typedValue: '',
    otherTypedValue: ''
}

export default createReducer(initialState, builder =>
    builder
        .addCase(resetMintState, () => initialState)
        .addCase(typeInput, (state, { payload: { field, typedValue, noLiquidity } }) => {
            if (noLiquidity) {
                // they're typing into the field they've last typed in
                if (field === state.independentField) {
                    return {
                        ...state,
                        independentField: field,
                        typedValue
                    }
                }
                // they're typing into a new field, store the other value

                return {
                    ...state,
                    independentField: field,
                    typedValue,
                    otherTypedValue: state.typedValue
                }

            }
            return {
                ...state,
                independentField: field,
                typedValue,
                otherTypedValue: ''
            }

        })
)
