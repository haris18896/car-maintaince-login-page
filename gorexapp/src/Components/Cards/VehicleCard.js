import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { ToyotaLogo } from "../../assets";
import Colors from "../../Constants/Colors";
import FontSize from "../../Constants/FontSize";
import FontFamily from "../../Constants/FontFamily";
import { hp, wp } from "../../utils/responsiveSizes";

import CardWithShadow from "../../Components/Cards/CardWithShadow";

const VehicleCard = ({vehicle, cardStyle}) => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <CardWithShadow cardStyle={[styles.cardStyle, cardStyle]}>
            <View style={{flexDirection: 'row'}}>
                <Image style={styles.manufacturerImage} source={vehicle?.file ? { uri: `data:image/gif;base64,${vehicle?.file}` } : ToyotaLogo} />
                <View style={{width: wp(15)}} />
                <View style={styles.manufacturerRow}>
                    <Text style={styles.manufacturer}>{vehicle?.manufacturer[1]}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("VehicleInformation", {vehicleToUpdate:vehicle})}>
                        <Text style={styles.edit}>{t("common.edit")}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{height: hp(40)}} />

            <View style={{flexDirection: 'row'}}>
                <View style={{alignItems: 'flex-start'}}>
                    <Text style={styles.key}>{t("vehicle.model")}</Text>
                    <Text style={styles.key}>{t("vehicle.year")}</Text>
                    <Text style={styles.key}>{t("vehicle.type")}</Text>
                    <Text style={styles.key}>{t("vehicle.numberPlate")}</Text>
                </View>

                <View style={{width: wp(20)}} />

                <View style={{alignItems: 'flex-start'}}>
                    <Text style={styles.value}>{vehicle?.vehicle_model[1]}</Text>
                    <Text style={styles.value}>{vehicle?.year_id[1]}</Text>
                    <Text style={styles.value}>{vehicle?.vehicle_variant[1]}</Text>
                    <Text style={styles.value}>{vehicle?.name}</Text>
                </View>
            </View>
        </CardWithShadow>
    );
};

const styles = StyleSheet.create({
    cardStyle: {
        width: wp(388),
        alignSelf: 'center',

        marginVertical: hp(10),
        paddingVertical: hp(20),
        marginHorizontal: wp(10),
        paddingHorizontal: wp(20),
    },
    manufacturerImage: {
        width: wp(48),
        height: hp(25),
        resizeMode: "contain",
    },
    manufacturerRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    manufacturer: {
        ...FontSize.rfs20,
        ...FontFamily.bold,
        color: Colors.BLACK,
    },
    edit: {
        ...FontSize.rfs18,
        ...FontFamily.bold,
        color: Colors.BLACK,
        textDecorationLine: "underline"
    },
    key: {
        ...FontSize.rfs14,
        ...FontFamily.bold,
        color: Colors.DARK_BLACK,
    },
    value: {
        ...FontSize.rfs14,
        ...FontFamily.bold,
        color: Colors.LIGHTGREY,
    }
});

export default VehicleCard;
