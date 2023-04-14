import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./BarcodeScannerStyle";
import { RNCamera } from "react-native-camera";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { orderDetails } from "../../store/actions/order";
import { showToast } from "../../utils/common";
import Loader from "../../Components/Loader";

const BarcodeScanner = ({ navigation }) => {
  let [loading, setLoading] = React.useState(false);
  let dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  let barcodeScanned = (barcode) => {
    if (loading) return;
    if (barcode) {
      try {
        dispatch(orderDetails(barcode.data)).then((res) => {
          // console.log(JSON.stringify(res.payload, null, 2));
          // console.log(JSON.stringify(barcode.data, null, 2));
          setLoading(false);
          // console.log(user, res?.payload);
          if (
            !res?.payload?.error &&
            user?.created_by == res?.payload?.service_provider?._id
          ) {
            navigation.navigate("OrderDetails", {
              order: res?.payload,
            });
          } else {
            showToast("Error", "You are not allowed to process this order");
          }
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <View style={styles.container}>
      <RNCamera
        // ref={(ref) => {
        //   camera = ref;
        // }}
        style={styles.camera}
        captureAudio={false}
        onBarCodeRead={(barcode) => barcodeScanned(barcode)}
      />
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}> {t("scan.Scan QR here")}</Text>
      </View>
      <Loader visible={loading} />
    </View>
  );
};

export default BarcodeScanner;
