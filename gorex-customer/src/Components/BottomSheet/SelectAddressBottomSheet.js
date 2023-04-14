import React, {useContext, useEffect, useRef, useState} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";

import MapView, {MapEvent} from "react-native-maps";
import { useTranslation } from "react-i18next";
import BottomSheet from "react-native-raw-bottom-sheet";
import Geolocation from "@react-native-community/geolocation";

import Colors from "../../Constants/Colors";
import MapStyle from "../../Constants/MapStyle";
import FontSize from "../../Constants/FontSize";
import FontFamily from "../../Constants/FontFamily";
import { hp, wp } from "../../utils/responsiveSizes";
import { MapPin, OutRange, CurrentLocation } from '../../assets';

import { RoundedSquareFullButton } from "../../Components";
import InputWithLabel from "../Inputs/InputWithLabel";
import {CommonContext} from "../../contexts/ContextProvider";
import NearByServiceProviders from "../../api/NearbyServiceProviders";
import Footer from "../../Screens/ProductsAndServices/components/Footer";

const SelectAddressBottomSheet = ({visible, closeSheet, serviceId, onPressConfirmAddress}) => {
    const {currentLocation, userProfile} = useContext(CommonContext);
    let refMap = useRef();
    let refBottomSheet = useRef();
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [coordinates, setCoordinates] = useState(currentLocation);
    const [selectedCoordinates, setSelectedCoordinates] = useState(currentLocation);
    const [nearbyServiceProviders, setNearbyServiceProviders] = useState([]);

    useEffect(() => {
        checkNearByServiceProvidersForRegion(coordinates);
        Geolocation.getCurrentPosition((location) => {
                setCoordinates({latitude: location?.coords.latitude, longitude: location?.coords.longitude,});
            },
            (error) => {
                if (error.code === 2) {
                    Alert.alert("Alert!", "Please enable your location to use maps");
                }
            }
        );
    }, []);

    useEffect(() => {
        if (visible) {
            refBottomSheet.current.open();
        } else {
            refBottomSheet.current.close();
        }
    }, [visible]);

    const checkNearByServiceProvidersForRegion = (region) =>{
        // console.log('Check Nearby Service Providers for Region ==>> ', region);
        NearByServiceProviders({region:region, serviceId: serviceId, userId:userProfile.id}).then((response)=>{
            // console.log('NearByServiceProviders response ===>> ', response);
            if (response.success){
                // console.log('response ===>> ', response.response);
                setNearbyServiceProviders(response.response);
            }
        });
    }

    const onPressCurrentLocation = () =>{
        refMap?.current?.animateToRegion({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    }

    // const onPressConfirmAddress = () => {
    //     console.log('Lat ===>> ', selectedCoordinates.latitude);
    //     console.log('Long ===>> ', selectedCoordinates.longitude);
    // }




    const mapArea = () => {
        return (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <MapView
                    style={{...StyleSheet.absoluteFillObject}}
                    customMapStyle={MapStyle}
                    ref={refMap}
                    initialRegion={{
                        latitude: coordinates?.latitude,
                        longitude: coordinates?.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onRegionChangeComplete={(region, details)=>{
                        setSelectedCoordinates(region);
                        checkNearByServiceProvidersForRegion(region);
                    }}
                />


                <View style={[styles.outOfRangeContainer, {backgroundColor: nearbyServiceProviders.length<=0?Colors.BLACK:null}]}>
                    {nearbyServiceProviders.length <= 0 &&
                    <>
                        <Image style={styles.outOfRangeImage} source={OutRange}/>
                        <View style={{width: wp(10)}}/>
                        <Text style={styles.outOfRange}>{t("gorexOnDemand.outOfRange")}</Text>
                    </>
                    }
                </View>

                <View style={{alignItems: 'center'}}>
                    <Image style={styles.mapPin} source={MapPin} />
                </View>

                <TouchableOpacity onPress={onPressCurrentLocation}>
                    <Image style={styles.currentLocation} source={CurrentLocation} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <BottomSheet
            customStyles={{container:{borderRadius:20}}}
            height={hp(824)}
            onClose={closeSheet}
            ref={refBottomSheet}
            animationType="fade"
            closeOnDragDown={true}>

            <TouchableOpacity style={styles.cancelContainer} onPress={closeSheet}>
                <Text style={styles.cancel}>{t("common.cancel")}</Text>
            </TouchableOpacity>
            <View style={{height: hp(20)}} />

            <View style={{marginHorizontal: wp(20)}}>
                <InputWithLabel label={t("common.name")} placeholder={t("gorexOnDemand.selectAddressPlaceholder")} setValue={setName}/>
            </View>

            <View style={{height: hp(20)}} />
            <View style={styles.selectAddressContainer}>
                <Text style={styles.selectAddress}>{t("gorexOnDemand.selectAddress")}</Text>
            </View>
            <View style={{height: hp(30)}} />

            {mapArea()}

            <View style={{height: hp(30)}} />

            <View style={styles.bottomButton}>
                <RoundedSquareFullButton disabled={name.length<=0} title={t("gorexOnDemand.confirmAddress")} onPress={()=>{onPressConfirmAddress(name,selectedCoordinates, nearbyServiceProviders)}} />
            </View>

            <View style={{height: hp(30)}} />
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    cancelContainer: {
        marginEnd: wp(20),
        alignItems: 'flex-end',
    },
    cancel: {
        ...FontSize.rfs18,
        ...FontFamily.medium,
        color: Colors.BLACK,
    },
    selectAddressContainer: {
        marginStart: wp(20),
        alignItems: 'flex-start',
    },
    selectAddress: {
        ...FontSize.rfs20,
        ...FontFamily.bold,
        color: Colors.DARK_BLACK,
    },
    outOfRangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(50),
        paddingHorizontal: wp(20),
    },
    outOfRangeImage: {
        width: wp(20),
        height: hp(27),
        resizeMode: 'contain'
    },
    outOfRange: {
        ...FontSize.rfs14,
        ...FontFamily.semiBold,
        color: Colors.ORANGE,
    },
    mapPin: {
        width: wp(46),
        height: hp(71),
        resizeMode: 'contain',
    },
    currentLocation: {
        width: wp(60),
        height: wp(60),
        marginEnd: hp(20),
        marginBottom: hp(20),
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    },
    bottomButton:{
        height: hp(57),
        width: wp(388),
        borderRadius: hp(5),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: Colors.DARKERGREEN,
    },
});

export default SelectAddressBottomSheet;
