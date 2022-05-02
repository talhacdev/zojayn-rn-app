import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import fonts from '../theme/fonts';
import propTypes from 'prop-types';
import colors from '../theme/colors';

const Button = ({
  style,
  backgroundColor,
  textColor,
  title,
  enable = true,
  onPress,
  textStyle,
}) => {
  const {containerStyle, text} = styles;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        {
          opacity: enable ? 1 : 0.3,
          backgroundColor,
        },
        containerStyle,
        style,
      ]}
      disabled={!enable}
      onPress={onPress}>
      <Text style={[{color: textColor}, text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
const margin = 20;
const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.primary,
    // padding: 2,
    flexDirection: 'row',

    // height: 45,
    justifyContent: 'center',
    margin: margin / 2,
    marginTop: margin * 1,
  },
  text: {
    fontSize: 16,
    padding: margin / 2,
    fontFamily: fonts.PoppinsBold,
    // top: Platform.OS === 'ios' ? 5 : 0,
  },
});

Button.propTypes = {
  backgroundColor: propTypes.string,
  textColor: propTypes.string,
  title: propTypes.string.isRequired,
  onPress: propTypes.func,
  enable: propTypes.bool,
  style: propTypes.object,
};

export default Button;
