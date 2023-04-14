//import liraries
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { ArrowBack, Cart, Down, Eye, EyeClose } from "../../assets";
import { BLACK, BLUE, GREY } from "../../constants/colors";
import { SFProDisplayMedium } from "../../constants/fonts";
import { hp, responsiveFontSize, wp } from "../../utils/responsiveSizes";
import SelectOptions from "./SelectOptions";
import { useTranslation } from "react-i18next";

// create a component
const InputText = ({
  title,
  secured = false,
  select,
  date,
  options,
  changeHandler,
  defaultValue,
  disabled,
  keyboard,
  type,
  error,
  errorMessage,
  titleUp,
}) => {
  const [text, setText] = useState("");
  const [showSelect, setShowSelect] = useState(false);
  const [_date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(secured);
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

  return (
    <>
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
          <Text style={text ? styles.titleUp : styles.title}>{title}</Text>
        )}
        {select || date ? (
          <View style={styles.selectInput}>
            <Text style={styles.pickerText}>
              {select ? text : text ? moment(text).format("DD/MM/YYYY") : ""}
            </Text>
            <Image style={styles.down} source={Down} />
          </View>
        ) : (
          <>
            <TextInput
              value={text}
              multiline={type === "textarea"}
              onChangeText={(value) => {
                setText(value);
                changeHandler(value);
              }}
              placeholder={type === "textarea" ? title : ""}
              style={[
                type === "textarea" ? styles.textarea : styles.input,
                { textAlign: isRTL ? "right" : "left" },
              ]}
              editable={disabled ? false : true}
              secureTextEntry={isPasswordSecure}
              keyboardType={keyboard ? keyboard : "default"}
            />

            {secured && (
              <TouchableOpacity
                style={styles.iconinput}
                onPress={() => {
                  setIsPasswordSecure((prev) => !prev);
                }}
              >
                {isPasswordSecure ? (
                  <Image
                    resizeMode="contain"
                    source={Eye}
                    style={styles.eyestyling}
                  />
                ) : (
                  <Image
                    resizeMode="contain"
                    source={EyeClose}
                    style={styles.eyestyling}
                  />
                  // <Eye width={25} height={25} />
                  // <EyeClose width={25} height={25} />
                )}
              </TouchableOpacity>
            )}
          </>
        )}
      </TouchableOpacity>
      {error && (
        <Text
          style={{
            color: BLUE,
            marginTop: -10,
            fontSize: responsiveFontSize(12),
          }}
        >
          Field is Required!
        </Text>
      )}
      <View>
        <SelectOptions
          visible={showSelect}
          options={options}
          selectOption={selectOption}
        />

        <DatePicker
          modal
          open={open}
          date={_date}
          mode="date"
          minimumDate={new Date(Date.now())}
          onConfirm={(_date) => {
            setOpen(false);
            setDate(_date);
            setText(_date);
            changeHandler(moment(_date).format("MM/DD/YYYY"));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: hp(45),
    justifyContent: "flex-end",
    marginBottom: hp(10),
  },

  iconinput: {
    paddingHorizontal: 5,
    bottom: 10,
    position: "absolute",
    right: 0,
    height: 30,
  },

  eyestyling: {
    width: wp(15),
    tintColor: BLUE,
    // height: hp(30),
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
    // paddingHorizontal: wp(5),
    paddingVertical: hp(4),
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
});

//make this component available to the app
export default InputText;
