import { showToast } from "../utils/common";
import axiosInstance from "../utils/axiosInstance";
import {useTranslation} from "react-i18next";

const GetTransactions = async (userId) => {

    const body = {
        "params": {
            "model": "res.partner",
            "method": "get_transactions",
            "args": [[]],
            "kwargs": {"context":{"lang":global.language === "en" ? "en_US" : "ar_001"}, "partner_id":userId}
        }
    };

    return axiosInstance
        .post(`/dataset/call_kw/`, body)
        .then((response) => {
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

export default GetTransactions;
