import React, {useState, useEffect, useContext} from "react";
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../../Constants/Colors";
import FontSize from "../../../Constants/FontSize";
import FontFamily from "../../../Constants/FontFamily";
import { hp, wp } from "../../../utils/responsiveSizes";
import {AddWallet, CheckBoxChecked, CheckBoxUnchecked} from "../../../assets";

import Divider from "../../../Components/Divider";
import BackHeader from "../../../Components/Header/BackHeader";
import Footer from "../../ProductsAndServices/components/Footer";
import moment from "moment";
import CreateOrder from "../../../api/CreateOrder";
import {showToast} from "../../../utils/common";
import {CommonContext} from "../../../contexts/ContextProvider";
import Loader from "../../../Components/Loader";
import WalletModel from "../../../Components/Modal/WalletModel";

const GoDPlaceOrder = ({route}) => {

    const placeOrderNow         = route?.params?.placeOrderNow?route?.params?.placeOrderNow:false;
    const selectedVehicle       = route?.params?.selectedVehicle;
    const isVehicleRunning      = route?.params?.isVehicleRunning;
    const selectedService       = route?.params?.selectedService;
    const notes                 = route?.params?.notes;
    const addressName           = route?.params?.addressName;
    const address               = route?.params?.address;
    const addressCoordinates    = route?.params?.addressCoordinates;
    const date                  = route?.params?.date;
    const selectedServiceProvider   = route?.params?.selectedServiceProvider;
    const selectedSlot          = route?.params?.selectedSlot;
    const price                 = selectedService.price;

    const {userProfile} = useContext(CommonContext);
    const { t } = useTranslation();
    const navigation = useNavigation();

    const [paymentMethod, setPaymentMethod] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalWallet, setModalWallet] = useState(false);

    useEffect(() => {
        console.log('On Demand Service ====> ', selectedService);
        return navigation.addListener('focus', handleViewSwitch);
    }, [navigation]);

    const handleViewSwitch = () =>{
        console.log('Place Order Now ====>> ', placeOrderNow);
        if (placeOrderNow && userProfile?.balance >= price){
            createOrder();
        }else {
            showToast("Error", 'Unable to update the wallet', "error");
        }
    }



    const onPressPlaceOrder = () =>{
        // navigation.navigate("GoDOrderConfirmed");
        if (paymentMethod === 'credit_card'){
            navigation.navigate("TopUpCard",{amount:price ,comingFromOnDemand:true, comingFromNormal:false});
        }else if (paymentMethod === 'wallet_pay' && userProfile?.balance < price){
            setModalWallet(true);
        }else if (paymentMethod === 'wallet_pay' && userProfile?.balance >= price){
            createOrder();
        }else {
            showToast("Error", 'Random Error', "error");
        }


    }


    const createOrder = () =>{
        let data = {
            driver: userProfile?.id,
            vehicle_id: selectedVehicle.id,
            service_provider: selectedServiceProvider?.id,
            payment_method: 'wallet_pay',
            card_number:false,
            schedule_date:moment(date).format('YYYY-MM-DD'),
            on_demand:true,
            address: address,
            coupon_codes:"",
            slot_id:selectedSlot.id,
            sub_total:price,
            order_lines: [0,0,{
                product_id: selectedService.id,
                quantity: 1,
                price: selectedService.price,
                total_price: selectedService.price
            }],
        };


        setLoading(true);
        CreateOrder(data).then(({ success, response }) => {
            setLoading(false);
            console.log('Create Order Response ===>> ', response);
            if (success) {
                navigation.navigate("OrderConfirmed", {order_id: response});
                showToast("Success!", t("payment.Order is created successfully"), "success");
            } else {
                showToast("Error", response, "error");
            }
        });
    }


    const renderOrderDetailItem = (title, value, routeName) => {
        return (
            <View>
                <View style={{height: hp(20)}} />
                <View style={styles.orderDetailTitleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate(routeName)
                    }}>
                        <Text style={styles.edit}>{t("common.edit")}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: hp(10)}} />
                <View style={{alignItems: 'flex-start'}}>
                    <Text style={styles.orderDetailValue}>{value}</Text>
                </View>
                <View style={{height: hp(20)}} />
                <Divider />
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <View style={{flex: 1}}>
                <BackHeader title={t("common.gorexOnDemand")} />

                <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

                    {renderOrderDetailItem(t("common.vehicle"), `${selectedVehicle.vehicle_model[1]}, ${selectedVehicle.vehicle_variant[1].trimEnd()}, ${selectedVehicle.year_id[1]}`, 'GoDChooseVehicle')}
                    {renderOrderDetailItem(t("common.address"), address, 'GoDChooseAddressAndSlot')}
                    {renderOrderDetailItem(t("common.timeSlot"), `${moment(date).format('YYYY-MM-DD')}, ${selectedSlot.start_time} - ${selectedSlot.end_time}`, 'Slots')}
                    {renderOrderDetailItem(t("common.service"), selectedService.name, 'GoDChooseService')}
                    {renderOrderDetailItem(t("common.serviceProvider"), selectedServiceProvider.name, 'GoDChooseAddressAndSlot')}

                    <View style={{height: hp(20)}} />

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.title}>{t("common.totalAmount")}</Text>
                        <Text style={styles.totalAmount}>{t("common.sar")} {price}</Text>
                    </View>

                    <View style={{height: hp(20)}} />

                    <Divider />

                    <View style={{height: hp(20)}} />

                    <View style={{alignItems: 'flex-start'}}>
                        <Text style={styles.title}>{t("common.payment")}</Text>
                    </View>

                    <View style={{height: hp(16)}} />

                    <View style={styles.paymentMethodsContainer}>
                        <TouchableOpacity
                            style={[styles.paymentMethodContainer, {borderWidth: paymentMethod === 'wallet_pay' ? hp(3) : 0}]}
                            onPress={() => setPaymentMethod('wallet_pay')}>
                            <View style={styles.checkBoxContainer}>
                                <Image style={styles.checkBox} source={paymentMethod === 'wallet_pay' ? CheckBoxChecked : CheckBoxUnchecked} />
                            </View>
                            <View style={styles.paymentMethodTitleContainer}>
                                <Text style={styles.paymentMethodTitle}>{t("placeOrder.wallet")}</Text>
                                <Text style={styles.paymentMethodDescription}>{userProfile?.balance.toFixed(2) + ' '+ t("productsAndServices.SAR")}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.paymentMethodContainer, {borderWidth: paymentMethod === 'credit_card' ? hp(3) : 0}]}
                            onPress={() => setPaymentMethod('credit_card')}>
                            <View style={styles.checkBoxContainer}>
                                <Image style={styles.checkBox} source={paymentMethod === 'credit_card' ? CheckBoxChecked : CheckBoxUnchecked} />
                            </View>
                            <View style={styles.paymentMethodTitleContainer}>
                                <Text style={styles.paymentMethodTitle}>{t("placeOrder.creditCard")}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
                <WalletModel
                    show={modalWallet}
                    image={AddWallet}
                    text={t("placeOrder.notEnoughBalance")}
                    buttonTitle={t("placeOrder.addBalance")}
                    onPressClose={()=>{setModalWallet(false)}}
                    onPressBottomButton={()=>{
                        setModalWallet(false);
                        navigation.navigate("TopUp",{comingFromOnDemand:true, comingFromNormal:false});
                    }}
                />
            </View>
            <Footer title={t("payment.place")} rightTitle={`${t("common.sar")} ${price}`} disabled={!paymentMethod} onPress={onPressPlaceOrder}/>
            <Loader visible={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    contentContainer: {
        padding: wp(20),
    },
    orderDetailTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    title: {
        ...FontSize.rfs24,
        ...FontFamily.bold,
        color: Colors.DARK_BLACK,
    },
    edit: {
        ...FontSize.rfs18,
        ...FontFamily.bold,
        color: Colors.DARKERGREEN,
    },
    orderDetailValue: {
        ...FontSize.rfs14,
        ...FontFamily.medium,
        color: Colors.DARK_BLACK,
    },
    totalAmount: {
        ...FontSize.rfs24,
        ...FontFamily.bold,
        color: Colors.DARKERGREEN,
    },
    paymentMethodsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paymentMethodContainer: {
        width: wp(186),
        height: hp(78),
        borderRadius: hp(11),
        borderColor: Colors.DARKERGREEN,
        backgroundColor: Colors.BORDER_GRAYLIGHTEST,
    },
    checkBoxContainer: {
        alignItems: 'flex-end',
        marginTop: hp(10),
        marginEnd: hp(10),
    },
    checkBox: {
        width: wp(20),
        height: wp(20),
        resizeMode: "contain"
    },
    paymentMethodTitleContainer: {
        marginStart: wp(16),
    },
    paymentMethodTitle: {
        ...FontSize.rfs16,
        ...FontFamily.medium,
        color: Colors.DARK_BLACK,
    },
    paymentMethodDescription: {
        ...FontSize.rfs12,
        ...FontFamily.medium,
        color: Colors.DARK_BLACK,
    },
});

export default GoDPlaceOrder;
