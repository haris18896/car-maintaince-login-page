import React, {useContext, useState} from "react";
import { View, StyleSheet } from "react-native";

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../Constants/Colors";
import { hp, wp } from "../../utils/responsiveSizes";
import { showToast } from "../../utils/common";
import GeneralAPIAction from "../../api/GeneralAPIAction";

import Loader from "../../Components/Loader";
import Header from "../../Components/Header/BackHeader";
import Footer from "../ProductsAndServices/components/Footer";
import InputWithLabel from "../../Components/Inputs/InputWithLabel";
import {CommonContext} from "../../contexts/ContextProvider";

const UpdatePassword = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const {userProfile} = useContext(CommonContext);

  const updatePassword = async () => {
    if (currentPassword === newPassword && currentPassword === confirmNewPassword) {
      showToast(
        "Error!",
        "New password must be different to current password",
        "error"
      );
    } else if (newPassword !== confirmNewPassword) {
      showToast(
        "Error!",
        "New password and confirm password does not match",
        "error"
      );
    } else {
      setLoading(true);
      const body = {
        user: userProfile?.id,
        old_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmNewPassword,
      };
      const updatePasswordResponse = await GeneralAPIAction(null, body, "/update/password");
      setLoading(false);
      if (updatePasswordResponse?.success) {
        showToast("Success!", updatePasswordResponse?.response, "success");
        navigation.goBack();
      } else {
        showToast("Error!", updatePasswordResponse?.response, "error");
      }
    }
  };

  return (
    <View style={styles.screen}>
      <Header title={t("updatePassword.updatePassword")} />

      <View style={styles.contentContainer}>
        <View style={{height: hp(20)}} />
        <InputWithLabel
          type='password'
          label={t("updatePassword.currentPassword")}
          value={currentPassword}
          setValue={setCurrentPassword}
          placeholder={t("updatePassword.currentPasswordPlaceholder")} />

        <View style={{height: hp(20)}} />
        <InputWithLabel
          type='password'
          label={t("updatePassword.newPassword")}
          value={newPassword}
          setValue={setNewPassword}
          placeholder={t("updatePassword.newPasswordPlaceholder")} />

        <View style={{height: hp(20)}} />
        <InputWithLabel
          type='password'
          label={t("updatePassword.confirmNewPassword")}
          value={confirmNewPassword}
          setValue={setConfirmNewPassword}
          placeholder={t("updatePassword.confirmNewPasswordPlaceholder")} />
      </View>

      <Footer
          title={t("updatePassword.updatePasswordButton")}
          disabled={!currentPassword || !newPassword || !confirmNewPassword}
          onPress={updatePassword}/>

      <Loader visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(20),
  },
});

export default UpdatePassword;
