import { showToast } from "../utils/common";
import axiosInstance from "../utils/axiosInstance";

const NearByServiceProviders = async ({region, serviceId, userId}) => {
    const body = {
        "customer":userId,
        "lat":`${region.latitude}`,
        "long":`${region.longitude}`,
        "prodcut_type":"service",
        "product_ids":[serviceId]
    }

    console.log('Nearby Service Providers body ====>> ', body);

    return axiosInstance.post(`/nearby/service_providers/on_demand`, body).then((response) => {
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

export default NearByServiceProviders;
