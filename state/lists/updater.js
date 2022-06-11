import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useFetchListCallback } from '../../hooks/useFetchListCallback'
import useInterval from '../../hooks/useInterval'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { acceptListUpdate } from './actions'
import useActiveWeb3React from "../../hooks/useActiveWeb3React";

export default function Updater() {
    const { library } = useActiveWeb3React()
    const dispatch = useDispatch()
    const lists = useSelector((state) => state.lists.byUrl)

    const isWindowVisible = useIsWindowVisible()

    // const fetchList = useFetchListCallback()
    //
    // const fetchAllListsCallback = useCallback(() => {
    //     if (!isWindowVisible) return
    //     Object.keys(lists).forEach((url) =>
    //         fetchList(url).catch((error) => console.error('interval list fetching error', error))
    //     )
    // }, [fetchList, isWindowVisible, lists])
    //
    // // fetch all lists every 10 minutes, but only after we initialize library
    // useInterval(fetchAllListsCallback, library ? 1000 * 60 * 10 : null)
    //
    // // whenever a list is not loaded and not loading, try again to load it
    // useEffect(() => {
    //     Object.keys(lists).forEach((listUrl) => {
    //         const list = lists[listUrl]
    //
    //         if (!list.current && !list.loadingRequestId && !list.error) {
    //             fetchList(listUrl).catch((error) => console.error('list added fetching error', error))
    //         }
    //     })
    // }, [dispatch, fetchList, library, lists])
    //
    // // automatically update lists if versions are minor/patch
    // useEffect(() => {
    //     Object.keys(lists).forEach((listUrl) => {
    //         const list = lists[listUrl]
    //         if (list.current && list.pendingUpdate) {
    //             dispatch(acceptListUpdate(listUrl))
    //             // dispatch(
    //             //     addPopup({
    //             //         key: listUrl,
    //             //         content: {
    //             //             listUpdate: {
    //             //                 listUrl,
    //             //                 oldList: list.current,
    //             //                 newList: list.pendingUpdate,
    //             //                 auto: true,
    //             //             },
    //             //         },
    //             //     })
    //             // )
    //         }
    //     })
    // }, [dispatch, lists])

    return null
}
