import React, { useEffect, useCallback, useState } from 'react';
import { useBusd } from './useContract';
import { useWeb3React } from '@web3-react/core';
import { getWeb3NoAccount } from '../utils/web3';
import { toast } from 'react-toastify';
import { getData, submitBid } from '../services/services';

function useCD3D() {
  const { active, library, account, error } = useWeb3React();

  const busdContract = useBusd(library, account);
  const [data, setData] = useState();
  const [counter, setCounter] = useState(1);
  const [loading, setLoading] = useState(false);

  const getSampleToken = async () => {
    const token = await busdContract.functions.sendMeUSDToken();
    var interval = setInterval(async () => {
      const receipt = await getWeb3NoAccount().eth.getTransactionReceipt(token.hash);
      if (receipt) {
        toast.success('Transaction Successful', { toastId: 1 });
        clearInterval(interval);
      }
    }, 100);
  };

  const placeSellOrders = useCallback(
    async (sellTokenAmount, busdAmount) => {
      try {
        const data = {
          address: account,
          environment: 'mainnet',
          busd_amount: busdAmount,
          cd3d_amount: sellTokenAmount,
        };
        const req = await submitBid(data);
        await fetchData();
        const placeBid = await busdContract.functions.transfer('0x570Ea06ADcEB46f592be11A195F705E774d05eD0', busdAmount);

        var interval = setInterval(async () => {
          const receipt = await getWeb3NoAccount().eth.getTransactionReceipt(placeBid.hash);
          if (receipt) {
            toast.success('Transaction Successful', { toastId: 1 });
            clearInterval(interval);
          }
        }, 100);
      } catch (err) {
        toast.error("Amount of BUSD's in your wallet should be greater or equal to amount of BUSD's you are submitting !", { toastId: 1 });
      }
    },
    [account, library]
  );

  const fetchData = async (loading = null) => {
    loading && loading(true);
    const req = await getData();
    setData(req.data);
    loading && loading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000);
    setCounter(counter + 1);

    return () => {
      clearInterval(interval);
    };
  }, [active, library]);

  useEffect(() => {
    fetchData(setLoading);
  }, []);

  return {
    placeSellOrders,
    getSampleToken,
    data,
    loading,
  };
}

export default useCD3D;
