import React, {useState, useEffect, useContext} from "react";
import {View, Text, TextInput, ScrollView, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../../Constants/Colors";
import FontSize from "../../../Constants/FontSize";
import FontFamily from "../../../Constants/FontFamily";
import { hp, wp } from "../../../utils/responsiveSizes";

import Divider from "../../../Components/Divider";
import BackHeader from "../../../Components/Header/BackHeader";
import CheckBoxCard from "../../../Components/Cards/CheckBoxCard";
import Footer from "../../ProductsAndServices/components/Footer";
import GetMyVehicles from "../../../api/GetMyVehicles";
import {showToast} from "../../../utils/common";
import GetOnDemandServices from "../../../api/GetOnDemandServices";
import GetServiceProviderSlots from "../../../api/GetServiceProviderSlots";
import moment from "moment";
import {Calendar} from "../../../assets";
import DatePicker from "react-native-date-picker";
import {CommonContext} from "../../../contexts/ContextProvider";

const Slots = ({route}) => {

    const {inCartOrder, setInCartOrder, selectedBranch}  = useContext(CommonContext);

    const selectedVehicle       = route?.params?.selectedVehicle;
    const isVehicleRunning      = route?.params?.isVehicleRunning;
    const notes                 = route?.params?.notes;
    const addressName           = route?.params?.addressName;
    const address               = route?.params?.address;
    const addressCoordinates    = route?.params?.addressCoordinates;
    const isOnDemand            = route?.params?.isOnDemand;
    const selectedService       = isOnDemand?route?.params?.selectedService:inCartOrder?.services[0];
    const selectedServiceProvider   = isOnDemand?route?.params?.selectedServiceProvider:selectedBranch;



    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

    const [loading, setLoading] = useState(true);
    const [slots, setSlots] = useState([]);
    const [date, setDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showDatePickerModal, setShowDatePickerModal] = useState(false);

    useEffect(() => {
        return navigation.addListener('focus', handleViewSwitch);
    }, [navigation]);

    const handleViewSwitch = () =>{
        getServiceProviderSlots().then();
    }

    const getServiceProviderSlots = async () => {
        setLoading(true);
        let stringDate = moment(date).format('YYYY-MM-DD')
        GetServiceProviderSlots({serviceProvider:selectedServiceProvider, service:selectedService, date:stringDate}).then((response)=>{
            setLoading(false);
            if (response.success) {
                setSlots(response.response);
            } else {
                showToast("Error", response, "error");
            }
        });
    };

    const onPressService = (item) => {
        setSelectedSlot(item);
    };

    const onPressNextButton = () =>{
        if (isOnDemand){
        navigation.navigate("GoDPlaceOrder", {selectedVehicle, isVehicleRunning, selectedService, notes, addressName, address, addressCoordinates, date, selectedServiceProvider, selectedSlot })
        }else {
            inCartOrder.date    = date;
            inCartOrder.slot    = selectedSlot
            navigation.navigate("PaymentMethod",);
        }

    }

    return (
        <View style={styles.screen}>
            <View style={styles.contentContainer}>
                <BackHeader title={t("common.gorexOnDemand")} />

                <View style={{ height: hp(20) }} />
                <View style={styles.pleaseChooseServiceContainer}>
                    <Text style={styles.pleaseChooseService}>{t("gorexOnDemand.selectDay")}</Text>
                </View>

                <View style={{ height: hp(15) }} />

                <View style={{flexDirection: 'row'}}>


                    <View style={{width: wp(20)}} />
                    <TouchableOpacity style={styles.pickerButton} onPress={() => setShowDatePickerModal(true)}>
                        <Image source={Calendar} style={styles.pickerButtonImage} />
                        <View style={styles.selectContainer(date)}>
                            <Text style={styles.select}>{date ? moment(date).format("Do MMM, YYYY") : t("common.select")}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ height: hp(15) }} />

                <View style={styles.pleaseChooseServiceContainer}>
                    <Text style={styles.pleaseChooseService}>{t("gorexOnDemand.pleaseSelectASlot")}</Text>
                    {/* <View style={{ height: hp(5) }} />
                        <Text style={styles.oneServiceOnly}>{t("gorexOnDemand.oneServiceOnly")}</Text> */}
                </View>
                <View style={{ height: hp(15) }} />

                <FlatList
                    data={slots}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <CheckBoxCard
                            cardStyle={{width:'45%', marginHorizontal:wp(10), height:hp(60)}}
                            isCheckboxOnRight={true}
                            title={item?.start_time + ' - ' + item?.end_time}
                            checked={selectedSlot?.id === item?.id}
                            onPress={() => onPressService(item)} />
                    )}
                />
            </View>
            <DatePicker
                modal
                date={date ? date : new Date()}
                open={showDatePickerModal}
                minimumDate={new Date()}
                mode="date"
                onCancel={() => setShowDatePickerModal(false)}
                onConfirm={(date) => {
                    setDate(date);
                    setShowDatePickerModal(false);
                }}
            />
            <Footer title={t("common.next")} disabled={!selectedSlot} onPress={onPressNextButton}/>
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
    pleaseChooseServiceContainer: {
        paddingStart: wp(20),
        alignItems: 'flex-start',
    },
    pleaseChooseService: {
        ...FontSize.rfs18,
        ...FontFamily.bold,
        color: Colors.BLACK,
    },
    oneServiceOnly: {
        ...FontSize.rfs14,
        ...FontFamily.medium,
        color: Colors.LIGHTGREY,
    },

    leaveNote: (isRTL) => {
        return {
            paddingVertical: 0,
            textAlign: isRTL ? 'right' : 'left',

            ...FontSize.rfs16,
            ...FontFamily.medium,
            color: Colors.BLACK,
        };
    },
    selectContainer: (value) => {
        return {
            flex: 1,
            alignItems: 'flex-start',
            paddingStart: value ? wp(10) : wp(33),
        };
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
    select:{
        ...FontSize.rfs16,
        ...FontFamily.bold,
        color: Colors.WHITE,
    },
});

export default Slots;
