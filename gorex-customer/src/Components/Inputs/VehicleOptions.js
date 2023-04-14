import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import RBSheet from "react-native-raw-bottom-sheet";

import { Mark } from "../../assets";
import Fonts from "../../Constants/fonts";
import Colors from "../../Constants/Colors";
import FontSize from "../../Constants/FontSize";
import Utilities from "../../utils/UtilityMethods";
import { hp, wp } from "../../utils/responsiveSizes";
import { RoundedSquareFullButton } from "../../Components";

const VehicleOptions = ({
  visible,
  options,
  selectOption,
  selectedValue,
  xmlName,
  onPress,
  children,
  onClose = new Function(),
  title = "",
}) => {
  const { t } = useTranslation();
  let refRBSheet = useRef();

  useEffect(() => {
    if (visible) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [visible]);

  return (
    <RBSheet
      height={Utilities.hp(90)}
      ref={refRBSheet}
      closeOnDragDown={true}
      animationType={"slide"}
      onClose={onClose}
      customStyles={{
        wrapper: {
        },
        container: {
          paddingHorizontal: wp(20),
          borderTopLeftRadius: hp(20),
          borderTopRightRadius: hp(20),
        },
        draggableIcon: {
          backgroundColor: "#000",
        },
      }}
    >
      <TouchableOpacity
        onPress={() => {
          refRBSheet.current.close();
        }}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 999,
        }}
      >
        <Text
          style={{
            color: Colors.BLACK,
            fontFamily: Fonts.LexendMedium,
            ...FontSize.rfs18,
          }}
        >
          {t("vehicle.cancel")}
        </Text>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Utilities.wp(8) }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        ></View>
        {options?.map((item, index) => {
          return (
            <TouchableOpacity
              style={[styles.option]}
              key={index}
              onPress={() => selectOption(xmlName, item)}
            >
              <Text style={styles.disabledText}>
                {index === 0 ? title : ""}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={styles.text}>{item?.label}</Text>
                <Image
                  style={{
                    width: Utilities.wp(4.2),
                    resizeMode: "contain",
                    tintColor:
                      item.value === selectedValue
                        ? Colors.DARKERGREEN
                        : Colors.GREY,
                  }}
                  source={Mark}
                ></Image>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {children}
      <RoundedSquareFullButton title={t("vehicle.select")} onPress={onPress} />
      <View style={{height: hp(30)}} />
    </RBSheet>
  );
};

VehicleOptions.propTypes = {
  visible: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  option: {
    height: Utilities.hp(7),
    borderBottomWidth: 0.3,
    borderColor: Colors.GREY_PLACEHOLDER,
    justifyContent: "center",
    marginBottom: hp(10),
  },
  disabledText: {
    color: Colors.BLACK,
    fontFamily: Fonts.LexendBold,
    ...FontSize.rfs18,
    textAlign: "left",
  },
  text: {
    color: Colors.BLACK,
    fontFamily: Fonts.LexendMedium,
    ...FontSize.rfs14,
    textAlign: "left",
  },
  header: {
    width: "30%",
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.GREY,
  },
  btn: {
    alignItems: "center",
    backgroundColor: Colors.DARKERGREEN,
    borderRadius: 5,
    height: hp(60),
    marginBottom: 10,
    justifyContent: "center",
    width: wp(330),
    alignSelf: "center",
  },
  title: {
    color: Colors.WHITE,
    fontFamily: Fonts.LexendBold,

    textAlign: "left",
    ...FontSize.rfs16,
  },
});

export default VehicleOptions;
