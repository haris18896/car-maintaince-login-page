import React, {useContext, useEffect} from "react";
import { View, Platform, ImageBackground } from "react-native";


import styles from "./styles";
import { SplashBg, AppLogo } from "../../assets";
import DeviceInfo from 'react-native-device-info';
import { hp, wp } from "../../utils/responsiveSizes";
import {CommonContext} from "../../contexts/ContextProvider";
import {getAlreadyLaunched, getCart, getPartnerId,} from "../../utils/common";
import {useTranslation} from "react-i18next";
import {GetProfile, GetUser} from "../../api/CallAPI";
import checkVersion from "react-native-store-version";
import ChangeLanguage from "../../api/ChangeLanguage";


const Splash = ({ navigation }) => {
    const {setPartnerId, setUserProfile, setInCartOrder} = useContext(CommonContext);
    const {i18n } = useTranslation();
    global.language = i18n.language;

    useEffect(() => {

        checkForAppUpdates().then(()=>{});


        getCart().then((cart)=>{
            setInCartOrder(cart);
        })


        getPartnerId().then((partnerId)=>{
            console.log('Partner ID ===>> ', partnerId);
            if (partnerId){
                GetUser({ userID: partnerId }).then(async (getUserResponse) => {
                    console.log('Get User ====>> ', getUserResponse);
                    if (getUserResponse?.success) {
                        GetProfile({ profileID: getUserResponse?.data[0]?.partner_id[0] }).then((getProfileResponse) => {
                            if (getProfileResponse?.success && getProfileResponse?.data.length>0) {
                                setPartnerId(partnerId);
                                setUserProfile(getProfileResponse?.data[0]);
                                ChangeLanguage(getProfileResponse?.data[0].id).then((response)=>{
                                    console.log('Language ===>> ', response);
                                });

                                setTimeout(()=>{
                                    navigation.replace("Dashboard");
                                },100);


                            }else {
                                gotoLoginOrSplashScreen();
                            }
                        });
                    } else {
                        gotoLoginOrSplashScreen();
                    }
                });
            }else {
                gotoLoginOrSplashScreen();
            }

        });

    }, []);

    const gotoLoginOrSplashScreen = () =>{
        getAlreadyLaunched().then((isLaunched)=>{
            if (isLaunched){
                navigation.replace("Login");
            }else {
                navigation.replace("Onboarding");
            }
        });
    }



    const checkForAppUpdates = async () => {

        const currentAppVersion = DeviceInfo.getVersion();

        let APP_STORE_ID    = '1633313842';
        let PLAY_STORE_ID   = 'com.gorexcustomer'
        const appStoreUrl   = `https://apps.apple.com/app/id${APP_STORE_ID}`;
        const playStoreUrl  = `https://play.google.com/store/apps/details?id=${PLAY_STORE_ID}&hl=en`;

        try {
            const check = await checkVersion({
                version: currentAppVersion,
                iosStoreURL: appStoreUrl,
                androidStoreURL: playStoreUrl,
                country: 'jp',
            });

            console.log('Result ==> ', check.result);

            if (check.result === 'new') {
                navigation.navigate('ForceUpdate');
            }
        } catch (e) {
            console.log(e);
        }
    };



    return (
        <View style={styles.mainContainer}>
            <ImageBackground style={styles.backgroundImage} source={SplashBg}/>
            <View style={styles.appLogo}>
                <AppLogo height={hp(50)} width={wp(200)} />
            </View>
        </View>
    );
};

export { Splash };
