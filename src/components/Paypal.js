import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import qs from 'qs';
import {Loading} from '../components/Loading';
import {WebView} from 'react-native-webview';
import {colors} from 'react-native-elements';
import {CommonActions} from '@react-navigation/native';
import {transaction} from '../redux/actions/app';
import {connect} from 'react-redux';
class Paypal extends Component {
  state = {
    accessToken: null,
    approvalUrl: null,
    paymentId: null,
    price: '',
    loading: false,
  };
  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const price = this.props.route.params.price;

      this.setState({price: price});
    });
  };
  componentWillUnmount = () => {
    this.focusListener.remove;
  };
  getAccessToken = () => {
    // this.setState({loading: true});
    var data = qs.stringify({
      grant_type: 'client_credentials',
    });
    var config = {
      method: 'post',
      url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic QVNMTkk1cTdoMmtqNk5KOGQ2akh3TkZxbnpJWW0wOGFDbm9hVU9jdEppZmhXSS1BSV9pWW5GTy1MblpZU3F1Q3FJNWhadXVsNGgtckZDeWo6RUd6Q2g4MG9BR2xyclpYNWhJVThKVWppZHFXeWxKTnVlQXFHMEM4SDgxODNqRjktUDA5LUVwZUJPOFlQRDBHZnVoQklzckFzVmdmMnRvRHE=',
      },
      data: data,
    };

    axios(config)
      .then(response => {
        const token = response.data.access_token;
        // console.log(JSON.stringify(token));
        this.setState(
          {
            accessToken: token,
          },
          () => {
            console.log('access token success');

            this.handleTransaction();
          },
        );
      })
      .catch(error => {
        console.log('access token error');
        console.log(error);
      });
  };
  handleTransaction = () => {
    let currency = this.props.route?.params?.price;

    // Data which will go in WebView for Transaction
    const params = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            total: currency,
            currency: 'GBP',
            details: {
              subtotal: currency,
              tax: '0',
              shipping: '0',
              handling_fee: '0',
              shipping_discount: '0',
              insurance: '0',
            },
          },
        },
      ],
      redirect_urls: {
        return_url: 'https://example.com',
        cancel_url: 'https://example.com',
      },
    };

    // rest api call to get payment id & approval url
    axios
      .post('https://api.sandbox.paypal.com/v1/payments/payment', params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.state.accessToken}`,
        },
      })
      .then(response => {
        const {id, links} = response.data;

        const approvalUrl = links.find(data => data.rel == 'approval_url');
        console.log('id, links Success');
        // this.setState({loading: false});
        this.setState({
          paymentId: id,
          approvalUrl: approvalUrl.href,
        });
      })
      .catch(err => {
        console.log('id, links error');
        console.log({err});
        alert(err);
        this.props.navigation.goBack();
      });
  };
  _onNavigationStateChange = async webViewState => {
    if (webViewState.url.includes('https://example.com/')) {
      this.setState({
        approvalUrl: null,
      });

      // const {PayerID, paymentId} = webViewState.url;
      const extractURL = webViewState.url;

      // getting paymentId & PayerID from string (form of link)
      const res = extractURL.split('=');
      const paymentId = res[1].slice(0, -6);
      const PayerID = res[3];

      axios
        .post(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
          {payer_id: PayerID},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.state.accessToken}`,
            },
          },
        )
        .then(async response => {
          console.log('done payment success');
          //   const key = response.gatewayResponse.data.state;
          const key = response?.data?.state;
          console.log(key);
          console.log(response);
          if (key === 'approved') {
            this.handlePaypalSuccess(response);
          }
        })
        .catch(err => {
          alert('Something went wrong');
          console.log('done payment error');
          console.log({...err});
        });
    }
  };
  handlePaypalSuccess = async () => {
    try {
      this.setState({loading: true});
      const formData = new FormData();
      formData.append(
        'transaction_id',
        response?.data?.transactions[0]?.related_resources[0]?.sale?.id,
      );
      formData.append('status', 'Completed');
      formData.append('amount', '20');
      formData.append('phone_no', user?.phone);
      formData.append('payment_method', 'paypal');
      console.log(formData);
      const ress = await this.props.transaction(formData, user?.auth);
      console.log(ress.data.message);
      this.setState({loading: false, msg: ress.data.message, showAlert: true});

      setTimeout(() => {
        this.props.navigation.goBack();
      }, 2000);

      // formData.append('stripeToken', token);
      // formData.append('stripeToken', token);
    } catch (error) {
      console.log(error);
      this.setState({loading: false, msg: ress.data.message, showAlert: true});
      setTimeout(() => {
        this.props.navigation.goBack();
      }, 2000);
      // alert(error.message);
    }
  };
  render() {
    const {approvalUrl, price} = this.state;
    return (
      <SafeAreaView style={{flex: 1, marginTop: 20}}>
        <Loading visible={this.props.isLoading} />
        {approvalUrl ? (
          <WebView
            style={{height: 400, width: '100%'}}
            source={{uri: approvalUrl}}
            onNavigationStateChange={webViewState =>
              this._onNavigationStateChange(webViewState)
            }
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            renderLoading={() => <Loading visible />}
          />
        ) : (
          <View
            style={{
              flex: 1,

              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Image
              source={{
                uri: 'https://propakistani.pk/wp-content/uploads/2018/09/paypal-900x506.png',
              }}
              style={{height: 150, width: 150, alignSelf: 'center'}}
            />
            <View style={{flex: 0.6, justifyContent: 'center'}}>
              <View>
                <Text
                  style={[
                    {
                      fontFamily: Fonts.PoppinsMedium,
                      fontSize: 18,
                      marginBottom: 10,
                      alignSelf: 'center',
                    },
                  ]}>
                  {'Total Amount To Pay'}
                </Text>
                <Text
                  style={[
                    {
                      fontFamily: Fonts.PoppinsMedium,
                      fontSize: 25,
                      marginBottom: 10,
                      alignSelf: 'center',
                    },
                  ]}>
                  {this.props.route?.params?.price}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: colors.primary,
                  width: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  borderRadius: 4,
                  marginTop: 10,
                }}
                activeOpacity={0.9}
                onPress={() => this.getAccessToken()}>
                <Text style={{color: 'white'}}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Loading visible={this.state.loading} />
      </SafeAreaView>
    );
  }
}

export default connect(null, {transaction})(Paypal);
