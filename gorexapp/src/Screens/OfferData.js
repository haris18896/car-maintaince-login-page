import {  useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import BackHeader from "../Components/Header/BackHeader";
import Colors from "../Constants/Colors";
import Fonts from "../Constants/fonts";
import { hp, wp } from "../utils/responsiveSizes";
import Utilities from "../utils/UtilityMethods";
import { MenuBlack, NoOffers } from "../assets";
import GetOffers from "../api/GetOffers";
import {showToast} from "../utils/common";
import FontSize from "../Constants/FontSize";

const OfferData = () => {
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState("");

  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true)
    GetOffers().then(({ success, response }) => {
      setLoading(false)
      if (success) {
        setOffers(response);
      } else {
        showToast("Error", response, "error");
      }
    });
  }, []);

  const onScoll = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
          nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== selectedOffer) {
        setSelectedOffer(slide);
      }
    }
  };

  return (
      <View style={[styles.container, offers?.length === 0 && {flex: 1,}]}>
        <BackHeader leftPress={() => navigation.openDrawer()} leftIcon={MenuBlack} title={t("menu.Offers")}/>
        {offers?.length <= 0 && !loading ? (
            <View style={styles.container2}>
              <Image source={NoOffers} resizeMode="contain" style={styles.item}/>
              <Text style={styles.text}>{t("offers.noAvailableOffers")}</Text>
              <Text style={styles.title2}>{t("offers.checkBackLater")}</Text>
            </View>
        ) : (
            <>
              <FlatList
                  data={offers}
                  showsVerticalScrollIndicator={false}
                  horizontal
                  decelerationRate="fast"
                  bounces={false}
                  onScroll={({ nativeEvent }) => onScoll(nativeEvent)}
                  style={{height: Utilities.hp(35), marginTop: Utilities.hp(-3),}}
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled={true}
                  renderItem={({ item }) => (
                      <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("OfferDetail", {
                              offer: item,
                              title: item?.name,
                            });
                          }}
                          style={styles.transactionCards}
                      >
                        <Image
                            style={styles.images}
                            source={{ uri: `data:image/gif;base64,${item?.image}` }}
                        />
                      </TouchableOpacity>
                  )}
              />
              <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
              >
                {offers?.map((_, index) => {
                  let isActive = index === selectedOffer;
                  return (
                      <View
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: isActive
                                ? Colors.DARKERGREEN
                                : Colors.LIGHTGREY,
                            borderRadius: 999,
                            paddingHorizontal: isActive ? 10 : 0,
                            marginHorizontal: 2,
                          }}
                      />
                  );
                })}
              </View>
              <FlatList
                  data={offers}
                  contentContainerStyle={{ paddingBottom: 320 }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                      <TouchableOpacity
                          style={styles.transactionCard}
                          onPress={() =>
                              navigation.navigate("OfferDetail", {
                                offer: item,
                                title: item?.name,
                              })
                          }
                      >
                        <View style={styles.rightView}>
                          <Image
                              style={styles.image}
                              source={{ uri: `data:image/gif;base64,${item?.image}` }}
                          />
                        </View>
                        <View
                            style={{
                              alignSelf: "center",
                            }}
                        >
                          <Text style={styles.orderNumber}>{item?.name}</Text>
                          <Text style={styles.time}>
                            {item?.discount}
                            {"% discount"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                  )}
              />
            </>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: wp(10),
  },
  paddedContent: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  paymentTitle: {
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
    ...FontSize.rfs15,
    color: Colors.BLACK_OPAC,
    fontWeight: "bold",
  },
  price: {
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
    ...FontSize.rfs56,
    color: Colors.BLACK,
    fontWeight: "bold",
    marginTop: hp(5),
  },
  card: {
    height: hp(233),
    width: wp(348),
    backgroundColor: Colors.WHITE,
    marginTop: hp(25),
    borderRadius: hp(12),
    padding: hp(13),
    justifyContent: "space-around",
    margin: 4,
    elevation: 2,
    shadowColor: "#C7CCD1",
  },
  icon: {
    width: hp(60),
    height: hp(60),
    resizeMode: "contain",
  },
  transactionCards: {
    height: "70%",
    width: Utilities.wp(94),
    paddingHorizontal: 5,
    alignSelf: "center",
    marginTop: Utilities.hp(2),
    borderRadius: wp(20),
    justifyContent: "space-between",
    shadowColor: "#171717",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  transactionCard: {
    width: "95%",
    margin: Utilities.wp(2),
    borderRadius: wp(10),
    marginTop: Utilities.wp(2),
    flexDirection: "row",
    shadowColor: "#171717",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    padding: Utilities.wp(2),
    height: Utilities.hp(12),
    backgroundColor: Colors.WHITE,
  },
  orderNumber: {
    fontFamily: Fonts.PoppinsBold,
    ...FontSize.rfs14,
    color: Colors.BLACK,
    marginLeft: Utilities.wp(2),
  },
  wallet: {
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
    ...FontSize.rfs11,
    color: Colors.BLACK_OPAC,
    marginTop: hp(11),
  },
  transaction: {
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
    ...FontSize.rfs16,
    color: Colors.DARKERGREEN,
  },
  plus: {
    width: hp(47),
    height: hp(47),
  },
  time: {
    fontFamily: Fonts.LexendRegular,
    ...FontSize.rfs16,
    color: Colors.BLACK_OPAC,
    marginLeft: Utilities.wp(2),
  },
  rightView: {
    justifyContent: "center",
    alignItems: "center",
  },
  plusButton: {
    height: hp(40),
    width: hp(40),
    borderRadius: 7,
    backgroundColor: Colors.LIGHT_BLUE,
    position: "absolute",
    bottom: hp(20),
    right: hp(20),
    justifyContent: "center",
    alignItems: "center",
  },
  xText: {
    ...FontSize.rfs18,
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
    color: Colors.GREY_PLACEHOLDER,
  },
  nText: {
    ...FontSize.rfs18,
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
    color: Colors.BLACK,
  },
  cardHeading: {
    ...FontSize.rfs10,
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
    color: Colors.BLACK,
  },
  cardValue: {
    ...FontSize.rfs13,
    fontFamily: Fonts.LexendBold,
    textAlign: "left",
    color: Colors.BLACK,
  },
  numberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: hp(12),
  },
  holderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: hp(12),
  },
  allTransaction: {
    fontFamily: Fonts.LexendBold,
    ...FontSize.rfs15,
    color: Colors.BLACK,
    margin: 10,
  },
  image: {
    marginLeft: -10,
    width: wp(80),
    height: wp(80),
    borderBottomLeftRadius: wp(10),
    borderTopLeftRadius: wp(10),
    margin: wp(5),
  },
  images: {
    width: "100%",
    height: "100%",
    borderRadius: wp(10),
    resizeMode: "cover",
  },
  container2: {
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.8,
  },
  item: {
    height: hp(160),
    resizeMode: "contain",
    width: wp(105),
    marginTop: hp(60),
  },
  text: {
    color: Colors.BLACK,
    fontFamily: Fonts.LexendBold,
    textAlign: "center",
    ...FontSize.rfs24,
    marginTop: hp(5),
  },
  title2: {
    color: "#B8B9C1",
    width: "70%",
    fontFamily: Fonts.LexendMedium,
    textAlign: "center",
    ...FontSize.rfs14,
    marginTop: hp(10),
  },
});

export default OfferData;
