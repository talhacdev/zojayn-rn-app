import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CreditCardInput} from 'react-native-credit-card-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {transaction} from '../redux/actions/app';
import {useFocusEffect, CommonActions} from '@react-navigation/native';
import AlertModal from '../components/AlertModal';

import stripe from 'tipsi-stripe';
import {Loading} from '../components/Loading';

import fonts from '../theme/fonts';
import {Keyboard} from 'react-native';
stripe.setOptions({
  publishableKey:
    'pk_test_51HgnShGYaOd9p0vfKD2ykB2sLA0zFGE3REY9oIRAbftlrNhXVXYq62rY6CyxPtG386NYPnjQiEbH2hYRbh33d2QV003XIoHxOu',
});
const Stripe = ({
  navigation,
  user,
  userCart,
  totalPrice,
  route,
  placeorder,
  updateStatus,
  charityId,
  purchasePkg,
  transaction,
}) => {
  const [creditInfo, setCredit] = useState(null);
  const [loading, setLoader] = useState(false);
  const [msg, setMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const handlePurchase = () => {
    Keyboard.dismiss();
    if (!creditInfo) {
      alert('Kindly Enter credit card values');
    } else if (creditInfo && creditInfo.values.number === '') {
      Alert.alert('Roraa', 'Kindly enter credit card no');
    } else if (creditInfo && creditInfo.values.expiry === '') {
      Alert.alert('Roraa', 'Kindly enter credit card expiry');
    } else if (creditInfo && creditInfo.values.cvc === '') {
      Alert.alert('Roraa', 'Kindly enter credit card cvc');
    } else {
      handleCardPayPress();
    }
  };
  // const handleTest = () => {
  //   var stripe_url = 'https://api.stripe.com/v1/';
  //   var secret_key =
  //     'sk_test_51HJdsCLvMN9bDgprLUfV9Af419seG8VuXmhgY1dwAROMSYaMwlzbryBpFyszlyFnGOFNHeczdSTv7Up0fDo5xf3w00mZ8G6WTL';
  //   var cardDetails = {
  //     'card[number]': creditInfo.values.number,
  //     'card[exp_month]': creditInfo.values.expiry.split('/')[0],
  //     'card[exp_year]': creditInfo.values.expiry.split('/')[1],
  //     'card[cvc]': creditInfo.values.cvc,
  //   };

  //   var formBody = [];
  //   for (var property in cardDetails) {
  //     var encodedKey = encodeURIComponent(property);
  //     var encodedValue = encodeURIComponent(cardDetails[property]);
  //     formBody.push(encodedKey + '=' + encodedValue);
  //   }
  //   formBody = formBody.join('&');

  //   return fetch(
  //     stripe_url +
  //       'pk_test_51HJdsCLvMN9bDgprwaGqo8qeOSCVZvvXti1RvWgT4mgnx8fWzmY5U8r2S1JUoIliTa2aKr2eWO9J3ZLhZVHfq9U600dqkVN4fK',
  //     {
  //       method: 'post',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         Authorization: 'Bearer ' + secret_key,
  //       },
  //       body: formBody,
  //     },
  //   );
  // };
  const handleCardPayPress = async () => {
    try {
      const res = creditInfo.values.expiry.split('/');
      const token = await stripe.createTokenWithCard({
        number: creditInfo.values.number,
        expMonth: parseInt(res[0]),
        expYear: parseInt(res[1]),
        cvc: creditInfo.values.cvc,
      });
      console.log(token);
      setLoader(true);
      const formData = new FormData();
      formData.append('stripeToken', token.tokenId);
      formData.append('amount', 20);
      formData.append('phone_no', user?.phone);
      formData.append('payment_method', 'stripe');
      console.log(formData);
      const ress = await transaction(formData, user?.auth);
      console.log(ress.data.message);
      setLoader(false);
      setMsg(ress.data.message);
      setShowAlert(true);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
      // formData.append('stripeToken', token);
      // formData.append('stripeToken', token);
    } catch (error) {
      console.log(error);
      setLoader(false);
      // alert(error.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.cardBottom}>
        <Text style={[styles.medium, {color: 'white'}]}>
          Proceed to checkout
        </Text>
        <CreditCardInput
          value={creditInfo}
          onChange={change => setCredit(change)}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          handlePurchase();
        }}
        activeOpacity={1}
        style={[
          styles.button,
          {
            backgroundColor: colors.secondary,
            alignSelf: 'center',
            marginVertical: 20,
            width: '95%',
          },
        ]}>
        <Text style={[styles.medium, {color: 'white'}]}>Pay & Checkout</Text>
      </TouchableOpacity>
      <Loading visible={loading} />
      {showAlert && (
        <AlertModal
          heading={msg}
          button1="OK"
          form={true}
          onOkPress={() => {
            setShowAlert(false);
          }}
        />
      )}
    </KeyboardAwareScrollView>
  );
};
const mapStateToProps = state => {
  const {user} = state.auth;
  return {user};
};
export default connect(mapStateToProps, {transaction})(Stripe);

const styles = StyleSheet.create({
  priceCard: {
    flex: 1,

    marginRight: 15,
  },
  cardHeader: {
    height: '25%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  cardBody: {
    height: '55%',
  },
  headerMain: {
    color: 'white',
    fontSize: 17,
    fontFamily: fonts.PoppinsMedium,
  },
  headerSubtite: {
    fontSize: 15,
    color: 'white',
    fontFamily: fonts.PoppinsRegular,
  },
  cardBottom: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  butnStyle: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 100,
  },
  butnText: {
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
  },
  bg_basic: {
    backgroundColor: '#a719c3',
  },
  bg_standard: {
    backgroundColor: '#ff7794',
  },
  bg_premium: {
    backgroundColor: '#e23d7c',
  },
  border_basic: {
    borderColor: '#a719c3',
  },
  border_standard: {
    borderColor: '#ff7794',
  },
  border_premium: {
    borderColor: '#e23d7c',
  },
  circle: {
    width: 7,
    height: 7,
    borderRadius: 50,
    borderWidth: 2,
  },
  button: {
    backgroundColor: 'white',

    elevation: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 15,
    color: 'grey',
    fontFamily: fonts.PoppinsMedium,
  },
  medium: {fontFamily: fonts.PoppinsMedium, fontSize: 14},
});
