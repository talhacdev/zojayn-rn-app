import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Header, Badge} from 'react-native-elements';
import fonts from '../../../theme/fonts';
import colors from '../../../theme/colors';
import CustomText from '../../../components/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {
  gpay,
  paypal,
  card,
  bank,
  easypesa,
  jazzcash,
  BankTransfer,
  BankCard,
  Apple_pay,
} from '../../../assets';
import BottomTabNavigator from '../../../navigation/BottomTab';
import {useNavigation} from '@react-navigation/native';

const Payment = ({}) => {
  const navigation = useNavigation();
  const [tab, setTab] = useState(1);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        containerStyle={{marginVertical: 40}}
        backgroundColor={'transparent'}
        leftComponent={
          <View
            style={{flexDirection: 'row', width: 350, alignItems: 'center'}}>
            <Ionicons
              name={'chevron-back'}
              size={20}
              color={colors.secondary}
              onPress={() => {
                navigation.goBack();
              }}
              style={{alignSelf: 'center'}}
            />
            <View style={{}}>
              <CustomText
                title={'Choose payment methods'}
                type={'large'}
                color={colors.secondary}
                style={{
                  fontSize: 25,
                  marginLeft: 10,
                  fontFamily: fonts.PoppinsBold,
                  fontWeight: 'bold',
                }}
              />
              <CustomText
                title={'Choose from the given payment methods below'}
                type={'medium'}
                color={'black'}
                style={{fontSize: 11, marginLeft: 10}}
              />
            </View>
          </View>
        }
      />

      <View
        style={{
          backgroundColor: 'gray',
          height: 1,
          marginHorizontal: 20,
          marginBottom: 15,
        }}></View>

      <FlatList
        data={new Array(5)}
        keyExtractor={item => item}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={[styles.card]}
              onPress={() => {
                if (index == 2) {
                  navigation.navigate('Paypal', {price: '20'});
                } else if (index == 1) {
                  navigation.navigate('Stripe', {price: '20'});
                }
                // alert(item);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <CustomText
                  title={
                    index == 0
                      ? 'Online Bank Transfer'
                      : index == 1
                      ? 'Debit Card / Credit Card'
                      : index == 2
                      ? 'Paypal'
                      : index == 3
                      ? 'Google Pay'
                      : 'Apple pay'
                  }
                  type={'large'}
                  color={'black'}
                  style={{fontSize: 15}}
                />
                <CustomText
                  title={
                    index == 0
                      ? 'Pay via your bank account'
                      : index == 1
                      ? 'Pay via Debit Card / Credit Card'
                      : index == 2
                      ? 'Pay via Paypal account'
                      : index == 3
                      ? 'Pay via your Google Pay account'
                      : 'Pay via your Google Pay account'
                  }
                  type={'normal'}
                  color={'gray'}
                  style={{fontSize: 12}}
                />
              </View>
              <Image
                resizeMode="contain"
                source={
                  index == 0
                    ? BankTransfer
                    : index == 1
                    ? BankCard
                    : index == 2
                    ? paypal
                    : index == 3
                    ? gpay
                    : Apple_pay
                }
                style={
                  index == 0
                    ? {width: 20, height: 20}
                    : index == 1
                    ? {width: 20, height: 15}
                    : index == 2
                    ? {width: 20, height: 20}
                    : index == 3
                    ? {width: 40, height: 40}
                    : {width: 40, height: 40}
                }
              />

              {/* <MaterialCommunityIcons
                name="bank-transfer"
                size={25}
                color="#ABABAB"
                style={{
                  alignSelf: 'center',
                  marginRight: 20,
              backgroundColor: 'white',borderColor: 'white',
              borderRadius: 100, elevation: 3,
              }}
              /> */}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Payment;
