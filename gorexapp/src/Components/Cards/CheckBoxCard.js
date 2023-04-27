import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";


import Colors from "../../Constants/Colors";
import FontSize from "../../Constants/FontSize";
import FontFamily from "../../Constants/FontFamily";
import { hp, wp } from "../../utils/responsiveSizes";
import { CheckBoxChecked, CheckBoxUnchecked } from "../../assets";

import CardWithShadow from "./CardWithShadow";

const CheckBoxCard = ({title,subTitle='', cardStyle, checked, onPress, isCheckboxOnRight=false}) => {
    return (
        <CardWithShadow cardStyle={[styles.cardStyle, cardStyle]}>
            <TouchableOpacity style={styles.cardContent} onPress={onPress}>
                {!isCheckboxOnRight &&
                <Image style={styles.checkBox} source={checked ? CheckBoxChecked : CheckBoxUnchecked} />
                }

                <Text style={[styles.title, {width:subTitle.length>0?'65%':'90%'}]}>{title}</Text>

                {subTitle.length > 0 &&
                    <Text style={styles.subtitle}>{subTitle} SAR</Text>
                }

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
        width: wp(20),
        height: wp(20),
        resizeMode: "contain",
        marginRight:'5%',
    },
    title: {
        width: '80%',
        ...FontSize.rfs16,
        ...FontFamily.medium,
        color: Colors.BLACK,
    },

    subtitle: {
        width: '20%',
        ...FontSize.rfs18,
        ...FontFamily.medium,
        color: Colors.DARKERGREEN,
        textAlign:'right',
    },
});

export default CheckBoxCard;
