import React, {useContext, useEffect} from "react";
import { Text, View, Image } from "react-native";

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";


import styles from "./styles";
import { OrderConfirmedImage } from "../../assets";
import BackHeader from "../../Components/Header/BackHeader";
import {CommonContext} from "../../contexts/ContextProvider";
import Footer from "../ProductsAndServices/components/Footer";
import {GetProfile} from "../../api/CallAPI";

const OrderConfirmed = (props) => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const {selectedBranch, setUserProfile, partnerId} = useContext(CommonContext);

    useEffect(()=>{
        fetchAndUpdateLatestProfile().then();
    },[])

    const fetchAndUpdateLatestProfile = async () =>{

        GetProfile({ profileID: partnerId }).then((getProfileResponse) => {
            if (getProfileResponse?.success) {

                setUserProfile(getProfileResponse?.data[0])
            }
        });
    }

    return (
        <View style={styles.mainContainer}>
            <BackHeader title={selectedBranch.name} leftPress={()=>{navigation.navigate("Dashboard")}} />
            <View style={styles.centerContainer}>
                <Image style={styles.image} source={OrderConfirmedImage}/>

                <View style={styles.separator} />

                <Text style={styles.titleText}>{t("orderConfirmed.orderConfirmed")}</Text>
                <View style={styles.subTitleView}>
                    <Text style={styles.subTitleText}>{t("orderConfirmed.orderConfirmedDescription")}</Text>
                </View>
            </View>
            <Footer title={t("orderConfirmed.viewOrder")} onPress={() => {navigation.navigate("OrderDetails", {branch_id:selectedBranch.id, order_id: props?.route?.params?.order_id});}}/>
        </View>
    );
};

export default OrderConfirmed;
