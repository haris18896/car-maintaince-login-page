import React, {useContext, useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, FlatList } from "react-native";
import { MenuBlack } from "../../assets";
import BackHeader from "../../Components/Header/BackHeader";
import NoOrder from "../../Components/NoOrder";
import Colors from "../../Constants/Colors";
import GetOrderHistory from "../../api/GetOrderHistory";
import {hp, wp} from "../../utils/responsiveSizes";
import OrderCard from "./components/OrderCard";
import TabBarOrder from "./components/TabBarOrder";
import {CommonContext} from "../../contexts/ContextProvider";
import {showToast} from "../../utils/common";

const OrderHistory = ({ navigation }) => {

  const {userProfile} = useContext(CommonContext);

  const [active, setActive] = useState(2);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    return navigation.addListener('focus', handleViewSwitch);
  }, [navigation]);

  const handleViewSwitch = () =>{
    fetchHistory().then();
  }

  const fetchHistory = async () => {
    GetOrderHistory({profileID:userProfile?.id, orderID:null}).then(({ success, response }) => {
      if (success) {
        setOrders(response);
      } else {
        showToast("Error", response, "error");
      }
    });
  }

  return (
    <View style={styles.container}>
      <BackHeader title={t("order_history.Order History")} leftIcon={MenuBlack} leftPress={() => navigation.openDrawer()}/>
      <TabBarOrder active={active} setActive={setActive} />
      <View style={styles.paddedContent}>
        <FlatList
            contentContainerStyle={{paddingBottom:hp(50)}}
          data={
            active === 1
              ? orders?.filter((order) => order?.status === "complete") : active === 2
              ? orders?.filter((order) => order?.status === "draft" || order?.status === "order_accepted" || order?.status === "order_placed") : orders?.filter((order) => order?.status === "cancel")
          }
          ListEmptyComponent={NoOrder}
          refreshing={loading}
          renderItem={({ item }) => <OrderCard order={item} active={active} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  paddedContent: {
    alignItems:'center',
    flex: 1,
  },
});

export default OrderHistory;
