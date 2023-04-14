import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";


import Colors from "../../Constants/Colors";
import FontSize from "../../Constants/FontSize";
import FontFamily from "../../Constants/FontFamily";
import { hp, wp } from "../../utils/responsiveSizes";
import { CheckBoxChecked, CheckBoxUnchecked } from "../../assets";

import CardWithShadow from "./CardWithShadow";

const CheckBoxCard = ({title, cardStyle, checked, onPress, isCheckboxOnRight=false}) => {
    return (
        <CardWithShadow cardStyle={[styles.cardStyle, cardStyle]}>
            <TouchableOpacity style={[styles.cardContent]} onPress={onPress}>
                {!isCheckboxOnRight &&
                <Image style={styles.checkBox} source={checked ? CheckBoxChecked : CheckBoxUnchecked} />
                }

                <Text style={styles.title}>{title}</Text>

                {isCheckboxOnRight &&
                <Image style={styles.checkBox} source={checked ? CheckBoxChecked : CheckBoxUnchecked} />
                }
            </TouchableOpacity>
        </CardWithShadow>
    )
};

const styles = StyleSheet.create({
    cardStyle: {
        width:'90%',// wp(186),
        height: hp(78),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf:'center',
        marginBottom: wp(8),
    },

    cardContent: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkBox: {
        width: '20%',
        height: wp(20),
        resizeMode: "contain"
    },
    title: {
        width: '80%',
        ...FontSize.rfs16,
        ...FontFamily.medium,
        color: Colors.BLACK,
    },
});

export default CheckBoxCard;
