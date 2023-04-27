import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import { useTranslation } from "react-i18next";

import Colors from "../Constants/Colors";
import Fonts from "../Constants/fonts";
import { hp, wp } from "../utils/responsiveSizes";
import FontSize from "../Constants/FontSize";

function NoOrder() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        transitionDuration={1000}
        // source={NoVehicle}
        style={styles.item}
      />
      <Text style={styles.text}>{t("order_history.noorder")}</Text>
      <Text style={styles.title}>{t("order_history.nocartorder")}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    // alignSelf: "center",
    justifyContent: "center",
  },
  item: {
    height: hp(160),
    resizeMode: "contain",
    width: wp(105),
    marginTop: hp(60),
  },
  text: {
    color: Colors.BLACK,
    fontFamily: Fonts.LexendMedium,
    textAlign: "center",
    ...FontSize.rfs24,
    marginTop: hp(5),
  },
  title: {
    color: "#B8B9C1",
    width: "70%",
    fontFamily: Fonts.LexendMedium,
    textAlign: "center",
    ...FontSize.rfs16,
    marginTop: hp(10),
  },
});
export default NoOrder;
