import { createAction } from '@reduxjs/toolkit'

export const updateMatchesDarkMode = createAction('user/updateMatchesDarkMode')
export const updateUserDarkMode = createAction('user/updateUserDarkMode')
export const updateUserExpertMode = createAction('user/updateUserExpertMode')
export const updateUserSlippageTolerance = createAction('user/updateUserSlippageTolerance')
export const updateUserDeadline = createAction('user/updateUserDeadline')
export const addSerializedToken = createAction('user/addSerializedToken')
export const removeSerializedToken = createAction('user/removeSerializedToken')
export const addSerializedPair = createAction('user/addSerializedPair')
export const removeSerializedPair = createAction('user/removeSerializedPair')
export const muteAudio = createAction('user/muteAudio')
export const unmuteAudio = createAction('user/unmuteAudio')
