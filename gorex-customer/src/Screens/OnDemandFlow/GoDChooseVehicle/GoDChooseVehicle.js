import React, {useState, useEffect, useContext} from "react";
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { NoVehicle } from "../../../assets";
import Colors from "../../../Constants/Colors";
import FontSize from "../../../Constants/FontSize";
import FontFamily from "../../../Constants/FontFamily";
import { hp, wp } from "../../../utils/responsiveSizes";

import BackHeader from "../../../Components/Header/BackHeader";
import VehicleCard from "../../../Components/Cards/VehicleCard";
import CheckBoxCard from "../../../Components/Cards/CheckBoxCard";
import MessageWithImage from "../../../Components/MessageWithImage";
import Footer from "../../ProductsAndServices/components/Footer";
import GetMyVehicles from "../../../api/GetMyVehicles";
import {showToast} from "../../../utils/common";
import {CommonContext} from "../../../contexts/ContextProvider";


const GoDChooseVehicle = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {userProfile} = useContext(CommonContext);

  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isVehicleRunning, setIsVehicleRunning] = useState(false);


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
        console.log('My Vehicles ===>> ', response);
        setVehicles(response);
      } else {
        showToast("Error", response, "error");
      }
    });
  };

  const showVehicles = () => {

    if (vehicles.length <=0 && !loading){
      return (
          <View style={{height:'74%'}}>
            <View style={{ height: hp(60) }} />
            <MessageWithImage imageSource={NoVehicle} message={t("gorexOnDemand.noVehicleAdded")} description={t("gorexOnDemand.noVehicleDescription")} />
            <View style={{ height: hp(60) }} />
          </View>
      );
    }else {
      return (
          <>
            <View style={{height: hp(10)}} />
            <FlatList
                data={vehicles}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedVehicle(item)}>
                      <>
                        <VehicleCard
                            cardStyle={styles.cardStyle(item?.id === selectedVehicle?.id)}
                            vehicle={item}
                        />
                        <View style={{ height: hp(10) }} />
                      </>
                    </TouchableOpacity>
                )}
            />
          </>
      );
    }
  };

  return (
      <View style={styles.screen}>
        <BackHeader title={t("common.gorexOnDemand")} />
        {/*<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>*/}
          <View style={{ height: hp(20) }} />

          <View style={styles.chooseVehicleHeader(vehicles)}>
            <Text style={styles.chooseVehicle}>{t("gorexOnDemand.pleaseChooseYourVehicle")}</Text>
            {vehicles.length <= 0 && !loading &&
            <TouchableOpacity onPress={() => navigation.navigate("VehicleInformation")}>
              <Text style={styles.addNew}>{t("gorexOnDemand.addNew")}</Text>
            </TouchableOpacity>
            }
          </View>

          {showVehicles()}

          {/*{vehicles.length>0 && (*/}
          {/*    <>*/}
          {/*      <View style={styles.isVehicleRunningContainer}>*/}
          {/*        <Text style={styles.isVehicleRunning}>{t("gorexOnDemand.isVehicleRunning")}</Text>*/}
          {/*      </View>*/}
          {/*      <View style={{ height: hp(10) }} />*/}
          {/*      <View style={{flexDirection: 'row'}}>*/}
          {/*        <View style={{ width: wp(12)}} />*/}
          {/*        <CheckBoxCard*/}
          {/*            cardStyle={styles.CheckBoxCardStyle}*/}
          {/*            title={t("common.yes")}*/}
          {/*            checked={isVehicleRunning}*/}
          {/*            onPress={() => setIsVehicleRunning(true)} />*/}
          {/*        <CheckBoxCard*/}
          {/*            cardStyle={styles.CheckBoxCardStyle}*/}
          {/*            title={t("common.no")}*/}
          {/*            checked={!isVehicleRunning && isVehicleRunning !== null}*/}
          {/*            onPress={() => setIsVehicleRunning(false)} />*/}
          {/*      </View>*/}
          {/*      <View style={{ height: hp(40) }} />*/}
          {/*    </>*/}
          {/*)}*/}
        {/*</ScrollView>*/}
        <Footer title={t("common.next")} disabled={!selectedVehicle || isVehicleRunning === null} onPress={() => navigation.navigate("GoDChooseService",{selectedVehicle, isVehicleRunning})} />
      </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    flex: 1,
    borderWidth:1,
    borderColor:'red'
  },
  chooseVehicleHeader: (vehicles) => {
    return {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: vehicles.length ? "flex-start" : "space-between",

      paddingHorizontal: wp(20),
    };
  },
  chooseVehicle: {
    ...FontSize.rfs18,
    ...FontFamily.bold,
    color: Colors.BLACK,
  },
  addNew: {
    ...FontSize.rfs16,
    ...FontFamily.bold,
    color: Colors.DARKERGREEN,
  },
  isVehicleRunningContainer: {
    paddingStart: wp(20),
    alignItems: 'flex-start',
  },
  isVehicleRunning: {
    ...FontSize.rfs18,
    ...FontFamily.bold,
    color: Colors.BLACK,
  },

  cardStyle: (showBorder) => {
    return {
      borderColor: Colors.DARKERGREEN,
      borderWidth: showBorder ? 2 : 0,
    }
  },

  CheckBoxCardStyle:{
    width: '50%',
    shadowColor: Colors.WHITE,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity:  0,
    shadowRadius: 0,
    elevation: 0
  }

});

export default GoDChooseVehicle;
