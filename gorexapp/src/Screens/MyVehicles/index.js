import React, {useContext, useEffect, useState} from "react";
import {FlatList, Image, StyleSheet, Text, View} from "react-native";

import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";


import styles from "./styles";
import Fonts from "../../Constants/fonts";
import Colors from "../../Constants/Colors";
import Loader from "../../Components/Loader";
import {showToast} from "../../utils/common";
import FontSize from "../../Constants/FontSize";
import {hp, wp} from "../../utils/responsiveSizes";
import GetMyVehicles from "../../api/GetMyVehicles";
import BackHeader from "../../Components/Header/BackHeader";
import {CommonContext} from "../../contexts/ContextProvider";
import {MenuBlack, NoVehicle, RoundPlus} from "../../assets";
import Footer from "../ProductsAndServices/components/Footer";
import VehicleCard from "../ProductsAndServices/components/VehicleCard";

const MyVehicles = () => {
  const {userProfile} = useContext(CommonContext);

  const { t }       = useTranslation();
  const navigation  = useNavigation();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    return navigation.addListener('focus', handleViewSwitch);
  }, [navigation]);

  const handleViewSwitch = () =>{
    getVehicles().then();
  }

  const getVehicles = async () => {
    setLoading(true);
    GetMyVehicles(userProfile?.id).then(({success, response})=>{
      setLoading(false);
      if (success) {
        setVehicles(response);
      } else {
        showToast("Error", response, "error");
      }
    });
  };

  const getEmptyListView = () =>{
    return (
        <View style={emptyScreenStyles.container}>
          <Image resizeMode="contain" transitionDuration={1000} source={NoVehicle} style={emptyScreenStyles.item}/>
          <Text style={emptyScreenStyles.text}> {t("vehicle.novehicle")}</Text>
          <Text style={emptyScreenStyles.title}>{t("vehicle.novehicleaccount")}</Text>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackHeader title={t("my_vehicles.My Vehicles")}
                  leftIcon={MenuBlack}
                  leftPress={() => navigation.openDrawer()}
                  rightIcon={!userProfile?.parent_partner_id && RoundPlus}
                  RightPress={() => navigation.navigate("VehicleInformation", {isComingFromOnDemand:false})}
      />

      {(!loading && vehicles.length <=0) ? getEmptyListView():

          (
              <FlatList
                  data={vehicles}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    if (!item) return;
                    return (
                        <VehicleCard
                            profile={userProfile}
                            vehicle={item}
                            setLoading={setLoading}
                            getAllVehicles={getVehicles}
                        />
                    );
                  }}
              />

          )
      }

        {!userProfile?.parent_partner_id ? (
          <Footer
            title={t("vehicle.Add Vehicle")}
            onPress={() => navigation.navigate("VehicleInformation")}
          />
        ) : null}
      <Loader visible={loading} />
    </View>
  );
};



const emptyScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    height: hp(160),
    width: wp(105),
    resizeMode: "contain",
  },
  text: {
    color: Colors.BLACK,
    fontFamily: Fonts.LexendMedium,
    textAlign: "center",
    ...FontSize.rfs24,
    marginTop: hp(5),
  },
  title: {
    color: "#B8B9C1",
    width: "70%",
    fontFamily: Fonts.LexendMedium,
    textAlign: "center",
    ...FontSize.rfs16,
    marginTop: hp(10),
  },
});

export default MyVehicles;
