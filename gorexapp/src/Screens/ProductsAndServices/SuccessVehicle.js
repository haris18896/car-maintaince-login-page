import React, {useEffect} from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Successvehicle } from "../../assets";
import BackHeader from "../../Components/Header/BackHeader";

import Colors from "../../Constants/Colors";
import Fonts from "../../Constants/fonts";
import FontSize from "../../Constants/FontSize";
import { hp, wp } from "../../utils/responsiveSizes";
import Utilities from "../../utils/UtilityMethods";
import Footer from "./components/Footer";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";

const SuccessVehicle = ({ route }) => {
    const isComingFromOnDemand = route?.params?.isComingFromOnDemand;


    const { t }       = useTranslation();
    const navigation = useNavigation();


    useEffect(()=>{
        console.log('In Success screen == isComingFromOnDemand ===>>', isComingFromOnDemand);
    },[])

    return (
        <View style={styles.container}>
            <BackHeader title={t("vehicle.Add Vehicle")} />
            <Image resizeMode="contain" transitionDuration={1000} source={Successvehicle} style={styles.item}/>
            <Text style={styles.text}>Success!</Text>
            <Text style={styles.title}>
                You have added a new vehicle to your account.
            </Text>
            <View style={{justifyContent: "center", position: "absolute", bottom: 0, width: "100%",}}>
                <Footer title={t("Done")} onPress={() => navigation.navigate(isComingFromOnDemand?"GoDChooseVehicle":"MyVehicles")}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    item: {
        height: Utilities.wp(30),
        resizeMode: "contain",
        alignSelf: "center",
        alignItems: "center",
        width: wp(105),
        marginTop: Utilities.wp(40),
    },
    text: {
        color: Colors.BLACK,
        fontFamily: Fonts.LexendMedium,
        textAlign: "center",
        ...FontSize.rfs24,
    },
    title: {
        color: "#B8B9C1",
        width: "70%",
        alignSelf: "center",
        fontFamily: Fonts.LexendMedium,
        textAlign: "center",
        ...FontSize.rfs14,
        marginTop: hp(10),
    },
});

export default SuccessVehicle;
