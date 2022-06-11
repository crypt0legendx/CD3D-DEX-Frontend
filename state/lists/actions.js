import { ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

export const fetchTokenList = {
    pending: createAction('lists/fetchTokenList/pending'),
    fulfilled: createAction('lists/fetchTokenList/fulfilled'),
    rejected: createAction('lists/fetchTokenList/rejected')
}

export const acceptListUpdate = createAction('lists/acceptListUpdate')
export const addList = createAction('lists/addList')
export const removeList = createAction('lists/removeList')
export const selectList = createAction('lists/selectList')
export const rejectVersionUpdate = createAction('lists/rejectVersionUpdate')
