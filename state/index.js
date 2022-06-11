import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import application from './application/reducer'
import user from './user/reducer'
import lists from './lists/reducer'
import mint from './mint/reducer'
import multicall from './multicall/reducer'
import transactions from './transactions/reducer';
import farms from './farms'
import burn from './burn/reducer'
import {useDispatch} from "react-redux";

const PERSISTED_KEYS = ['user', 'transactions', 'lists']

const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
        application,
        user,
        lists,
        mint,
        transactions,
        multicall,
        farms,
        burn
    },
    middleware: [...getDefaultMiddleware({ thunk: true }), save({ states: PERSISTED_KEYS })],
    preloadedState: load({ states: PERSISTED_KEYS }),
})

export const useAppDispatch = () => useDispatch()

export default store
