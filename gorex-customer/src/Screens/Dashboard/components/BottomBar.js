import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useTranslation } from "react-i18next";
import LinearGradient from "react-native-linear-gradient";

import Fonts from "../../../Constants/fonts";
import Colors from "../../../Constants/Colors";
import { Linear } from "../../../Constants/Linear";
import FontSize from "../../../Constants/FontSize";
import Utilities from "../../../utils/UtilityMethods";
import FontFamily from "../../../Constants/FontFamily";
import { hp, wp } from "../../../utils/responsiveSizes";
import { Services, GreenGorexIcon } from "../../../assets";

const BottomBar = ({serviceCategories, filterChanged, resetFilter, setResetFilter, navigateToGoD}) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(1);

  useEffect(() => {
    setActive(null);
  }, [resetFilter]);

  if (!serviceCategories?.length) {
    return null;
  }

  const onPressRowItem = (item) => {
    if (item?.id === "GoD") {
      navigateToGoD();
    } else if (active === item?.id) {
      setActive(-1);
      setResetFilter(!resetFilter);
      filterChanged();
    } else {
      setActive(item?.id);
      filterChanged(item?.id);
    }
  }

  const returnRowItem = (item) => {
    return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button(active === item?.id)} onPress={() => {onPressRowItem(item)}}>
            <Image style={styles.serviceCategoryIcon} source={item?.id === "GoD" ? GreenGorexIcon : Services} />
            <View style={styles.titleContainer(active === item?.id)}>
              <Text style={styles.buttonText(active === item?.id)} numberOfLines={1}>{item?.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
    )
  }

  return (
      <LinearGradient
          colors={
            !Utilities.isIosDevice()
                ? [
                  "rgba(0,0,0,0.1)",
                  "rgba(0,0,0,0.2)",
                  "rgba(0,0,0,0.3)",
                  "rgba(0,0,0,0.4)",
                  "rgba(0,0,0,0.5)",
                  "rgba(0,0,0,0.6)",
                  "rgba(0,0,0,0.7)",
                  "rgba(0,0,0,0.8)",
                  "rgba(0,0,0,0.9)",
                  "rgba(0,0,0,1)",
                ]
                : Linear
                    ? Linear
                    : []
          }
          style={styles.container}
      >
        <Text style={styles.heading}> {t("dashboard.near")}</Text>
        <FlatList horizontal
            data={serviceCategories}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (returnRowItem(item))}
        />
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: Utilities.wp(4),
    paddingBottom: Utilities.wp(7),
  },
  buttonContainer: {
    marginRight: wp(16),
  },
  button: (active) => {
    return {
      width: wp(171),
      height: hp(139),
      paddingTop: hp(20),
      borderRadius: wp(10),
      justifyContent: 'space-between',

      borderWidth: active ? hp(1) : 0,
      backgroundColor: active ? "transparent" : Colors.WHITE,
      borderColor: active ? Colors.DARKERGREEN : Colors.BORDER_GRAYLIGHTEST,
    }
  },
  titleContainer: (active) => {
    return {
      height: hp(63),
      borderRadius: hp(10),
      paddingHorizontal: wp(20),
      paddingTop: active ? hp(13) : 0,
      backgroundColor: active ? Colors.DARKERGREEN : "transparent",
    }
  },
  buttonText: (active) => {
    return {
      ...FontSize.rfs14,
      ...FontFamily.medium,
      color: active ? Colors.WHITE : Colors.BLACK,
      alignSelf: 'flex-start',
    }
  },
  heading: {
    ...FontSize.rfs18,
    fontFamily: Fonts.LexendSemiBold,
    textAlign: "left",
    color: Colors.WHITE,
    marginBottom: Utilities.wp(3.5),
  },
  serviceCategoryIcon: {
    width: wp(32),
    height: wp(32),
    marginStart: hp(20),
    marginBottom: hp(20),
    resizeMode: "contain",
  }
});

export default BottomBar;
