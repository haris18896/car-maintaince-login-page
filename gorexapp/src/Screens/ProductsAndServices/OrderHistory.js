//import liraries

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import EmptyList from "../../Components/EmptyList";
import BackHeader from "../../Components/Header/BackHeader";
import { WHITE } from "../../constants/colors";
import { getOrders } from "../../store/actions/order";
import { groupBy } from "../../utils/common";
import { wp } from "../../utils/responsiveSizes";
import OrderCard from "./ components/OrderCard";

import TabBarOrder from "./ components/TabBarOrder";

// create a component
const OrderHistory = () => {
  const [active, setActive] = useState(2);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchData = () => {
    setLoading(true);
    dispatch(getOrders()).then((res) => {
      setLoading(false);
      if (!res?.payload?.error) {
        const groupedOrders = groupBy(res?.payload, "status");
        // console.log(JSON.stringify(res?.payload, null, 2));
        setOrders(groupedOrders);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <BackHeader title={t("order_history.Order History")} />
      <TabBarOrder active={active} setActive={setActive} />
      <View style={styles.paddedContent}>
        <FlatList
          data={
            active == 1
              ? orders?.completed
              : active == 2
              ? orders?.incomplete
              : orders?.accepted
          }
          ListEmptyComponent={EmptyList}
          onRefresh={() => fetchData()}
          refreshing={loading}
          renderItem={({ item }) => <OrderCard order={item} active={active} />}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  paddedContent: {
    paddingHorizontal: wp(14),
    flex: 1,
  },
});

//make this component available to the app
export default OrderHistory;
