import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, Badge, Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {arrowright, Premium_black} from '../../../assets';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import CustomText from '../../../components/Text';
import {GradientButtonyellow} from '../../../components/GradientButton';
import {connect} from 'react-redux';
import moment from 'moment';
import {CommonActions} from '@react-navigation/routers';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MemberShipinfo = ({params, user, navigation}) => {
  console.log('userdata comes here', user);

  console.log('my log time', moment(user.created_at).format('Do MMMM YYYY'));

  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header
          containerStyle={{height: 130}}
          backgroundColor={'transparent'}
          leftComponent={
            <View
              style={{
                flexDirection: 'row',
                width: 400,
                alignItems: 'center',
              }}>
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
                  title={'Membership information'}
                  type={'large'}
                  color={colors.secondary}
                  style={{fontSize: 24, marginLeft: 10}}
                />
                <CustomText
                  title={'Review your membership information below'}
                  type={'medium'}
                  color={'black'}
                  style={{fontSize: 11, marginLeft: 10}}
                />
              </View>
            </View>
          }
        />
        <View style={{marginLeft: 25, marginTop: 3}}>
          <Text style={styles.sorry}>Premium membership status</Text>
          <Text>Expired</Text>
        </View>
        <View style={{marginLeft: 25, marginTop: 25}}>
          <Text style={styles.sorry}>Profile created on</Text>
          <Text>{moment(user.created_at).format('Do MMMM YYYY')}</Text>
        </View>
        <View style={{marginLeft: 25, marginTop: 25}}>
          <Text style={styles.sorry}>Pro package purchased on?</Text>
          <Text>N/A</Text>
        </View>
        <View style={{marginLeft: 25, marginTop: 25}}>
          <Text style={styles.sorry}>Renewal date</Text>
          <Text>N/A</Text>
        </View>
        <View style={{marginLeft: 25, marginTop: 25}}>
          <Text style={styles.sorry}>Refund policy</Text>
        </View>
        <View style={{marginLeft: 15}}>
          <Text style={{lineHeight: 20, padding: 10}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Quisque
            consequat posuere feugiat. Mauris vel arcu accumsan, consectetur
            velit nec, interdum ante. Nullam nec pharetra nisl, at tempor dolor.
            Quisque at diam ligula
          </Text>
        </View>
        <View style={{marginLeft: 25, marginTop: 15}}>
          <Text> Quisque at diam ligula.</Text>
        </View>

        <View style={{marginTop: 60, marginBottom: 10}}>
          <TouchableOpacity>
            <GradientButtonyellow
              iconRight={arrowright}
              iconLeft={Premium_black}
              onButtonPress={() => {
                navigation.navigate('UnlockProFeature');
              }}
              title="Upgrade to pro"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  const {user} = state.auth;
  return {user};
};
export default connect(mapStateToProps, {})(MemberShipinfo);

const styles = StyleSheet.create({
  sorry: {
    fontSize: 20,
    color: colors.secondary,
    fontFamily: fonts.PoppinsBold,
  },
});
