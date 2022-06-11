import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectorsByName } from "../constants/constants";
import getErrorMessage from "../utils/errorHelper";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = useCallback((connectorID) => {
    const connector = connectorsByName[connectorID];

    if (connector) {
      activate(connector, async (error) => {
        toast.error(getErrorMessage(error), { toastId: 1 });
      });
    } else {
      toast.error("Can't find connector The connector config is wrong", { toastId: 1 });
    }
  }, []);

  return { login, logout: deactivate };
};

export default useAuth;
