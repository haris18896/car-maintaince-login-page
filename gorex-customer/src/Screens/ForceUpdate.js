import React, { useState, useEffect, useContext } from "react";
import { Image, Linking, Platform, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Fonts from "../Constants/fonts";
import Colors from "../Constants/Colors";
import Utilities from "../utils/UtilityMethods";
import FontSize from "../Constants/FontSize";

import { useTranslation } from "react-i18next";

import { Update } from "../assets";
import Footer from "./ProductsAndServices/components/Footer";
import { hp } from "../utils/responsiveSizes";

const ForceUpdate = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.paymentContainer}>
        <Image
          source={Update}
          style={{
            resizeMode: "contain",
            width: Utilities.wp(40),
            marginBottom: Utilities.hp(2),
            marginLeft: Utilities.wp(2),
          }}
        />
        <Text style={styles.title}>Please Update Gorex.</Text>
        <Text style={styles.description}>
          {
            "This version of app is no\n longer supported, please install\nthe latest version."
          }
        </Text>
      </View>

      <View style={{ justifyContent: "flex-end", height: hp(310) }}>
        <Footer
          containerStyle={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          title={"Update App"}
          onPress={() => {
            if (Platform.OS === "ios") {
              Linking.openURL(
                "https://apps.apple.com/us/app/gorex-customer/id1633313842"
              );
            } else {
              // Android Link
              Linking.openURL(
                "https://play.google.com/store/apps/details?id=com.gorexcustomer"
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export { ForceUpdate };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  paymentContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
