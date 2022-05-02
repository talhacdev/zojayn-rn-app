import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import fonts from '../theme/fonts';
import colors from '../theme/colors';
export const SocialButton = ({color, title, style, onPress}) => {
  const {containerStyle, mediumText} = styles;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[{backgroundColor: color}, containerStyle, style]}
      onPress={onPress}>
      <Text style={mediumText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;
const styles = StyleSheet.create({
  mediumText: {
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    color: colors.white,
  },
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
    height: 50,
    borderRadius: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
