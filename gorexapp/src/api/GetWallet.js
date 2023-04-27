import { showToast } from "../utils/common";
import axiosInstance from "../utils/axiosInstance";
import {useTranslation} from "react-i18next";

const GetWallet = async (userId) => {

  const body = {
    params: {
      model: "customer.card",
      method: "search_read",
      args: [[["card_holder", "=", userId]]],

      kwargs: {"context":{"lang":global.language === "en" ? "en_US" : "ar_001"}, fields: ["id", "card_holder", "number","date", "card_brand"] },
    },
  };

  return axiosInstance.post(`/dataset/call_kw/`, body).then((response) => {
      return {
        success: response?.data?.result,
        response: response?.data?.result
          ? response?.data?.result
          : response?.data?.error?.data?.message,
      };
    })
    .catch((error) => {
      showToast("Error", error, "error");
      return error;
    });
};

export default GetWallet;