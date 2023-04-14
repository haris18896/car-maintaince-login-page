import { showToast } from "../utils/common";
import axiosInstance from "../utils/axiosInstance";

const CreateOrder = async (args) => {
  const body = {
    params: {
      method: "create",
      model: "gorex.order",
      args: [args],
      kwargs: {},
    },
  };

  return axiosInstance.post(`/dataset/call_kw/`, body).then((response) => {
      return {
        success: response?.data?.result,
        response: response?.data?.result ? response?.data?.result : response?.data?.error?.data?.message,
      };
    })
    .catch((error) => {
      showToast("Error", error, "error");
      return error;
    });
};

export default CreateOrder;
