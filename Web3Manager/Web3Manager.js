import React from "react";
import { useEagerConnect, useInactiveListener } from "../hooks/useWeb3";
import { useWeb3React } from "@web3-react/core";
import getErrorMessage from "../utils/errorHelper";
export default function Web3ReactManager({ children }) {
  const context = useWeb3React();
  const { connector, error } = context;
  const [activatingConnector, setActivatingConnector] = React.useState();

  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  React.useEffect(() => {
    getErrorMessage(error);
  }, []);
  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager || !!activatingConnector);
  // useInactiveListener(!triedEager);

  // on page load, do nothing until we've tried to connect to the injected connector
  //   if (!triedEager) {
  //     return null;
  //   }

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  //   if (!active && networkError) {
  //     return (
  //       <MessageWrapper>
  //         <Message>{t("unknownError")}</Message>
  //       </MessageWrapper>
  //     );
  //   }

  // if neither context is active, spin
  //   if (!active && !networkActive) {
  //     return showLoader ? (
  //       <MessageWrapper>
  //         <Loader />
  //       </MessageWrapper>
  //     ) : null;
  //   }

  return children;
}
