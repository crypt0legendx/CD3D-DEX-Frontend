import api from "../utils/axios";

export const getData = async () => {
  return await api.get("data/?environment=mainnet");
};

export const submitBid = async (data) => {
  return await api.post("bid/?environment=mainnet", data);
};
