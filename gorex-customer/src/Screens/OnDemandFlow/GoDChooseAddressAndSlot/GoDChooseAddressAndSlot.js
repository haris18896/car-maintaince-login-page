import React, { useState, useEffect } from "react";
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import moment from "moment";
import { useTranslation } from "react-i18next";
import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../../Constants/Colors";
import FontSize from "../../../Constants/FontSize";
import FontFamily from "../../../Constants/FontFamily";
import { hp, wp } from "../../../utils/responsiveSizes";
import { NoAddress, Address, CouponDel, Edit, Calendar, Watch, CheckBoxChecked } from "../../../assets";

import BackHeader from "../../../Components/Header/BackHeader";
import MessageWithImage from "../../../Components/MessageWithImage";
import Footer from "../../ProductsAndServices/components/Footer";
import SelectAddressBottomSheet from "../../../Components/BottomSheet/SelectAddressBottomSheet";
import GetAddressFromCoordinates from "../../../api/GetAddressFromCoordinates";
import {showToast} from "../../../utils/common";
import CheckBoxCard from "../../../Components/Cards/CheckBoxCard";

const GoDChooseAddressAndSlot = ({route}) => {
    const selectedVehicle   = route?.params?.selectedVehicle;
    const isVehicleRunning  = route?.params?.isVehicleRunning;
    const selectedService   = route?.params?.selectedService;
    const notes             = route?.params?.notes;

    const { t } = useTranslation();
    const navigation = useNavigation();

    // const [time, setTime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addressName, setAddressName] = useState(null);
    const [address, setAddress] = useState(null);
    const [addressCoordinates, setAddressCoordinates] = useState(null);
    const [date, setDate] = useState(null);
    const [nearbyServiceProviders, setNearbyServiceProviders] = useState([]);
    const [selectedServiceProvider, setSelectedServiceProvider] = useState(null);

    const [showAddressModal, setShowAddressModal] = useState(true);
    const [showDatePickerModal, setShowDatePickerModal] = useState(false);
    const [showTimePickerModal, setShowTimePickerModal] = useState(false);

    const onPressCancelAddress = () => {
        setShowAddressModal(false);
    };

    const onPressConfirmAddress = (name, selectedCoordinates, nearbyServiceProviders) => {
        onPressCancelAddress();
        setLoading(true);
        GetAddressFromCoordinates(selectedCoordinates).then((response)=>{
            setLoading(false);
            if (response.success) {
                setAddressName(name);
                setAddressCoordinates(selectedCoordinates);
                setNearbyServiceProviders(nearbyServiceProviders);
                setAddress(response.response[0].formatted_address);
            } else {
                showToast("Error", response, "error");
            }
        });
    };

    const onPressSelectServiceProvider = (item) =>{
        setSelectedServiceProvider(item);
    }

    const onPressNextButton = () =>{
        navigation.navigate("Slots", {selectedVehicle, isVehicleRunning, selectedService, notes, addressName, address, addressCoordinates, selectedServiceProvider, isOnDemand:true })
    }

    return (
        <View style={styles.screen}>
            <View style={styles.contentContainer}>
                <BackHeader title={t("common.gorexOnDemand")} />
                <ScrollView style={styles.content}>
                    <View style={{ height: hp(20) }} />
                    <View style={styles.selectAddressHeader(address)}>
                        <Text style={styles.selectAddress}>{t("gorexOnDemand.pleaseSelectAddress")}</Text>
                        {!address ? (
                            <TouchableOpacity onPress={() => setShowAddressModal(true)}>
                                <Text style={styles.addNew}>{t("gorexOnDemand.addNew")}</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                    {address ? (
                        <>
                            <View style={{ height: hp(20) }} />
                            <View style={styles.addressContainer}>
                                <Image style={styles.checkBox} source={CheckBoxChecked} />
                                <View style={styles.homeContainer}>
                                    <Image style={styles.homeImage} source={Address} />
                                    <View style={{ width: wp(10) }} />
                                    <Text style={styles.home}>{addressName}</Text>
                                </View>
                                <View style={{ height: hp(20) }} />
                                <View style={{alignItems: 'flex-start'}}>
                                    <Text style={styles.address}>{address}</Text>
                                </View>
                                <View style={{ height: hp(10) }} />
                                <View style={styles.addressCardActionContainer}>
                                    <TouchableOpacity onPress={() => setShowAddressModal(true)}>
                                        <Image style={styles.addressCardAction} source={Edit} />
                                    </TouchableOpacity>
                                    <View style={{width: wp(10)}} />
                                    <TouchableOpacity onPress={() => setAddress(null)}>
                                        <Image style={styles.addressCardAction} source={CouponDel} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ height: hp(40) }} />
                        </>
                    ) : (
                        <>
                            <View style={{ height: hp(60) }} />
                            <MessageWithImage imageSource={NoAddress} message={t("gorexOnDemand.noAddressAdded")} description={t("gorexOnDemand.noAddressDescription")} />
                            <View style={{ height: hp(60) }} />
                        </>
                    )}

                    {/*<View style={styles.pickerTitleContainer}>*/}
                        {/*<View style={styles.pickerTitleWrapper}>*/}
                        {/*    <Text style={styles.pickerTitle}>{t("gorexOnDemand.selectDay")}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.pickerTitleWrapper}>*/}
                        {/*    <Text style={styles.pickerTitle}>{t("gorexOnDemand.selectTime")}</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}

                    {/*<View style={{height: hp(20)}} />*/}

                    {/*<View style={{flexDirection: 'row'}}>*/}
                    {/*    <View style={{width: wp(20)}} />*/}
                    {/*    <TouchableOpacity style={styles.pickerButton} onPress={() => setShowDatePickerModal(true)}>*/}
                    {/*        <Image source={Calendar} style={styles.pickerButtonImage} />*/}
                    {/*        <View style={styles.selectContainer(date)}>*/}
                    {/*            <Text style={styles.select}>{date ? moment(date).format("Do MMM, YYYY") : t("common.select")}</Text>*/}
                    {/*        </View>*/}
                    {/*    </TouchableOpacity>*/}

                    {/*    <View style={{width: wp(16)}} />*/}

                    {/*    <TouchableOpacity style={styles.pickerButton} onPress={() => setShowTimePickerModal(true)}>*/}
                    {/*        <Image source={Watch} style={styles.pickerButtonImage} />*/}
                    {/*        <View style={styles.selectContainer(time)}>*/}
                    {/*            <Text style={styles.select}>{time ? moment(time).format("hh:mm A") : t("common.select")}</Text>*/}
                    {/*        </View>*/}
                    {/*    </TouchableOpacity>*/}

                    {/*</View>*/}
                    {/*<View style={{height: hp(20)}} />*/}
                    <View style={styles.pickerTitleWrapper}>
                        <Text style={styles.pickerTitle}>{t("gorexOnDemand.nearByServiceProvider")}</Text>
                        <View style={{ height: hp(5) }} />
                        <Text style={styles.oneServiceOnly}>{t("gorexOnDemand.oneServiceOnly")}</Text>
                    </View>
                    <View style={{ height: hp(10) }} />
                    <FlatList
                        data={nearbyServiceProviders}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CheckBoxCard
                                isCheckboxOnRight={true}
                                title={item?.name}
                                checked={selectedServiceProvider?.id === item?.id}
                                onPress={() => onPressSelectServiceProvider(item)} />

                        )}
                    />

                </ScrollView>
            </View>

            <Footer title={t("common.next")} disabled={!selectedServiceProvider || !address} onPress={onPressNextButton}/>

            <SelectAddressBottomSheet serviceId={16} visible={showAddressModal} closeSheet={onPressCancelAddress} onPressConfirmAddress={onPressConfirmAddress} />

            {/*<DatePicker*/}
            {/*    modal*/}
            {/*    date={date ? date : new Date()}*/}
            {/*    open={showDatePickerModal}*/}
            {/*    minimumDate={new Date()}*/}
            {/*    mode="date"*/}
            {/*    onCancel={() => setShowDatePickerModal(false)}*/}
            {/*    onConfirm={(date) => {*/}
            {/*        setDate(date);*/}
            {/*        setShowDatePickerModal(false);*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<DatePicker*/}
            {/*    modal*/}
            {/*    date={time ? time : new Date()}*/}
            {/*    open={showTimePickerModal}*/}
            {/*    mode="time"*/}
            {/*    onCancel={() => setShowTimePickerModal(false)}*/}
            {/*    onConfirm={(time) => {*/}
            {/*        setTime(time);*/}
            {/*        setShowTimePickerModal(false);*/}
            {/*    }}*/}
            {/*/>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    contentContainer: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    selectAddressHeader: (address) => {
        return {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: address ? "flex-start" : "space-between",

            paddingHorizontal: wp(20),
        };
    },
    selectAddress: {
        ...FontSize.rfs18,
        ...FontFamily.bold,
        color: Colors.BLACK,
    },
    addNew: {
        ...FontSize.rfs16,
        ...FontFamily.bold,
        color: Colors.DARKERGREEN,
    },
    addressContainer: {
        padding: wp(20),
        marginHorizontal: wp(20),

        borderWidth: hp(3),
        borderRadius: hp(3),
        borderColor: Colors.DARKERGREEN,
    },
    homeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkBox: {
        position: 'absolute',
        top: hp(10),
        end: hp(10),

        width: hp(20),
        height: hp(20),
        resizeMode: "contain"
    },
    homeImage: {
        width: wp(18),
        height: hp(20),
        resizeMode: 'contain',
    },
    home: {
        ...FontSize.rfs18,
        ...FontFamily.medium,
        color: Colors.BLACK,
    },
    address: {
        ...FontSize.rfs14,
        ...FontFamily.medium,
        color: Colors.DARK_BLACK,
    },
    addressCardAction: {
        width: wp(32),
        height: wp(32),
        resizeMode: 'contain',
    },
    addressCardActionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    pickerTitleContainer: {
        flexDirection: 'row',
    },
    pickerTitleWrapper: {
        width: '90%',
        justifyContent: 'center',
        paddingHorizontal:wp(20),
    },
    pickerTitle: {
        ...FontSize.rfs18,
        ...FontFamily.bold,
        color: Colors.BLACK,
    },
    pickerButton: {
        flexDirection: 'row',
        alignItems: 'center',

        width: wp(186),
        height: hp(50),
        borderRadius: hp(10),
        paddingStart: wp(13),
        backgroundColor: Colors.BLACK,
    },
    pickerButtonImage: {
        width: wp(24),
        height: wp(24),
        resizeMode: 'contain',
    },
    selectContainer: (value) => {
        return {
            flex: 1,
            alignItems: 'flex-start',
            paddingStart: value ? wp(10) : wp(33),
        };
    },
    select:{
        ...FontSize.rfs16,
        ...FontFamily.bold,
        color: Colors.WHITE,
    },
    // cardStyle: {
    //     width: wp(388),
    //     marginVertical: hp(5),
    //     marginHorizontal: wp(20),
    // },
});

export default GoDChooseAddressAndSlot;
