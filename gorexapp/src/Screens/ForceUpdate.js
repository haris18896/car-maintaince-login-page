import React, {useState, useEffect, useContext} from "react";
import {Image, Linking, Platform, StyleSheet, Text, View} from "react-native";
import { useNavigation } from "@react-navigation/native";


import Fonts from "../Constants/fonts";
import Colors from "../Constants/Colors";
import Utilities from "../utils/UtilityMethods";
import FontSize from "../Constants/FontSize";

import { useTranslation } from "react-i18next";

import {Update} from "../assets";
import Footer from "./ProductsAndServices/components/Footer";
import {hp, wp} from "../utils/responsiveSizes";

const ForceUpdate = () => {

    const { t } = useTranslation();


    return (
        <View style={styles.container}>


            <View style={styles.paymentContainer}>
                <View style={{height:'70%', justifyContent:'center'}}>
                    <Image source={Update} style={{resizeMode: "contain", width: wp(200), height:hp(200)}}/>
                </View>
                <View style={{height:'20%'}}>
                    <Text style={styles.title}>Please Update Gorex.</Text>
                    <Text style={styles.description}>{'This version of app is no\n longer supported, please install\nthe latest version.'}</Text>
                </View>
            </View>

            <View style={{flex:0.3, justifyContent:"flex-end"}}>

            <Footer
                title={'Update App'}
                onPress={() => {
                    if (Platform.OS === 'ios'){
                        Linking.openURL('https://apps.apple.com/us/app/gorex-customer/id1633313842')
                    }else {
                        // Android Link
                        Linking.openURL('https://play.google.com/store/apps/details?id=com.gorexcustomer')
                    }
                }}
            />

            </View>


        </View>
    );
}

export { ForceUpdate };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },


    paymentContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 0.7
    },

    title: {
        fontFamily: Fonts.LexendBold,
        ...FontSize.rfs30,
        color: Colors.BLACK,
        fontWeight: "bold",
    },

    description: {
        fontFamily: Fonts.LexendRegular,
        ...FontSize.rfs18,
        color: Colors.GREY_TEXT,
        textAlign: "center",
        marginTop: Utilities.hp(1),
    },
});
