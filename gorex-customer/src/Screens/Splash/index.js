import React, { useContext, useEffect } from "react";
import { View, Platform, ImageBackground } from "react-native";

import styles from "./styles";
import { SplashBg, AppLogo } from "../../assets";
import DeviceInfo from "react-native-device-info";
import { hp, wp } from "../../utils/responsiveSizes";
import { CommonContext } from "../../contexts/ContextProvider";
import { getAlreadyLaunched, getCart, getPartnerId } from "../../utils/common";
import { useTranslation } from "react-i18next";
import { GetProfile, GetUser } from "../../api/CallAPI";
import Response from "../../api/Response";

const Splash = ({ navigation }) => {
  const { setPartnerId, setUserProfile, setInCartOrder } =
    useContext(CommonContext);
  const { i18n } = useTranslation();
  global.language = i18n.language;

  useEffect(() => {
    checkForAppUpdates().then(() => {});

    getCart().then((cart) => {
      setInCartOrder(cart);
    });

    getPartnerId().then((partnerId) => {
      console.log("Partner ID ===>> ", partnerId);
      if (partnerId) {
        GetUser({ userID: partnerId }).then(async (getUserResponse) => {
          console.log("Get User ====>> ", getUserResponse);
          if (getUserResponse?.success) {
            GetProfile({
              profileID: getUserResponse?.data[0]?.partner_id[0],
            }).then((getProfileResponse) => {
              console.log(
                "Splash Screen Profile Response ===>> ",
                getProfileResponse
              );
              if (
                getProfileResponse?.success &&
                getProfileResponse?.data.length > 0
              ) {
                setUserProfile(getProfileResponse?.data[0]);

                setTimeout(() => {
                  navigation.replace("Dashboard");
                }, 100);
              } else {
                gotoLoginOrSplashScreen();
              }
            });
          } else {
            gotoLoginOrSplashScreen();
          }
        });
      } else {
        gotoLoginOrSplashScreen();
      }
    });
  }, []);

  const gotoLoginOrSplashScreen = () => {
    getAlreadyLaunched().then((isLaunched) => {
      if (isLaunched) {
        navigation.replace("Login");
      } else {
        navigation.replace("Onboarding");
      }
    });
  };

  const checkForAppUpdates = async () => {
    const currentAppVersion = DeviceInfo.getVersion();
    showAsyncStorageContentInDev()

    let APP_STORE_ID = "1633313842";
    let PLAY_STORE_ID = "com.gorexcustomer";

    // if (Platform.OS === 'ios') {
    //     const appStoreUrl = `https://itunes.apple.com/lookup?id=${APP_STORE_ID}`;
    //     try {
    //         const response = await fetch(appStoreUrl);
    //         const data = await response.json();
    //         const latestVersion = data.results[0].version;
    //         // Compare latestVersion with the current app version on the device and show an alert if an update is available
    //
    //         if (latestVersion !== currentAppVersion){
    //            navigation.navigate('ForceUpdate');
    //         }
    //
    //
    //     } catch (error) {
    //         console.log('Error fetching App Store data', error);
    //     }
    // } else if (Platform.OS === 'android') {
    //     const playStoreUrl = `https://play.google.com/store/apps/details?id=${PLAY_STORE_ID}&hl=en`;
    //     try {
    //         const response = await fetch(playStoreUrl);
    //         const text = await response.text();
    //         const versionIndex = text.indexOf('Current Version');
    //         const latestVersion = text.substring(versionIndex + 18, versionIndex + 23).trim();
    //         if (latestVersion !== currentAppVersion){
    //             navigation.navigate('ForceUpdate');
    //         }
    //     } catch (error) {
    //         console.log('Error fetching Google Play Store data', error);
    //     }
    // }
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground style={styles.backgroundImage} source={SplashBg} />
      <View style={styles.appLogo}>
        <AppLogo height={hp(50)} width={wp(200)} />
      </View>
    </View>
  );
};

export { Splash };
