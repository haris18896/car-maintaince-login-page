import { showToast } from "../utils/common";
import axiosInstance from "../utils/axiosInstance";

const UpdateCustomerAddress = async ({ addressId, addressName, address, longitude, latitude }) => {
    const body = {
        params: {
            "model":"customer.address",
            "method": "write",
            "args":[[addressId],{
                "name": addressName,
                "address": address,
                "latitude":latitude,
                "longitude":longitude
            }],
            kwargs: {"context":{"lang":global.language === "en" ? "en_US" : "ar_001"}}
        },
    };

    return axiosInstance.post(`dataset/call_kw/`, body).then((response) => {
        return {
            success: response?.data?.result,
            response: response?.data?.result
                ? response?.data?.result
                : response?.data?.error?.data?.message,
        };
    }).catch((error) => {
        showToast("Error", error, "error");
        return error;
    });
};

export default UpdateCustomerAddress;
