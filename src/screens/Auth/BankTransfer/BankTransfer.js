import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import CustomText from '../../../components/Text';
import {Header, Badge, Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BankTransfer = () => {
  return (
    <View style={styles.container}>
      <Header
        containerStyle={{marginVertical: 40}}
        backgroundColor={'transparent'}
        leftComponent={
          <View
            style={{flexDirection: 'row', width: 500, alignItems: 'center'}}>
            <Ionicons
              name={'chevron-back'}
              size={20}
              color={colors.secondary}
              onPress={() => {
                navigation.goBack();
              }}
              style={{alignSelf: 'center'}}
            />
            <View>
              <CustomText
                title={'Bank Transfer Details'}
                type={'large'}
                color={colors.secondary}
                style={{fontSize: 28, marginLeft: 10}}
              />
              <CustomText
                title={'Bank accounts details for the payment'}
                type={'medium'}
                color={'black'}
                style={{fontSize: 13, marginLeft: 10}}
              />
            </View>
          </View>
        }
      />
      {/* <View style={styles.Bank}>
               <Text style={styles.banktext}> Bank Transfer Deatails</Text>
               <View style={{marginLeft:10}}>
               <Text>Bank accounts details for the payment</Text>
               </View>
              
            </View> */}
      <View style={{marginLeft: 25, marginTop: 10}}>
        <Text>
          Please transfer the payment via bank account and share{'\n'}the
          trannsaction information at +447474649682
        </Text>
      </View>
      <View style={{marginLeft: 25, marginTop: 60}}>
        <Text style={{fontSize: 16}}>Bank Name</Text>
        <Text style={{color: 'gray'}}>Allied Bank Limited</Text>
      </View>
      <View style={{marginLeft: 25, marginTop: 15}}>
        <Text style={{fontSize: 16}}>Accoun Title</Text>
        <Text style={{color: 'gray'}}>Dawah Software Limited</Text>
      </View>
      <View style={{marginLeft: 25, marginTop: 15}}>
        <Text style={{fontSize: 16}}>Account IBAN </Text>
        <Text style={{color: 'gray'}}>xxxx.xxxx.xxxx.xxxx.xxxx</Text>
      </View>
      <View style={{marginLeft: 25, marginTop: 15}}>
        <Text style={{fontSize: 16}}>Sort Code </Text>
        <Text style={{color: 'gray'}}>xx.xx.xx</Text>
      </View>
      <View style={{marginLeft: 25, marginTop: 30}}>
        <Text style={styles.Proof}>Proof of payment</Text>
        <Text>
          Please transfer the payment via bank account and share the{'\n'}{' '}
          trannsaction information at +447474649682.Once the payment is
          approved,we will activate your memebership.you will be via email and
          in app notification.{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  Bank: {
    marginTop: 50,
    marginLeft: 40,
  },
  banktext: {
    fontSize: 28,
    color: colors.primary,
    fontFamily: fonts.PoppinsBold,
  },
  Proof: {
    fontSize: 28,
    color: colors.secondary,
    fontFamily: fonts.PoppinsBold,
  },
});
export default BankTransfer;
