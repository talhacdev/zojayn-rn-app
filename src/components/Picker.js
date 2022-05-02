import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from '../components/Text';
import fonts from '../theme/fonts';
import colors from '../theme/colors';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Picker = ({title, onPress, width}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.input,
        {
          marginTop: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width,
        },
      ]}>
      <CustomText
        title={title}
        type={'normal'}
        color={'gray'}
        style={{
          fontSize: 17,
        }}
      />
      <MaterialIcons
        name="arrow-drop-down"
        color="gray"
        size={25}
        style={{marginRight: 13}}
      />
    </TouchableOpacity>
  );
};

export default Picker;
const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    marginLeft: 20,

    borderBottomColor: colors.black,
    width: '90%',
    borderBottomWidth: 1,
    marginVertical: Platform.OS === 'ios' ? 25 : 10,
  },
});
