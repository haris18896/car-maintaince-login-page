import React from "react";

import { View, StyleSheet, Text, Image } from "react-native";
import BackHeader from "../Components/Header/BackHeader";
import Colors from "../Constants/Colors";
import Fonts from "../Constants/fonts";
import Utilities from "../utils/UtilityMethods";
import FontSize from "../Constants/FontSize";

const OfferDetail = ({ route }) => {
  const offer = route?.params?.offer;
  const title = route?.params?.title;

  return (
    <View style={styles.container}>
      <BackHeader title={title} />
      <View
        style={{
          margin: 10,
          shadowColor: "#171717",
          shadowOffset: { width: 3, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}
      >
        <Image
          style={styles.image}
          source={{ uri: `data:image/gif;base64,${offer?.image}` }}
        />
      </View>
      <Text style={styles.orderNumber}>{offer?.name}</Text>
      <Text style={styles.description}>{offer?.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: Utilities.wp(1),
    flex: 1,
  },

  orderNumber: {
    marginTop: Utilities.hp(2),
    marginLeft: Utilities.wp(4),
    fontFamily: Fonts.LexendBold,
    ...FontSize.rfs20,
    color: Colors.BLACK,
  },
  description: {
    marginTop: Utilities.hp(1.5),
    marginLeft: Utilities.wp(4),
    fontFamily: Fonts.LexendRegular,
    ...FontSize.rfs16,
    color: Colors.BLACK,
  },

  image: {
    width: Utilities.wp(93),
    height: Utilities.hp(30),
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
});

export default OfferDetail;
