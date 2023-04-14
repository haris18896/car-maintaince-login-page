import { showToast } from "../utils/common";
import axiosInstance from "../utils/axiosInstance";

const CommonAPI = async ({ body, endPoint = null }) => {

    return axiosInstance.post(endPoint ? endPoint : "/dataset/call_kw/", body).then((response) => {
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

export default CommonAPI;
