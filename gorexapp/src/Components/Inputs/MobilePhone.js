//import liraries
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  keyboard,
  Image,
  Keyboard,
} from "react-native";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { Down } from "../../assets";
import { BLACK, BLUE, GREY, RED } from "../../constants/colors";
import { SFProDisplayMedium } from "../../constants/fonts";
import { hp, responsiveFontSize, wp } from "../../utils/responsiveSizes";
import SelectOptions from "./SelectOptions";
import { useTranslation } from "react-i18next";
import { CountryPicker } from "react-native-country-codes-picker";

// create a component
const MobilePhone = ({
  title,
  secured = false,
  select,
  date,
  options,
  error,
  changeHandler,
  defaultValue,
  disabled,

  type,
  code,
  titleUp,
  dial_code,
}) => {
  const [text, setText] = useState("");
  const [showSelect, setShowSelect] = useState("");
  const [_date, setDate] = useState(new Date());
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [open, setOpen] = useState(false);
  const [keyboardheight, setKeyboardheight] = React.useState(0);
  const selectOption = (option) => {
    setShowSelect(false);
    changeHandler(option?.value);
    setText(option?.label);
  };

  useEffect(() => {
    if (defaultValue) setText(defaultValue);
  }, [defaultValue]);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardVisible(true); // or some other action
        setKeyboardheight(e.endCoordinates.height);
        console.log("keyboard SHOW", e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
        console.log("keyboard HIDE");
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View style={styles.container2}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{
            ...styles.selectInput,
            borderBottomColor: text == "" ? error && RED : BLUE,
          }}
        >
          <Text
            style={{
              fontSize:
                countryCode == ""
                  ? responsiveFontSize(12)
                  : responsiveFontSize(14),

              color: countryCode == "" ? GREY : "black",
              fontWeight: "400",
            }}
          >
            {countryCode == "" ? " +93" : countryCode}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (select) {
              setShowSelect(!showSelect);
            } else if (date) setOpen(true);
          }}
          disabled={(!select && !date) || disabled}
          style={
            type === "textarea" ? styles.textareaContainer : styles.container
          }
        >
          {type !== "textarea" && (
            <Text style={text ? styles.titleUp : styles.title}>
              {title}
              {text == "" ? (
                <Text style={{ color: text == "" ? error && RED : BLUE }}>
                  {"*"}
                </Text>
              ) : null}
            </Text>
          )}
          <TextInput
            value={text}
            multiline={type === "textarea"}
            onChangeText={(value) => {
              setText(value);
              changeHandler(countryCode + value);
            }}
            placeholder={type === "textarea" ? title : ""}
            style={[
              type === "textarea"
                ? styles.textarea
                : {
                    ...styles.selectInput2,
                    borderBottomColor: text == "" ? error && RED : BLUE,
                  },
              ,
              { textAlign: isRTL ? "right" : "left" },
            ]}
            editable={disabled ? false : true}
            secureTextEntry={secured}
            keyboardType={keyboard ? keyboard : "default"}
          />
        </TouchableOpacity>
        <CountryPicker
          show={show}
          onBackdropPress={() => setShow(false)}
          style={{
            // Styles for whole modal [View]
            modal: {
              height: isKeyboardVisible ? 250 : 400,

              backgroundColor: "white",
            },
            // Styles for modal backdrop [View]
            backdrop: {},
            // Styles for bottom input line [View]
            line: {},
            // Styles for list of countries [FlatList]
            itemsList: { backgroundColor: "white", color: BLACK, fontSize: 17 },
            // Styles for input [TextInput]
            textInput: {
              height: 40,
              width: 50,
              color: BLACK,
              backgroundColor: "white",
              borderRadius: 0,
            },
            // Styles for country button [TouchableOpacity]
            countryButtonStyles: {
              height: 40,
              width: 300,
              color: BLACK,
              backgroundColor: "transparent",
            },
            dialCode: { fontSize: 14, color: BLACK },
            countryName: { fontSize: 14, color: BLACK },
            // Styles for search message [Text]
          }}
          // containerStyle={styles.phoneContainer}
          // textContainerStyle={styles.textInput}
          // when picker button press you will get the country object with dial code
          pickerButtonOnPress={(item) => {
            setCountryCode(item?.dial_code);
            changeHandler(item?.dial_code + text);
            setShow(false);
          }}
        />
      </View>
      {/* {error && (
        <View>
          <Text
            style={{
              color: BLUE,
              marginTop: -10,
              fontSize: responsiveFontSize(12),
            }}
          >
            Field is Required!
          </Text>
        </View>
      )} */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: hp(45),
    flexDirection: "row",
    // width: "100%",

    justifyContent: "space-between",
    marginBottom: hp(10),
  },
  container2: {
    height: hp(45),
    // flexDirection: "row",
    // width: "100%",

    justifyContent: "space-between",
    marginBottom: hp(10),
  },
  textareaContainer: {
    height: hp(174),
    marginBottom: hp(10),
  },
  title: {
    position: "absolute",
    bottom: hp(4),
    fontSize: responsiveFontSize(12),
    color: GREY,
    fontFamily: SFProDisplayMedium,
    textAlign: "left",
  },
  titleUp: {
    position: "absolute",
    top: 0,
    fontSize: responsiveFontSize(12),
    color: GREY,
    fontFamily: SFProDisplayMedium,
    textAlign: "left",
  },

  input: {
    borderBottomColor: BLUE,
    borderBottomWidth: 1,
    // paddingHorizontal: wp(5),
    paddingVertical: hp(4),

    fontFamily: SFProDisplayMedium,
    textAlign: "left",
    fontSize: responsiveFontSize(15),
    color: BLACK,
    paddingLeft: 0,
  },
  textarea: {
    borderColor: BLUE,
    borderWidth: 1,
    paddingVertical: hp(4),
    minHeight: hp(174),
    fontFamily: SFProDisplayMedium,
    textAlign: "left",
    fontSize: responsiveFontSize(15),
    // paddingLeft: 0,
    textAlignVertical: "top",
    paddingHorizontal: hp(12),
    marginTop: hp(12),
    borderRadius: 8,
    color: BLACK,
  },
  selectInput: {
    borderBottomColor: BLUE,
    borderBottomWidth: 1,
    width: wp(40),
    paddingVertical: hp(4),
    alignSelf: "center",
    marginTop: hp(16),
    fontFamily: SFProDisplayMedium,
    textAlign: "left",
    borderColor: BLUE,
    fontSize: responsiveFontSize(15),
  },
  selectInput2: {
    borderBottomColor: BLUE,
    borderBottomWidth: 1,
    width: wp(290),
    paddingVertical: hp(4),
    alignSelf: "center",
    marginTop: hp(13),
    borderColor: BLUE,
    color: BLACK,
    fontFamily: SFProDisplayMedium,
    textAlign: "left",
    fontSize: responsiveFontSize(15),
  },
  down: {
    position: "absolute",
    right: 0,
    bottom: 10,
  },
  pickerText: {
    fontFamily: SFProDisplayMedium,
    textAlign: "left",
    fontSize: responsiveFontSize(15),
    color: BLACK,
  },
  phoneContainer: {
    width: "75%",
    height: 50,
  },
  button: {
    marginTop: 30,
    width: "75%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  textInput: {
    paddingVertical: 0,
  },
});

//make this component available to the app
export default MobilePhone;
