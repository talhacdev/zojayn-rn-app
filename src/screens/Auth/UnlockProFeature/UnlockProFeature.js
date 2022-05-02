import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import {logocolored, Rate_on, Rate_off} from '../../../assets';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  GradientButton,
  GradientsigninButton,
} from '../../../components/GradientButton';
const {height, width} = Dimensions.get('window');
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Svg, {
  Ellipse,
  G,
  Path,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  Circle,
} from 'react-native-svg';

const UnlockProFeature = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.Top}>
          <Image
            source={logocolored}
            style={{
              height: 140,
              width: 140,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: '2%',
            }}
          />
        </View>
        <View style={{marginTop: 60, marginBottom: 30}}>
          <Text style={styles.Toptext}>Unlock Pro Features</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View
            style={{flex: 0.3, alignItems: 'flex-end', width: 100, height: 30}}>
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                alignItems: 'flex-end',
              }}
              source={Rate_on}
            />
          </View>
          <View style={{flex: 0.7}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: fonts.PoppinsMedium,
                textAlign: 'left',
                paddingLeft: 10,
              }}>
              Instant messaging
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View
            style={{flex: 0.3, alignItems: 'flex-end', width: 100, height: 30}}>
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                alignItems: 'flex-end',
              }}
              source={Rate_on}
            />
          </View>
          <View style={{flex: 0.7}}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'left',
                fontFamily: fonts.PoppinsMedium,
                paddingLeft: 10,
              }}>
              See who likes you
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View
            style={{flex: 0.3, alignItems: 'flex-end', width: 100, height: 30}}>
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                alignItems: 'flex-end',
              }}
              source={Rate_on}
            />
          </View>
          <View style={{flex: 0.7}}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'left',
                fontFamily: fonts.PoppinsMedium,
                paddingLeft: 10,
              }}>
              Upload your Video
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View
            style={{flex: 0.3, alignItems: 'flex-end', width: 100, height: 30}}>
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                alignItems: 'flex-end',
              }}
              source={Rate_on}
            />
          </View>
          <View style={{flex: 0.7}}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'left',
                fontFamily: fonts.PoppinsMedium,
                paddingLeft: 10,
              }}>
              View Photos of users
            </Text>
          </View>
        </View>

        <View style={{marginTop: 40}}>
          <Text style={styles.bottomtext}>50% of this month</Text>

          <Text style={{textAlign: 'center', fontSize: 18}}>
            From{' '}
            <Text style={{textDecorationLine: 'line-through'}}>10,000Rs</Text>{' '}
            to 49999Rs per month{'\n'} limited time offer
          </Text>
        </View>
        <View style={{marginTop: 60}}>
          <TouchableOpacity>
            <GradientsigninButton
              iconLeft={Rate_off}
              onButtonPress={() => {
                navigation.navigate('Payment');
              }}
              title="Upgrade Membership"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  Top: {
    alignItems: 'center',
    marginTop: 100,

    justifyContent: 'center',
  },
  image: {
    height: 150,
    width: width - 250,
    backgroundColor: 'red',
  },
  Toptext: {
    textAlign: 'center',
    color: colors.secondary,
    fontFamily: fonts.PoppinsBold,
    fontSize: 30,
  },
  bottomtext: {
    textAlign: 'center',
    color: colors.secondary,
    fontFamily: fonts.PoppinsBold,
    fontSize: 18,
  },
});
export default UnlockProFeature;
