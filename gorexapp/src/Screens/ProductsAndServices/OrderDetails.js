import React, {useContext, useEffect, useRef, useState} from "react";
import {View, Text, Image, Linking, ScrollView, StyleSheet, TouchableOpacity,} from "react-native";

import { Divider } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { useTranslation } from "react-i18next";
import RBSheet from "react-native-raw-bottom-sheet";
import {CommonActions, useNavigation} from "@react-navigation/native";

import Fonts from "../../Constants/fonts";
import Colors from "../../Constants/Colors";
import { Cart, Request } from "../../assets";
import { showToast } from "../../utils/common";
import FontSize from "../../Constants/FontSize";
import Utilities from "../../utils/UtilityMethods";
import CancelOrderId from "../../api/CancelOrderId";
import GetOrderHistory from "../../api/GetOrderHistory";
import {CommonContext} from "../../contexts/ContextProvider";
import GeneralAPIWithEndPoint from "../../api/GeneralAPIWithEndPoint";
import { hp, wp } from "../../utils/responsiveSizes";

import Footer from "./components/Footer";
import Loader from "../../Components/Loader";
import BackHeader from "../../Components/Header/BackHeader";
import SmallButton from "../../Components/Buttons/SmallButton";
import CustomCheckBox from "../../Components/Inputs/CheckBoxCustom";
import CancelOrderModel from "../../Components/Modal/CancelOrderModel";

const OrderDetails = ({ route }) => {
    const order_id      = route?.params?.order_id;
    const branch_id     = route?.params?.branch_id;
    const isOnDemand     = route?.params?.isOnDemand;
    const {userProfile, onDemandOrder, setOnDemandOrder} = useContext(CommonContext);

    const refRBSheet = useRef();
    const { t } = useTranslation();
    const navigation = useNavigation();
    const selectReasonerror = "Please select the reason";

    const [order, setOrder] = useState(null);
    const [branch, setBranch] = useState(null);
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalCart, setmodalCart] = useState(false);
    const [country, setCountry] = useState(false);
    const [reasonerror, setReasonError] = useState(false);


    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setLoading(true);
        console.log('user ID ===>> ', userProfile?.id);
        console.log('Order ID ===>> ', order_id);
        console.log('Branh ID ===>> ', branch_id);
        getOrderDetail();
        getBranchDetail();
    };

    const getOrderDetail = () =>{
        GetOrderHistory({profileID:userProfile?.id, orderID:order_id}).then(({ success, response }) => {
            console.log('Order Detail ===>> ', response);
            if (success) {
                setOrder(response[0]);
                getVehicle(response[0]?.vehicle_id?.[0]);
            } else {
                setLoading(false);
                showToast("Error", response, "error");
            }
        });
    }

    const getBranchDetail = () => {
        const body = {
            params: {
                model: "res.partner",
                method: "search_read",
                args: [[["id", "=",branch_id]]],
                kwargs: {context:{"lang":"ar_001"},fields: ["name", "services" ,"active","longitude","latitude","opening_hours"]}
            }
        };
        GeneralAPIWithEndPoint("/dataset/call_kw/", body).then((response) => {
            setLoading(false);
            setBranch(response[0]);
        });
    }

    const getVehicle = (vehicleID) => {
        const body = {
            params: {
                model: "gorex.vehicle",
                method: "search_read",
                args: [[["customer", "=", userProfile?.id]]],
                kwargs: {fields: ["manufacturer","vehicle_model", "name"]}
            }
        };
        GeneralAPIWithEndPoint("/dataset/call_kw/", body).then((response) => {
            setLoading(false);
            const vehicle = response.find(vehicle => vehicle?.id === vehicleID);
            if (vehicle?.manufacturer && vehicle?.vehicle_model) {
                const vehicleDisplayName = `${vehicle?.manufacturer[1]}, ${vehicle?.vehicle_model[1]}`
                setVehicle(vehicleDisplayName);
            }
        });
    };

    const navigateToGoogleMaps = () =>{
        const url = `https://www.google.com/maps/dir/?api=1&destination=${branch?.latitude},${branch?.longitude}&travelmode=driving`;
        Linking.openURL(url);
    }

    return (
        <View style={styles.container}>
            <BackHeader title={branch?branch.name:'Order Detail'} leftPress={()=>{
                navigation.navigate('OrderHistory');
                setOnDemandOrder(null);
            }} rightTitle={"Support"} rightIcon={Cart} RightPress={() => {navigation.navigate("GorexSupport");}}/>
            <ScrollView contentContainerStyle={styles.contentContainer} style={styles.paddedContent}>
                <View style={styles.barcodeContainer}>
                    <QRCode size={200} value={`${order?.id}`} />
                    <Text style={styles.heading2}>Upon arrival, please show this QR code to the operator.</Text>
                </View>
                <Divider style={{ margin: hp(2) }} />
                <View style={styles.row}>
                    <Text style={styles.leftTitle}>{t("order.Job Order #")}</Text>
                    <Text style={styles.rightValue}>{order?.sequence_no}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.leftTitle}>{t("order.Order Status")}</Text>
                    <Text style={[styles.incomplete, {color: order?.status === "cancel" ? Colors.RED : order?.status === "draft" ? Colors.OLIVE : Colors.DARKERGREEN,},]}>
                        {(order?.status === "draft" || order?.status === "order_placed" || order?.status === "order_accepted") ? t('order_history.Incompleted') : order?.status}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.leftTitle}>{t("order.Payment Method")}</Text>
                    <Text style={styles.rightValue}>{order?.payment_method || "Cash"}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.leftTitle}>{t("Order Amount")}</Text>
                    <Text style={styles.rightValue}> {"SAR " + order?.sub_total}</Text>
                </View>
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("ViewPayment", {id: order?.id})}>
                    <Text style={styles.leftTitle}>{t("Order List")}</Text>
                    <Text style={styles.viewlist}> {"View"}</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                    <Text style={styles.leftTitle}>{t("order.Vehicle")}</Text>
                    <Text style={styles.rightValue}>{vehicle}</Text>
                </View>
                <CancelOrderModel
                    onPress={async () => {
                        setmodalCart(false);
                        refRBSheet.current.open();
                    }}
                    setmodalCart={setmodalCart}
                    modalCart={modalCart}
                />
                {(order?.on_demand && order?.status === "order_placed") || (!order?.on_demand && ( order?.status === "draft" || order?.status === "order_placed" || order?.status === "order_accepted")) ? (
                    <SmallButton title={t("Cancel Order")} onPress={() => setmodalCart(true)} backgroundColor={Colors.RED}/>
                ) : null}
            </ScrollView>
            <RBSheet
                height={hp(450)}
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                    wrapper: {
                        backgroundColor: "#17151FB3",
                    },
                    draggableIcon: {
                        backgroundColor: "#000",
                    },
                }}
            >
                <TouchableOpacity style={{position: "absolute", top: 10, right: 20,}} onPress={() => {refRBSheet.current.close();}}>
                    <Text style={{color: Colors.BLACK, fontFamily: Fonts.PoppinsMedium, ...FontSize.rfs15,}}>Cancel</Text>
                </TouchableOpacity>
                <View>
                    <View style={{ marginLeft: 20, marginTop: 15 }}>
                        <CustomCheckBox
                            checkstyle={{ width: 20, height: 20 }}
                            setChecked={() => setCountry(`Service provider is far away from me`)}
                            checked={country === `Service provider is far away from me`}
                            hideRight
                            title="Service provider is far away from me"
                            titlestyle={{marginLeft: 10, color: Colors.BLACK, ...FontSize.rfs16, fontFamily: Fonts.LexendSemiBold,}}
                        />
                    </View>
                </View>
                <View style={{ marginLeft: 20 }}>
                    <CustomCheckBox
                        checkstyle={{ width: 20, height: 20 }}
                        setChecked={() => setCountry(`I am out of Cash`)}
                        checked={country === `I am out of Cash`}
                        hideRight
                        title="I am out of Cash"
                        titlestyle={{marginLeft: 10, color: Colors.BLACK, ...FontSize.rfs16, fontFamily: Fonts.LexendSemiBold,}}
                    />
                </View>
                <View style={{ marginLeft: 20 }}>
                    <CustomCheckBox
                        checkstyle={{ width: 20, height: 20 }}
                        setChecked={() => setCountry(`I can't find the address`)}
                        checked={country === `I can't find the address`}
                        hideRight
                        title="I can't find the address"
                        titlestyle={{
                            marginLeft: 10,
                            color: Colors.BLACK,
                            ...FontSize.rfs16,
                            fontFamily: Fonts.LexendSemiBold,
                        }}
                    />
                </View>
                <View style={{ marginLeft: 20 }}>
                    <CustomCheckBox
                        checkstyle={{ width: 20, height: 20 }}
                        setChecked={() => setCountry(`other`)}
                        checked={country === `other`}
                        hideRight
                        title="other"
                        titlestyle={{
                            marginLeft: 10,
                            color: Colors.BLACK,
                            ...FontSize.rfs16,
                            fontFamily: Fonts.LexendSemiBold,
                        }}
                    />
                </View>
                <View>
                    <Text style={{marginBottom: 10, color: Colors.RED, textAlign: "center", ...FontSize.rfs16, fontFamily: Fonts.LexendMedium,}}>{reasonerror}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{marginBottom: 10, color: Colors.BLACK, ...FontSize.rfs16, fontFamily: Fonts.LexendMedium,}}>Talk to support?</Text>
                    </View>
                    <Divider style={{width: "100%", alignSelf: "center", marginBottom: 5, marginLeft: 5,}}/>
                </View>
                <TouchableOpacity
                    style={styles.sprt}
                    onPress={() => {
                        refRBSheet.current.close();
                        navigation.navigate("GorexSupport", {order: order});
                    }}
                >
                    <View style={{flexDirection: "row", fontWeight: "bold", alignItems: "center", justifyContent: "center",}}>
                        <Image style={{width:wp(20), height:wp(20), tintColor:Colors.WHITE}}  source={Request} />
                        <Text
                            style={{
                                color: "black",
                                fontWeight: "bold",
                                textAlign: "center",
                                alignSelf: "center",
                                fontFamily: Fonts.LexendBold,
                                ...FontSize.rfs14,
                                marginBottom: 5,
                                marginLeft: 5,
                            }}
                        >Request Support
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        if (!country) {
                            setReasonError(selectReasonerror);
                            return false;
                        }
                        refRBSheet.current.close();
                        CancelOrderId(order?.id, country?.toString()).then(
                            ({ success, response }) => {
                                if (success) {
                                    showToast("Order cancelled", response, "success");
                                } else {
                                    showToast("Order not cancelled", response, "error");
                                }
                            }
                        );
                        navigation.navigate("OrderHistory");
                    }}
                >
                    <Text style={styles.titless}>Confirm & Cancel</Text>
                </TouchableOpacity>
            </RBSheet>
            <Footer
                title={t('order_history.again')}
                // title={(order?.status === "draft" || order?.status === "order_placed" || order?.status === "order_accepted") ? "Ready to navigate?" : "Order Again?"}
                onPress={async () => {
                    const resetAction = CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Dashboard" }],
                    });
                    navigation.dispatch(resetAction);
                    // navigation.navigate("Dashboard");
                    // if ((order?.status === "draft" || order?.status === "order_placed" || order?.status === "order_accepted")) {
                    //     // navigation.navigate("Congratulations", {title: order?.branch?.title, totalprice: order?.total_price,});
                    //     navigateToGoogleMaps();
                    // } else {
                    //     navigation.navigate("PaymentMethod", {title: branch?.title, id, branch,});
                    // }
                }}
            />

            <Loader visible={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    paddedContent: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: wp(14),
    },
    bottombar: {
        height: 40,
        backgroundColor: Colors.DARKERGREEN,
        justifyContent: "space-between",
    },
    heading: {
        ...FontSize.rfs16,
        fontFamily: Fonts.LexendBold,
        textAlign: "left",
        color: Colors.BLACK,
        marginBottom: hp(11),
    },
    heading2: {
        ...FontSize.rfs18,
        fontFamily: Fonts.LexendMedium,
        textAlign: "center",
        color: Colors.BLACK,
        width: "70%",
        paddingVertical: Utilities.hp(3),
    },
    viewlist: {
        ...FontSize.rfs14,
        fontFamily: Fonts.LexendBold,
        textAlign: "left",
        color: Colors.DARKERGREEN,
        textDecorationLine: "underline",
    },
    title: {
        ...FontSize.rfs16,
        fontFamily: Fonts.LexendRegular,
        textAlign: "left",
        color: Colors.BLACK,
        marginBottom: hp(11),
    },
    rowContainer: {
        marginLeft: wp(18),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    price: {
        ...FontSize.rfs16,
        fontFamily: Fonts.LexendRegular,
        textAlign: "left",
        color: Colors.GREEN,
        marginRight: wp(18),
    },
    rightView: {
        flexDirection: "row",
        alignItems: "center",
    },
    barcodeContainer: {
        marginTop: hp(25),
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: Utilities.hp(1.2),
        paddingVertical: Utilities.hp(0.3),
    },
    leftTitle: {
        ...FontSize.rfs18,
        fontFamily: Fonts.LexendBold,
        textAlign: "left",
        color: Colors.BLACK,
    },
    rightValue: {
        ...FontSize.rfs14,
        fontFamily: Fonts.LexendMedium,
        color: "#B8B9C1",
    },
    incomplete: {
        ...FontSize.rfs14,
        fontFamily: Fonts.LexendBold,
        textAlign: "left",
        color: Colors.ORANGE,
        textTransform: "capitalize",
    },
    centerTitle: {
        ...FontSize.rfs16,
        fontFamily: Fonts.LexendBold,
        color: Colors.BLACK,
        textAlign: "center",
        marginTop: 8,
        marginBottom: hp(15),
    },
    subView: {
        flexDirection: "row",
        width: "48%",
        justifyContent: "space-between",
    },
    subTitle: {
        ...FontSize.rfs12,
        fontFamily: Fonts.SFProDisplaySemiBold,
        textAlign: "left",
        color: Colors.BLACK,
        marginRight: wp(20),
    },
    subValue: {
        ...FontSize.rfs11,
        fontFamily: Fonts.SFProDisplaySemiBold,
        textAlign: "left",
        color: Colors.BLACK_OPAC,
        marginRight: wp(20),
    },
    rowContent: {
        flexDirection: "row",
        marginBottom: hp(10),
    },
    titless: {
        color: Colors.WHITE,
        fontFamily: Fonts.LexendBold,
        textAlign: "left",
        ...FontSize.rfs14,
    },
    btn: {
        alignItems: "center",
        backgroundColor: "#FF2C3C",
        borderRadius: 5,
        height: hp(60),
        marginBottom: 10,
        justifyContent: "center",
        width: wp(330),
        alignSelf: "center",
        top: 0,
    },
    sprt: {
        alignItems: "center",
        backgroundColor: Colors.ORANGE,
        borderRadius: 30,
        height: hp(60),
        marginBottom: 10,
        justifyContent: "center",
        width: wp(330),
        alignSelf: "center",
        top: 0,
    },
});

export default OrderDetails;
