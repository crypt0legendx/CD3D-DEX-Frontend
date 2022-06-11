import {useEffect, useRef, useState} from "react";
import {useWeb3React} from '@web3-react/core'
import {simpleRpcProvider} from "../utils/providers";
import {NETWORK_CHAIN_ID} from "../connectors";

const useActiveWeb3React = () => {
  const { library, chainId, ...web3React } = useWeb3React()
  const refEth = useRef(library)
  const [provider, setProvider] = useState(library || simpleRpcProvider)

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider)
      refEth.current = library
    }
  }, [library])

  return { library: provider, chainId: chainId ?? parseInt(NETWORK_CHAIN_ID, 10), ...web3React }
}

export default useActiveWeb3React
