import React, {useState, useEffect, useContext} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import BackHeader from "../../Components/Header/BackHeader";
import { hp, wp } from "../../utils/responsiveSizes";
import Colors from "../../Constants/Colors";

import Loader from "../../Components/Loader";
import { useNavigation } from "@react-navigation/native";
import { showToast } from "../../utils/common";
import Fonts from "../../Constants/fonts";
import FontSize from "../../Constants/FontSize";
import Utilities from "../../utils/UtilityMethods";
import WebView from "react-native-webview";
import { useTranslation } from "react-i18next";
import AddCardCustomer from "../../api/AddCardCustomer";
import {CommonContext} from "../../contexts/ContextProvider";
import {CardSuccess, NoTopUpCard} from "../../assets";
import Footer from "../ProductsAndServices/components/Footer";

export default function AddCard({ route }) {
  const {userProfile} = useContext(CommonContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [webViewURL, setWebViewURL] = React.useState("");
  const [status, setStatus] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    AddCardCustomer(userProfile?.id).then(({ success, response }) => {
      setLoading(false);
      if (success) {
        setWebViewURL(response);
      } else {
        showToast("Error", response, "error");
      }
    });
  }, []);

  const showWebView = () =>{
    return (
        <WebView
            onShouldStartLoadWithRequest={(request) => true}
            javaScriptEnabled
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            originWhitelist={["*"]}
            useWebKit
            startInLoadingState
            scalesPageToFit
            source={{uri: webViewURL}}
            style={{ marginTop: 20 }}
            onNavigationStateChange={(state) => {
              if (state?.url?.includes("Result=Failure")) {
                setStatus('failed');
              } else if(state?.url?.includes("Result=Success")) {
                setStatus('success');
              }


            }}

        />
    )
  }

  const showFailedImage = () =>{
    return (
        <View style={styles.paymentContainer}>
          <Image source={NoTopUpCard} style={{resizeMode: "contain", width: Utilities.wp(40), marginBottom: Utilities.hp(2), marginLeft: Utilities.wp(2),}}/>
          <Text style={styles.title}>Failed!</Text>
          <Text style={styles.description}>{`Your card can not be added at this time.\nPlease try again`}</Text>
        </View>
    )
  }

  const showSuccessImage = () =>{
    return (
        <>
          <View style={styles.paymentContainer}>
            <Image source={CardSuccess} style={{resizeMode: "contain", width: Utilities.wp(40), marginBottom: Utilities.hp(2), marginLeft: Utilities.wp(2),}}/>
            <Text style={styles.title}>Success!</Text>
            <Text style={styles.description}>{'You have successfully added a\nnew credit card.'}</Text>
          </View>

          <Footer
              containerStyle={{position: "absolute", bottom: 0, left: 0, right: 0,}}
              title={t("common.done")}
              onPress={() => navigation.goBack()}
          />
        </>
    )
  }

  return (
      <View style={styles.container}>
        <BackHeader title={t("creditcard.add")} />

        {!loading && status === ''  && showWebView()}
        {status === 'failed' && showFailedImage()}
        {status === 'success' && showSuccessImage()}
        <Loader visible={loading} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  dateAndCode: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    marginTop: hp(13),
    paddingHorizontal: wp(22),
  },
  cardNumber: {
    marginTop: 10,
    height: 40,
    color: Colors.BLACK,
    backgroundColor: "#F2F2F2",
    borderRadius: 23,
    borderWidth: 2,
    ...FontSize.rfs14,
    fontFamily: Fonts.LexendRegular,
    borderColor: "#F2F2F2",
  },
  expiryDate: {
    paddingVertical: Utilities.hp(1.5),
    marginTop: Utilities.hp(1),
    color: Colors.BLACK,
    backgroundColor: "#F2F2F2",
    borderColor: "#F2F2F2",
    borderRadius: 23,
    width: "100%",
    ...FontSize.rfs14,
    fontFamily: Fonts.LexendRegular,
  },
  cvv: {
    paddingVertical: Utilities.hp(1.5),
    marginTop: Utilities.hp(1),
    color: Colors.BLACK,
    backgroundColor: "#F2F2F2",
    borderColor: "#F2F2F2",
    borderRadius: 23,
    width: "100%",
    ...FontSize.rfs14,
    fontFamily: Fonts.LexendRegular,
  },

  buttonContainer: {
    alignItems: "center",
    backgroundColor: Colors.DARKERGREEN,
    borderRadius: hp(100),
    height: hp(56),
    justifyContent: "center",
    width: wp(330),
    alignSelf: "center",
    marginTop: hp(20),
  },

  placeholder: {
    marginTop: 15,
    fontFamily: Fonts.LexendMedium,
    color: "black",
    ...FontSize.rfs14,
  },
  placeholdercvv: {
    marginTop: 15,
    fontFamily: Fonts.LexendMedium,
    color: "black",
    ...FontSize.rfs14,
  },
  placeholderexpcvv: {
    backgroundColor: Colors.RED,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    marginTop: 10,
    width: wp(330),
    height: 40,
    borderWidth: 2.0,
    borderRadius: 23,
    borderColor: "#F2F2F2",
    backgroundColor: "#F2F2F2",
    fontFamily: Fonts.LexendRegular,
  },
  inputStyle: {
    marginLeft: 10,
    marginTop: 7,
    ...FontSize.rfs14,
    color: "black",
    fontFamily: Fonts.LexendRegular,
  },
  errorMessage: {
    color: "black",
    paddingTop: 2,
    ...FontSize.rfs12,
  },

  paymentContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    marginBottom: Utilities.hp(10),
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
