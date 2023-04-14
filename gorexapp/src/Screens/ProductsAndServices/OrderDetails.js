//import liraries

import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { Basket, Cart } from "../../assets";
import BoxLayout from "../../Components/BoxLayout";
import BackHeader from "../../Components/Header/BackHeader";
import {
  BLACK,
  BLACK_OPAC,
  BLUE,
  GREEN,
  GREY,
  LIGHT_GRAY,
  WHITE,
} from "../../constants/colors";
import {
  PoppinsMedium,
  SFProDisplayBold,
  SFProDisplayRegular,
  SFProDisplaySemiBold,
} from "../../constants/fonts";
import { hp, responsiveFontSize, wp } from "../../utils/responsiveSizes";
import BottomBar from "./ components/BottomBar";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderStatus, orderDetails } from "../../store/actions/order";
import Loader from "../../Components/Loader";
import { showToast } from "../../utils/common";
import { useTranslation } from "react-i18next";

// create a component
const OrderDetails = ({ route }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [order, setOrder] = useState(null);
  const [time, setTime] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setOrder(route?.params?.order);
    setLoading(false);
  }, [reload, route]);

  useEffect(() => {
    if (order?.status === "accepted") {
      var countDownDate = moment().add(25, "minutes");
      let total_diff = countDownDate.diff(moment());

      var x = setInterval(function () {
        let diff = countDownDate.diff(moment());
        const _progress =
          (moment.duration(diff).asSeconds() /
            moment.duration(total_diff).asSeconds()) *
          100;
        setProgress(100 - _progress);

        if (diff <= 0) {
          clearInterval(x);
        } else setTime(moment.utc(diff).format("mm:ss"));
      }, 1000);
    }
  }, [order]);
  // console.log("order ======>", order);
  const buttonPressed = (status) => {
    setLoading(true);
    dispatch(changeOrderStatus({ id: order?._id, status })).then((res) => {
      setLoading(false);
      console.log(res);
      if (!res?.payload?.error) {
        setOrder(res?.payload?.data);
        if (res?.payload?.data?.status === "cancelled") {
          navigation.navigate("Scan");
        } else if (res?.payload?.data?.status === "completed") {
          navigation.navigate("Congratulations");
        }
        // setReload(!reload);
      }
    });
  };

  return (
    <View style={styles.container}>
      {order ? (
        <>
          <BackHeader
            rightIcon={Cart}
            title={order?.branch?.title || "Auto Master"}
          />
          <ScrollView
            style={styles.paddedContent}
            contentContainerStyle={styles.contentContainer}
          >
            {order?.status === "accepted" && (
              <View style={styles.timerContainer}>
                <View>
                  <AnimatedCircularProgress
                    size={170}
                    width={15}
                    fill={progress}
                    rotation={0}
                    tintColor={BLUE}
                    // onAnimationComplete={(res) =>
                    // }
                    backgroundColor={LIGHT_GRAY}
                  />
                  <Text style={styles.time}>{time}</Text>
                </View>
              </View>
            )}
            <BoxLayout title={t("order.Job Order")}>
              <View style={styles.row}>
                <Text style={styles.leftTitle}>{t("order.Job Order #")}</Text>
                <Text style={styles.rightValue}>{order?.order_id}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftTitle}>{t("order.Time & Date")}</Text>
                <Text style={styles.rightValue}>
                  {moment(order?.created_at).format("D/MM/YYYY")}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftTitle}>{t("order.Order Status")}</Text>
                <Text style={styles.rightValue}>
                  {order?.status || "Incomplete"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftTitle}>
                  {t("order.Payment Method")}
                </Text>
                <Text style={styles.rightValue}>
                  {" "}
                  {order?.payment_method || "Cash"}
                </Text>
              </View>
              <Text style={styles.centerTitle}>
                {t("order.Vehicles Details")}
              </Text>

              <View style={styles.rowContent}>
                <View style={styles.subView}>
                  <Text style={styles.subTitle}>{t("order.Brand")}</Text>
                  <Text style={styles.subValue}>
                    {order?.vehicle?.model || "Corolla"}
                  </Text>
                </View>
                <View style={styles.subView}>
                  <Text style={styles.subTitle}>{t("order.Type")}</Text>
                  <Text style={styles.subValue}>
                    {order?.vehicle?.type || "Suv"}
                  </Text>
                </View>
              </View>
              <View style={styles.rowContent}>
                <View style={styles.subView}>
                  <Text style={styles.subTitle}>{t("order.Year")}</Text>
                  <Text style={styles.subValue}>
                    {" "}
                    {order?.vehicle?.model || "2021"}
                  </Text>
                </View>
                <View style={styles.subView}>
                  <Text style={styles.subTitle}>{t("order.Number Plate")}</Text>
                  <Text style={styles.subValue}>
                    {" "}
                    {order?.vehicle?.plate_number || "UY90009876"}
                  </Text>
                </View>
              </View>
            </BoxLayout>
            <BoxLayout title={t("order.Service Provider Details")}>
              <View style={styles.row}>
                <Text style={styles.leftTitle}>{t("order.Name")}</Text>
                <Text style={styles.rightValue}>
                  {order?.service_provider?.profile?.name || "Auto Master"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftTitle}>{t("order.City")}</Text>
                <Text style={styles.rightValue}>
                  {" "}
                  {order?.branch?.city || "Lahore"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.leftTitle}>{t("order.Location")}</Text>
                <Text style={styles.rightValue}>
                  {" "}
                  {order?.branch?.district || "Shop #20"}
                </Text>
              </View>
            </BoxLayout>
            <BoxLayout title={t("order.Order Details")}>
              {order?.items == null ? null : (
                <Text style={styles.heading}>{t("Products")}</Text>
              )}
              <FlatList
                data={order?.items}
                renderItem={({ item }) => (
                  <View style={styles.rowContainer}>
                    <Text style={styles.title}>
                      {item?.item} X {item?.quantity}
                    </Text>
                    <View style={styles.rightView}>
                      <Text style={styles.price}>
                        {item?.quantity * item?.unit_price} SAR
                      </Text>
                    </View>
                  </View>
                )}
              />
              {order?.services == null ? null : (
                <Text style={styles.heading}>{t("order.Services")}</Text>
              )}
              <FlatList
                data={order?.services}
                renderItem={({ item }) => (
                  <View style={styles.rowContainer}>
                    <Text style={styles.title}>{item?.service}</Text>
                    <View style={styles.rightView}>
                      <Text style={styles.price}>
                        {item?.quantity * item?.unit_price} SAR
                      </Text>
                    </View>
                  </View>
                )}
              />
            </BoxLayout>
          </ScrollView>
          <BottomBar
            onPress={() =>
              buttonPressed(
                order?.status === "accepted" ? "completed" : "accepted",
                order?._id
              )
            }
            onCancelPress={() => buttonPressed("cancelled")}
            showButton={order?.status !== "completed"}
            btnTitle={
              order?.status === "accepted"
                ? t("scan.Complete Order")
                : t("scan.Accept Order")
            }
            cancelBtnTitle={"Cancel Order"}
            total={order?.total_price}
            vat={order?.vat}
            order={order?.id}
          />
        </>
      ) : null}
      <Loader visible={loading} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  paddedContent: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: wp(14),
  },
  heading: {
    fontSize: responsiveFontSize(16),
    textAlign: "left",
    fontFamily: SFProDisplayBold,
    color: BLACK,
    marginBottom: hp(11),
  },
  title: {
    fontSize: responsiveFontSize(16),
    textAlign: "left",
    fontFamily: SFProDisplayRegular,
    color: BLACK,
    marginBottom: hp(11),
  },
  rowContainer: {
    marginLeft: wp(18),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: responsiveFontSize(16),
    textAlign: "left",
    fontFamily: SFProDisplayRegular,
    color: GREEN,
    marginRight: wp(18),
  },
  rightView: {
    flexDirection: "row",
    alignItems: "center",
  },
  barcodeContainer: {
    marginTop: hp(25),
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  leftTitle: {
    fontSize: responsiveFontSize(16),
    textAlign: "left",
    fontFamily: SFProDisplayBold,
    color: BLACK,
  },
  rightValue: {
    fontSize: responsiveFontSize(16),
    textAlign: "left",
    fontFamily: SFProDisplayBold,
    color: GREEN,
  },
  centerTitle: {
    fontSize: responsiveFontSize(16),
    textAlign: "left",
    fontFamily: SFProDisplayBold,
    color: BLACK,
    textAlign: "center",
    marginTop: 8,
    marginBottom: hp(15),
  },
  subView: {
    flexDirection: "row",
  },
  subTitle: {
    fontSize: responsiveFontSize(12),
    textAlign: "left",
    fontFamily: SFProDisplaySemiBold,
    color: BLACK,
    marginRight: wp(20),
  },
  subValue: {
    fontSize: responsiveFontSize(11),
    textAlign: "left",
    fontFamily: SFProDisplaySemiBold,
    color: BLACK_OPAC,
    marginRight: wp(20),
  },
  rowContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(10),
  },
  time: {
    fontSize: responsiveFontSize(46),
    textAlign: "left",
    fontFamily: PoppinsMedium,
    position: "absolute",
    top: wp(55),
    left: wp(33),
  },
  timerContainer: {
    marginVertical: wp(50),

    justifyContent: "center",
    alignItems: "center",
  },
});

//make this component available to the app
export default OrderDetails;
