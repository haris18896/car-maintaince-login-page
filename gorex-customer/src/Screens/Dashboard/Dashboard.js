import React, {useContext, useEffect, useRef, useState} from "react";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";

import MapView from "react-native-maps";
import { useTranslation } from "react-i18next";
import Geolocation from "@react-native-community/geolocation";

import Colors from "../../Constants/Colors";
import {showToast} from "../../utils/common";
import MapStyle from "../../Constants/MapStyle";
import {hp, wp} from "../../utils/responsiveSizes";
import { GetAllBranches } from "../../api/CallAPI";
import FontFamily from "../../Constants/FontFamily";
import {CommonContext} from "../../contexts/ContextProvider";
import {GreenWhiteCurrentLocation, MyPin} from "../../assets";
import GetServiceCategories from "../../api/GetServiceCategories";

import BottomBar from "./components/BottomBar";
import Loader from "../../Components/Loader";
import HomeHeader from "../../Components/Header/HomeHeader";
import ProfileModel from "../../Components/Modal/ProfileModel";

const Dashboard = ({ navigation }) => {
  const { t } = useTranslation();
  const {userProfile, setSelectedBranch, setCurrentLocation} = useContext(CommonContext);
  const [reload, setReload]     = useState(false);
  const [loading, setLoading]   = useState(true);

  const [allBranches, setAllBranches]               = useState([]);
  const [filteredBranches, setFilteredBranches]     = useState([]);
  const [serviceCategories, setServiceCategories]   = useState([]);

  const [currentCoordinates, setCurrentCoordinates] = useState(null);
  const [activeService, setActiveService] = useState(null);

  const [isShowProfileAlert, setIsShowProfileAlert] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    return navigation.addListener('focus', handleViewSwitch);
  }, [navigation]);

  useEffect(()=>{
    if (!userProfile?.profile_completed) {
      setIsShowProfileAlert(true);
    } else {
      setIsShowProfileAlert(false);
    }
  },[userProfile]);

  const navigateToGoD = () => {
    navigation.navigate("GoDChooseVehicle");
  };

  const handleViewSwitch = () => {
    // call your function here
    getCurrentLocation().then();
    getAllServiceCategories().then();

  };

  const getCurrentLocation = async () =>{
    Geolocation.getCurrentPosition((location) => {
          setCurrentCoordinates({latitude: location?.coords.latitude, longitude: location?.coords.longitude});
          setCurrentLocation({latitude: location?.coords.latitude, longitude: location?.coords.longitude});
        },
        (error) => {
          if (error.code === 2) {
            Alert.alert("Alert!", "Please enable your location to use maps");
          }
        }
    );
  }

  const getAllServiceCategories = async () =>{
    setLoading(true);
    GetServiceCategories().then(({ success, response }) => {
      if (success) {
        setServiceCategories([{id : "GoD", name: t("common.gorexOnDemand")}, ...response]);
        getAllBranches().then();
      } else {
        setLoading(false);
        showToast("Error", response, "error");
      }
    });
  }

  const getAllBranches = async () =>{
    GetAllBranches().then(({success, data, message}) => {
      // console.log('Get all branches are back ===>> ', data);
      if (success) {
        setAllBranches(data);
      } else {
        showToast("Error", message, "error");
      }

      setTimeout(()=>{
        setLoading(false);
      },1000);
    });
  };

  React.useEffect(() => {
    filterBranchesWith();
  }, [allBranches]);

  const filterBranchesWith = (id=null) => {
    let branches = [...allBranches];
    if (id){
    // console.log('ID ===>> ', id);
      let localBranches = [];
      allBranches.map((branch)=>{
        // console.log('Branch ===>> ', branch);
        // console.log('Branch ===>> ', branch.services.indexOf(id));
        if (branch.services.indexOf(id) !== -1){
          localBranches.push(branch);
        }
      });
      branches = localBranches;
      setFilteredBranches(branches);
    }else {
      setFilteredBranches(allBranches);
    }
    setLoading(false);
  }

  const onPressCurrentLocationButton = () => {
    mapRef?.current?.animateToRegion({
      latitude: currentCoordinates.latitude,
      longitude: currentCoordinates.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setActiveService(null);
    setReload(!reload);
  };

  const reloadMap = () => {
    Geolocation.getCurrentPosition(
        (location) => {
          mapRef?.current?.animateToRegion({
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setCurrentCoordinates({
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
          });
          setReload(!reload);
        },
        (error) => {
          if (error.code === 2) {
            Alert.alert("Error", "Please enable your location to use maps");
          }
        }
    );
  };

  const onPressProfileAlert_CompleteInfo = () => {
    onPressProfileAlert_Cancel();
    navigation.navigate("ProfileUpdate");
  }

  const onPressProfileAlert_Cancel = () => {
    setIsShowProfileAlert(false);
  }

  const showCurrentLocationMarker = () => {
    return (
        <MapView.Marker key={"1"} coordinate={currentCoordinates}>
          <View style={{ width: "30%", height: "30%" }}>
            <Image
                source={MyPin}
                style={{ width: 60, height: 60, resizeMode: "contain" }}
            />
          </View>
        </MapView.Marker>
    )
  }

  const showBranchLocationMarker = (value, index) =>{
    return (
        <MapView.Marker
            key={index}
            coordinate={{latitude: Number(value?.latitude), longitude: Number(value?.longitude),}}
            onPress={() => {
              setSelectedBranch(value);
              navigation.navigate("ServiceProviderDetails");
            }}

        >
          <View style={styles.circle}>
            <View
                style={{
                  backgroundColor: Colors.DARKERGREEN,
                  borderRadius: wp(20),
                  paddingHorizontal: wp(17),
                  paddingVertical: wp(8.5),
                }}
            >
              <Text style={styles.branchSize}>{value?.name}</Text>
            </View>
            <View style={styles.triangle} />
          </View>
        </MapView.Marker>
    )
  }

  return (
      <View style={styles.container}>
        {currentCoordinates && (
            <MapView
                ref={mapRef}
                initialRegion={{
                  latitude: currentCoordinates?.latitude,
                  longitude: currentCoordinates?.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                style={styles.map}
                userInterfaceStyle={"dark"}
                userLocationPriority="high"
                customMapStyle={MapStyle}
            >
              {showCurrentLocationMarker()}
              {filteredBranches?.map((value, index) => (
                  showBranchLocationMarker(value,index)
              ))}
            </MapView>
        )}

        <HomeHeader onPress={() => navigation.openDrawer()} />

        {/*Current Location Button*/}
        <TouchableOpacity style={[styles.content]} onPress={onPressCurrentLocationButton}>
          <GreenWhiteCurrentLocation width={wp(60)} height={wp(60)} />
        </TouchableOpacity>

        {!loading && (
            serviceCategories.length > 0 ?
                <BottomBar
                resetFilter={reload}
                setResetFilter={setReload}
                navigateToGoD={navigateToGoD}
                serviceCategories={serviceCategories}
                filterChanged={(id)=>{filterBranchesWith(id)}} />
                : null
                // <BottomBarOutRange resetFilter={reload} />
        )}

        <ProfileModel isShow={isShowProfileAlert} onPressCancel={onPressProfileAlert_Cancel} onPressButton={onPressProfileAlert_CompleteInfo}/>

        <Loader visible={loading} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    position: "absolute",
    bottom: hp(200),
    right: wp(20),
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    bottom: hp(0),
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    left: "45%",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: Colors.DARKERGREEN,
    transform: [{ rotate: "-180deg" }],
  },
  branchSize: {
    ...FontFamily.medium,
    color: Colors.WHITE,
    textAlign: "center",
  },
});

export default Dashboard;
