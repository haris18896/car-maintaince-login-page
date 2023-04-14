import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../Constants/Colors";
import Fonts from "../../../Constants/fonts";
import { hp, wp } from "../../../utils/responsiveSizes";
import Utilities from "../../../utils/UtilityMethods";
import FontSize from "../../../Constants/FontSize";

// create a component
const TabBarOrder = ({ active, setActive }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setActive(1)}
        disabled={active == 1}
        style={[
          active == 1 ? styles.leftActive : styles.leftButton,
          {
            borderColor:
              active == 1
                ? Colors.DARKERGREEN
                : active == 3
                ? Colors.RED
                : active == 2
                ? "orange"
                : "",
          },
        ]}
      >
        <Text
          style={[
            active == 1 ? styles.textActiveComplete : styles.text,
            {
              borderColor:
                active == 1
                  ? Colors.DARKERGREEN
                  : active == 3
                  ? Colors.RED
                  : active == 2
                  ? "orange"
                  : "",
            },
          ]}
        >
          {t("order_history.Completed")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActive(2)}
        disabled={active == 2}
        style={[
          active == 2 ? styles.centerButtonActive : styles.centerButton,
          {
            borderColor:
              active == 1
                ? Colors.DARKERGREEN
                : active == 3
                ? Colors.RED
                : active == 2
                ? "orange"
                : "",
          },
        ]}
      >
        <Text style={active == 2 ? styles.textActive : styles.text}>
          {t("order_history.Incompleted")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActive(3)}
        disabled={active == 3}
        style={[
          active == 3 ? styles.rightButtonActive : styles.rightButton,
          {
            borderColor:
              active == 1
                ? Colors.DARKERGREEN
                : active == 3
                ? Colors.RED
                : active == 2
                ? "orange"
                : "",
          },
        ]}
      >
        <Text style={active == 3 ? styles.textActiveAccept : styles.text}>
          {t("order_history.Accepted")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: Utilities.hp(6),
    flexDirection: "row",
    marginTop: 7,
  },
  leftButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: "33%",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1.5,
  },
  leftActive: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: "33%",
    borderBottomColor: Colors.DARKERGREEN,
    borderBottomWidth: 5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  rightButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: "33%",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1.5,
    borderColor: Colors.ORANGE,
  },
  rightButtonActive: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: "33%",
    borderBottomColor: Colors.RED,
    borderBottomWidth: 5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  centerButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: "33%",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1.5,
    borderColor: Colors.ORANGE,
  },
  centerButtonActive: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: "33%",

    borderBottomColor: Colors.ORANGE,
    borderBottomWidth: 5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  text: {
    fontFamily: Fonts.LexendMedium,
    textAlign: "left",
    ...FontSize.rfs16,
    color: "#B8B9C1",
  },
  textActive: {
    fontFamily: Fonts.LexendMedium,
    textAlign: "left",
    ...FontSize.rfs16,
    color: Colors.ORANGE,
  },
  textActiveComplete: {
    fontFamily: Fonts.LexendMedium,
    textAlign: "left",
    ...FontSize.rfs16,
    color: Colors.DARKERGREEN,
  },
  textActiveAccept: {
    fontFamily: Fonts.LexendMedium,
    textAlign: "left",
    ...FontSize.rfs16,
    color: Colors.RED,
  },
});

//make this component available to the app
export default TabBarOrder;
