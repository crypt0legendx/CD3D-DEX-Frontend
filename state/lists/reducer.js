import { createReducer } from '@reduxjs/toolkit'

// eslint-disable-next-line import/no-unresolved
import { acceptListUpdate, addList, fetchTokenList, removeList, selectList } from './actions'
import DEFAULT_LIST from '../../constants/token/cd3d.json'

const NEW_LIST_STATE = {
    error: null,
    current: null,
    loadingRequestId: null,
    pendingUpdate: null,
}

const initialState = {
    lastInitializedDefaultListOfLists: ['cd3d'],
    byUrl: {
        ['cd3d']: {
            error: null,
            current: DEFAULT_LIST,
            loadingRequestId: null,
            pendingUpdate: null,
        },
    },
    selectedListUrl: 'cd3d',
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(fetchTokenList.pending, (state, { payload: { requestId, url } }) => {
            state.byUrl[url] = {
                current: null,
                pendingUpdate: null,
                ...state.byUrl[url],
                loadingRequestId: requestId,
                error: null,
            }
        })
        .addCase(fetchTokenList.fulfilled, (state, { payload: { requestId, tokenList, url } }) => {
            const current = state.byUrl[url]?.current
            const loadingRequestId = state.byUrl[url]?.loadingRequestId

            // no-op if update does nothing
            if (current) {
                if (loadingRequestId === null || loadingRequestId === requestId) {
                    state.byUrl[url] = {
                        ...state.byUrl[url],
                        loadingRequestId: null,
                        error: null,
                        current,
                        pendingUpdate: tokenList,
                    }
                }
            } else {
                state.byUrl[url] = {
                    ...state.byUrl[url],
                    loadingRequestId: null,
                    error: null,
                    current: tokenList,
                    pendingUpdate: null,
                }
            }
        })
        .addCase(fetchTokenList.rejected, (state, { payload: { url, requestId, errorMessage } }) => {
            if (state.byUrl[url]?.loadingRequestId !== requestId) {
                // no-op since it's not the latest request
                return
            }

            state.byUrl[url] = {
                ...state.byUrl[url],
                loadingRequestId: null,
                error: errorMessage,
                current: null,
                pendingUpdate: null,
            }
        })
        .addCase(selectList, (state, { payload: url }) => {
            state.selectedListUrl = url
            // automatically adds lists
            if (!state.byUrl[url]) {
                state.byUrl[url] = NEW_LIST_STATE
            }
        })
        .addCase(addList, (state, { payload: url }) => {
            if (!state.byUrl[url]) {
                state.byUrl[url] = NEW_LIST_STATE
            }
        })
        .addCase(removeList, (state, { payload: url }) => {
            if (state.byUrl[url]) {
                delete state.byUrl[url]
            }
            if (state.selectedListUrl === url) {
                state.selectedListUrl = Object.keys(state.byUrl)[0]
            }
        })
        .addCase(acceptListUpdate, (state, { payload: url }) => {
            if (!state.byUrl[url]?.pendingUpdate) {
                throw new Error('accept lists update called without pending update')
            }
            state.byUrl[url] = {
                ...state.byUrl[url],
                pendingUpdate: null,
                current: state.byUrl[url].pendingUpdate,
            }
        })
)
