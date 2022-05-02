import React from 'react';
import {Text, View, Animated, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HeaderRight = ({
  searchWidth,
  searchState,
  onPress,
  value,
  onChangeText,
}) => (
  <View style={{flexDirection: 'row'}}>
    <AntDesign
      name="search1"
      style={{
        alignSelf: 'center',
        fontSize: 20,
        color: 'white',
      }}
      onPress={onPress}
    />

    <Animated.View style={{width: searchWidth}}>
      <TextInput
        placeholder="Search..."
        placeholderTextColor={'white'}
        value={value}
        onChangeText={onChangeText}
        style={{
          width: '90%',
          borderRadius: 3,
          borderBottomWidth: searchState ? 0.8 : 0,
          borderColor: searchState ? '#ddd' : '#fff',
          paddingLeft: 10,
          color: 'white',
          marginBottom: 10,
        }}
      />
    </Animated.View>
  </View>
);

export default HeaderRight;
