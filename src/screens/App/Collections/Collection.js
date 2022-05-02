import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './styles';
import {Header, Badge} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../theme/colors';
const window = Dimensions.get('window');
import fonts from '../../../theme/fonts';
import {Loading} from '../../../components/Loading';
import {Alert} from 'react-native';
import CustomText from '../../../components/Text';

const Collection = ({params, navigation, userCart, getWinners, winners}) => {
  const [qty, setQty] = useState(0);
  const [loading, setLoading] = useState(false);
  // const productList = useState([
  const productList = [
    {
      id: 0,
      offer: 'Single for a new life',
      description: 'Please select a charity from member panel',
      qty: 0,
      tickt: 1,
      image:
        'https://assets.entrepreneur.com/content/3x2/2000/20160305000536-diamond.jpeg',
    },
    {
      id: 1,
      offer: 'Single for a new life',
      description: 'Please select a charity from member panel',
      qty: 0,
      tickt: 1,
      image:
        'https://assets.entrepreneur.com/content/3x2/2000/20160305000536-diamond.jpeg',
    },
    {
      id: 2,
      offer: 'Single for a new life',
      description: 'Please select a charity from member panel',
      qty: 0,
      tickt: 1,
      image:
        'https://assets.entrepreneur.com/content/3x2/2000/20160305000536-diamond.jpeg',
    },
    {
      id: 3,
      offer: 'Single for a new life',
      description: 'Please select a charity from member panel',
      qty: 0,
      tickt: 1,
      image:
        'https://assets.entrepreneur.com/content/3x2/2000/20160305000536-diamond.jpeg',
    },
    {
      id: 2,
      offer: 'Single for a new life',
      description: 'Please select a charity from member panel',
      qty: 0,
      tickt: 1,
      image:
        'https://assets.entrepreneur.com/content/3x2/2000/20160305000536-diamond.jpeg',
    },
    {
      id: 3,
      offer: 'Single for a new life',
      description: 'Please select a charity from member panel',
      qty: 0,
      tickt: 1,
      image:
        'https://assets.entrepreneur.com/content/3x2/2000/20160305000536-diamond.jpeg',
    },
  ];
  const sheet = useRef();
  const renderPages = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        style={styles.cardContainer}>
        <Image
          style={{
            height: 170,
            width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          source={{
            uri: 'https://static.toiimg.com/thumb/msid-73321657,imgsize-2309973,width-800,height-600,resizemode-75/73321657.jpg',
          }}
        />
        <Text
          style={[
            {
              color: 'black',
              fontFamily: Fonts.PoppinsMedium,
              fontSize: 12,
              marginTop: 10,
              color: colors.black,
              marginHorizontal: 10,
            },
          ]}>
          {item.offer + ':'}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              marginLeft: 12,
              marginVertical: 10,
            }}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Arh-avatar.jpg',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{width: '70%'}}>
              <Text
                style={[
                  {
                    color: 'black',
                    fontFamily: Fonts.PoppinsMedium,
                    fontSize: 10,
                    marginTop: 10,
                    color: colors.black,
                    marginLeft: 10,
                  },
                ]}>
                {'Alice Jakson'}
              </Text>
              <Text
                style={[
                  {
                    color: 'black',
                    fontFamily: Fonts.PoppinsMedium,
                    fontSize: 9,

                    color: colors.gray,
                    marginLeft: 10,
                  },
                ]}>
                {'Author | 23-09-2019'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                alert('user');
              }}
              style={{
                height: 20,
                width: 20,
                elevation: 4,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                alignSelf: 'center',
                marginLeft: 5,
              }}>
              <Ionicons name={'chevron-forward'} size={15} color={'gray'} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar content/>
      <Header
        backgroundColor={colors.primary}
        rightComponent={
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('Cart');
            }}>
            <MaterialCommunityIcons name="filter" size={23} color="white" />
          </TouchableOpacity>
        }
        centerComponent={
          <CustomText
            title={'Collection'}
            type={'medium'}
            color={'white'}
            style={{fontSize: 15}}
          />
        }
      />

      <FlatList
        data={productList}
        renderItem={renderPages}
        keyExtractor={(item, index) => item + index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </View>
  );
};

export default Collection;
