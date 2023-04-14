//import liraries
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Profile, Upload } from "../../assets";
import FullButton from "../../Components/Buttons/FullButton";
import FormElement from "../../Components/FormEelement";
import Header from "../../Components/Header/BackHeader";
import Loader from "../../Components/Loader";
import { WHITE } from "../../constants/colors";
import { showToast, removeToken } from "../../utils/common";
import { hp, wp } from "../../utils/responsiveSizes";
import { getSignupForm, updateUser } from "./RegistrationActions";
import { launchImageLibrary } from "react-native-image-picker";
import { requestLibraryPermission } from "../../utils/permissions";
import { mediaUrl } from "../../utils/defaultConfig";
import { useTranslation } from "react-i18next";
import PickerInputRound from "../../Components/Inputs/PickerInputRound";
import { deleteAccount, logout } from "../../store/actions/auth";
// import PagerIndicator from './Components/PagerIndicator';
// create a component
const ProfileUpdate = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState();

  const user = useSelector((state) => state.auth.user);
  const [state, setState] = useState({
    fields: [],
    errorMessages: {},
  });

  const dispatch = useDispatch();

  const handleChange = (name, index, value) => {
    const { fields, errorMessages } = state;
    const field = fields[index];
    const { fieldType, xmlName } = field;
    if (name === xmlName) {
      switch (fieldType) {
        case "checkbox":
          field["value"] = value;
          break;
        case "select":
          field["value"] = value;
          break;
        default:
          field["value"] = value;
          break;
      }
    }
    if (errorMessages[name]) delete errorMessages[name];
    setState({
      ...state,
      fields,
      [name]: value,
    });
  };
  useEffect(() => {
    dispatch(getSignupForm()).then((res) => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setState({
        ...state,
        fields: res?.payload,
      });
    });
  }, []);

  const handleImagePicker = async () => {
    const granted = await requestLibraryPermission();

    if (granted) {
      launchImageLibrary(
        { mediaType: "photo", maxHeight: 600, maxWidth: 800 },
        (response) => {
          const file = response?.assets?.[0];
          if (file) {
            const formattedImage = {
              name: file.fileName,
              type: file.type,
              uri:
                Platform.OS === "ios"
                  ? file.uri.replace("file://", "")
                  : file.uri,
            };
            setImage(formattedImage);
          }
        }
      );
    } else {
      navigation.navigate("PermissionScreen");
    }
  };

  const handleSubmit = () => {
    setState({
      ...state,
    });
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    Object.keys(state).map((item) => {
      let removedFields = ["errorMessages", "fields", "file"];
      if (!removedFields.includes(item)) {
        console.log(item.toString(), state[item]);
        formData.append(item.toString(), state[item]);
      }
    });
    dispatch(updateUser({ data: formData, id: user?.profile?._id })).then(
      (res) => {
        console.log(res);
        setLoading(false);
        if (res?.payload?._id) {
          showToast("Success", t("Profile is updated"), "success");
          navigation.goBack();
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Header title={t("profile.My Profile")} profile />
      <TouchableOpacity onPress={handleImagePicker} style={styles.imagePicker}>
        <Image
          style={styles.avatar}
          source={
            image
              ? image
              : user?.profile?.file
              ? { uri: `${mediaUrl}${user?.profile?.file}` }
              : Profile
          }
        />
        <Image source={Upload} style={styles.uplaodIcon} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.content}
      >
        {state?.fields && state?.fields?.length > 0
          ? state?.fields?.map((field, i) => (
              <View key={i}>
                {field?.xmlName == "password" ||
                field?.xmlName == "driving_license_number" ||
                field?.xmlName == "driving_license_expiry" ||
                field?.xmlName == "confirm_password" ? null : (
                  <FormElement
                    index={i}
                    key={i}
                    field={field}
                    handleChange={handleChange}
                    disabled={field?.xmlName !== "name"}
                    defaultValue={
                      field?.xmlName === "email"
                        ? user?.email
                        : user?.profile[field?.xmlName]
                    }
                    currentField={{ [field?.xmlName]: state[field?.xmlName] }}
                    errorMessages={state.errorMessages}
                  />
                )}
              </View>
            ))
          : null}
        <PickerInputRound
          title={t("onboarding.Selectlanguage")}
          value="English"
        />
        <View style={styles.buttonContainer}>
          <FullButton
            disabled={!image}
            onPress={handleSubmit}
            title={t("profile.Update")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <FullButton
            type="cancel"
            title={t("menu.Delete Account")}
            onPress={() => {
              Alert.alert(
                "Confirm",
                "Are you sure that you want to delete your account?",
                [
                  {
                    text: "Delete",
                    onPress: () => {
                      dispatch(deleteAccount()).then((res) => {
                        if (res?.payload?.success) {
                          showToast(
                            "Success",
                            "Account is deleted successfully",
                            "success"
                          );
                          dispatch(logout());
                          removeToken();
                          navigation.navigate("Login");
                        }
                      });
                    },
                  },
                  {
                    text: "Cancel",
                    onPress: () => {},
                  },
                ]
              );
            }}
          />
        </View>
      </ScrollView>
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
  content: {
    flex: 1,

    marginTop: hp(10),
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: wp(22),
  },
  avatar: {
    height: hp(110),
    width: hp(110),
    borderRadius: hp(55),
  },
  imagePicker: {
    alignSelf: "center",
    marginTop: hp(-55),
  },
  buttonContainer: {
    marginTop: hp(30),
  },
  uplaodIcon: {
    width: hp(23),
    height: hp(23),
    position: "absolute",
    bottom: 5,
    right: 5,
  },
});

//make this component available to the app
export default ProfileUpdate;
