import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../Constants/Colors";
import Fonts from "../../../Constants/fonts";
import { hp, wp } from "../../../utils/responsiveSizes";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import FontSize from "../../../Constants/FontSize";

const OrderCard = ({ order, active }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  console.log('Order ====>> ', order);

  const onPressOrder = () => {
    navigation.navigate("OrderDetails", {order, branch_id:order.service_provider[0] });
  }

  return (
    <TouchableOpacity onPress={onPressOrder}
      style={[styles.container, {borderLeftColor: active === 1 ? Colors.DARKERGREEN : active === 2 ? Colors.ORANGE : Colors.RED}]}>
      <View style={styles.paddedContent}>
        <View style={styles.row}>
          <Text style={styles.mainHeading}>{order?.service_provider[1]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>{t("order_history.Order #")}</Text>
          <Text style={styles.value}>{order?.sequence_no}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>{t("order_history.Payment Method")}</Text>
          <Text style={styles.value}>{order?.payment_method}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>{t("Order Amount")}</Text>
          <Text style={styles.value}>{t("common.SAR")} {order?.sub_total}</Text>
        </View>
        {/*<TouchableOpacity style={styles.row} onPress={onPressOrder}>*/}
        {/*  <Text style={styles.leftTitle}>{t("View Order")}</Text>*/}
        {/*  <Text style={styles.viewlist}> {"View"}</Text>*/}
        {/*</TouchableOpacity>*/}
        <View style={styles.row}>
          <Text style={[styles.status, {color: active === 1 ? Colors.DARKERGREEN : active === 2 ? Colors.ORANGE : Colors.RED,}]}>
            {order?.status === "draft" ||
            order?.status === "order_placed" ||
            order?.status === "order_accepted" ? "Incomplete" : order?.status}
          </Text>
          <Text style={styles.date}>{moment(order?.date).format("DD/MM/YYYY")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.BLUE,
    height: hp(40),
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 14,
  },
  container: {
    backgroundColor: Colors.BOX_GRAY,
    marginTop: hp(15),
    width: wp(400),
    borderLeftWidth: 18,
    borderRadius: 10,

    shadowColor: Colors.GREY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    color: Colors.BLACK,
    ...FontSize.rfs14,
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
  },
  paddedContent: {
    paddingHorizontal: wp(20),
    paddingVertical: wp(25),
  },
  mainHeading: {
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
    ...FontSize.rfs18,
    color: Colors.BLACK,
  },

  heading: {
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
    ...FontSize.rfs18,
    color: Colors.BLACK,
  },
  value: {
    fontFamily: Fonts.LexendMedium,
    textAlign: "left",
    ...FontSize.rfs14,
    color: "#B8B9C1",
  },
  status: {
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
    ...FontSize.rfs14,
    color: Colors.BLACK,
  },
  date: {
    fontFamily: Fonts.LexendRegular,
    textAlign: "left",
    ...FontSize.rfs14,
    color: "#B8B9C1",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(12),
  },
  leftTitle: {
    ...FontSize.rfs14,
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
    color: Colors.BLACK,
  },
  viewlist: {
    ...FontSize.rfs14,
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
    color: Colors.DARKERGREEN,
    textDecorationLine: "underline",
  },
});

export default OrderCard;
