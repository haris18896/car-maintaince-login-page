import React, {useContext, useEffect, useState} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import fonts from "../../Constants/fonts";
import Colors from "../../Constants/Colors";

import Utilities from "../../utils/UtilityMethods";
import {CommonContext} from "../../contexts/ContextProvider";
import { hp, rfs, wp } from "../../utils/responsiveSizes";
import GeneralAPIWithEndPoint from "../../api/GeneralAPIWithEndPoint";
import {AppLogo, GoCoinIcon, GorexClubCard, GorexClubLogo, Gold, Silver, Diamond, Platinum,} from "../../assets";
import FontSize from "../../Constants/FontSize";
import FontFamily from "../../Constants/FontFamily";

const TopGorexClub = ({ title, leftIcon, children, leftPress }) => {

  const {partnerId, userProfile} = useContext(CommonContext);

  const { i18n } = useTranslation();
  const navigation = useNavigation();
  const isRTL = i18n.language === "ar";

  const [points, setPoints] = useState(null);

  useEffect(() => {
    getPoints().then();
  }, []);

  const getPoints = async () => {
    const body = {customer: partnerId};
    const pointsResponse = await GeneralAPIWithEndPoint("/all/points", body);
    setPoints(pointsResponse);
  };

  const getBadge = () => {
    if (!userProfile?.pakage) {
      return (<Image source={Silver} style={styles.badge} />);
    } else if (userProfile?.pakage.toLowerCase() === 'silver'){
      return (<Image source={Silver} style={styles.badge} />);
    }else if (userProfile?.pakage.toLowerCase() === 'gold'){
      return (<Image source={Gold} style={styles.badge} />);
    }else if (userProfile?.pakage.toLowerCase() === 'diamond'){
      return (<Image source={Diamond} style={styles.badge} />);
    }else if (userProfile?.pakage.toLowerCase() === 'platinum'){
      return (<Image source={Platinum} style={styles.badge} />);
    }
  };

  const getNextTier = () => {
    switch (userProfile?.pakage) {
      case "gold":
        return "Platinum";
      case "silver":
        return "Gold";
      case "platinum":
        return "Diamond";
      default:
        return "Silver";
    }
  };

  return (
    <View style={styles.fullContainer}>
      <View style={styles.root}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.menuButton} onPress={leftPress ? leftPress : () => navigation.goBack()}>
            <Image style={styles.logo} source={leftIcon} />
          </TouchableOpacity>
          {title ? (<Text style={styles.title}>{title}</Text>) : (<AppLogo height={hp(50)} width={wp(200)} />)}
          <View style={{ width: Utilities.wp(15), }} />
        </View>
        <ImageBackground source={GorexClubCard} resizeMode="stretch" style={styles.gorexClubCard}>
          <View style={styles.cardTopContainer}>
            <Image source={GorexClubLogo} style={styles.gorexClubLogo} resizeMode="contain"/>
            <LinearGradient colors={[Colors.BLUE, Colors.BLUE_O0]} style={styles.gorexCoinContainer}>
              <Image source={GoCoinIcon} style={styles.goCoinIcon} />
              <View style={styles.availableCoinsContainer}>
                <Text style={styles.availableGoCoins}>Available Go Coins</Text>
                <Text style={styles.availableCoins}>{points?.available_points}</Text>
              </View>
            </LinearGradient>
          </View>
          <Text style={styles.name}>{userProfile?.name ? userProfile?.name : "No Name"}</Text>
          <View style={[styles.cardBottomContainer, {justifyContent: userProfile?.pakage !== "diamond" ? "space-between" : "flex-end",},]}>
            {userProfile?.pakage !== "diamond" && (
              <View>
                <Text style={styles.coinsToNextTier}>{points?.remaining_points_for_next_tier} Go Coins to{" "}{getNextTier()} tier</Text>
                <View style={{ height: hp(9) }} />
                <View style={styles.progressBar}>
                  <View style={styles.progressBarFilled(`${(points?.available_points/points?.remaining_points_for_next_tier)*100}%`)} />
                </View>
              </View>
            )}
            <View style={styles.badgeContainer}>
              {getBadge()}
              <Text style={styles.badgeTitle}>{userProfile?.pakage ? userProfile?.pakage : "N/A"}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={{ height: 200, marginTop: 40 }} />
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gorexClubCard: {
    alignSelf: "center",
    borderRadius: hp(10),
    width: wp(388),
    height: hp(215),
    padding: wp(20),
    justifyContent: "space-between",
  },
  gorexClubLogo: {
    width: wp(132),
    height: hp(22),
  },
  goCoinIcon: {
    width: wp(35),
    height: wp(35),
  },
  gorexCoinContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
    borderRadius: hp(22),
  },
  progressBar: {
    width: wp(206),
    height: hp(4),
    borderRadius: hp(2),
    backgroundColor: Colors.WHITE,
  },
  // progressBarFilled: {
  //   width: '10%',
  //   height: hp(4),
  //   borderRadius: hp(2),
  //   backgroundColor: Colors.ORANGE,
  // },
  progressBarFilled: (progress) => {
    return {
      width: progress,
      height: hp(4),
      borderRadius: hp(2),
      backgroundColor: Colors.ORANGE,
    };
  },
  badgeContainer: {
    borderColor: Colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: hp(1),
    borderRadius: hp(4),
    height: hp(35),
  },
  badge: {
    marginEnd: wp(5),
    marginStart: wp(7),
    width: wp(27),
    height: wp(27),
  },
  cardTopContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  availableCoinsContainer: {
    marginEnd: wp(3),
    marginStart: wp(10),
  },
  availableGoCoins: {
    ...FontSize.rfs10,
    color: Colors.WHITE,
    fontFamily: fonts.LexendRegular,
  },
  availableCoins: {
    ...FontSize.rfs14,
    color: Colors.ORANGE,
    fontFamily: fonts.LexendMedium,
  },
  name: {
    ...FontSize.rfs20,
    color: Colors.WHITE,
    fontFamily: fonts.LexendMedium,
  },
  coinsToNextTier: {
    ...FontSize.rfs12,
    color: Colors.WHITE,
    fontFamily: fonts.LexendRegular,
  },
  badgeTitle: {
    marginEnd: wp(15),
    ...FontSize.rfs14,
    color: Colors.WHITE,
    fontFamily: fonts.LexendMedium,
  },
  cardBottomContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fullContainer: {
    height: hp(350),
    backgroundColor: Colors.WHITE,
  },
  root: {
    height: hp(226),
    backgroundColor: "#362380",
  },
  container: {
    justifyContent: "space-between",
    height: Utilities.hp(15),
    alignItems: "flex-end",
    paddingBottom:Utilities.hp(4),
    width: "100%",
    flexDirection: "row",
  },
  containerProfile: {
    justifyContent: "space-between",
    backgroundColor: Colors.BLUE,
    borderBottomLeftRadius: hp(20),
    borderBottomRightRadius: hp(20),
    height: hp(150),
    paddingTop: hp(20),
    flexDirection: "row",
    paddingHorizontal: 9,
  },
  arrow: {
    width: wp(15),
    height: wp(15),
  },
  logo: {
    width: Utilities.wp(7),
    height: hp(25),
    resizeMode: "contain",
  },
  menuButton: {
    width: Utilities.wp(15),
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    width: wp(60),
  },
  space: {
    marginLeft: wp(30),
  },
  title: {
    color: Colors.WHITE,
    fontFamily: fonts.LexendMedium,
    textAlign: "left",
    ...FontSize.rfs20,
  },
});

export default TopGorexClub;
