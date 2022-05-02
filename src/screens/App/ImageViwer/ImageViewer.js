import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Header, Badge} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../../../components/Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ImageViewer = ({params}) => {
  const navigation = useNavigation();
  const images = [
    'https://images.unsplash.com/photo-1549340442-f934e002eaaf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2VzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1584194081302-deed5be96f8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=756&q=80',
    'https://images.unsplash.com/photo-1607409610054-a1fe0563573f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
  ];

  return (
    <View style={{flex: 1}}>
      <Header
        backgroundColor={colors.secondary}
        leftComponent={
          <Ionicons
            name={'chevron-back'}
            size={20}
            color={'white'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
        centerComponent={
          <CustomText
            title={'Kadir'}
            type={'medium'}
            color={'white'}
            style={{fontSize: 15}}
          />
        }
        rightComponent={
          <MaterialCommunityIcons
            name={'dots-vertical'}
            size={20}
            color={'white'}
          />
        }
      />
      <Swiper
        containerStyle={{flex: 1}}
        autoplay
        autoplayTimeout={5}
        showsPagination={false}
        buttonColor={'white'}
        showsButtons>
        {images &&
          images.map(item => {
            return (
              <ImageBackground style={styles.slide} source={{uri: item}} />
            );
          })}
      </Swiper>
    </View>
  );
};

export default ImageViewer;
