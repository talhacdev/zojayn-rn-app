import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Alert,
  Button,
} from 'react-native';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import {GradientButton} from '../../../components/GradientButton';
import CustomText from '../../../components/Text';
import Entypo from 'react-native-vector-icons/Entypo';
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

const SentRequest = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              alignItems: 'flex-end',
              paddingRight: 10,
              paddingTop: 10,
            }}>
            <Entypo name="cross" color="red" size={24} />
          </View>
          <View style={{alignItems:'center',}}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 77.351 64.976">
              <G
                id="Group_7879"
                data-name="Group 7879"
                transform="translate(-102.256 -2831.688)">
                <Path
                  id="Path_2538"
                  data-name="Path 2538"
                  d="M340.535,289.619h10.829a3.868,3.868,0,1,0,0-7.735H340.535a3.868,3.868,0,0,0,0,7.735Z"
                  transform="translate(-175.624 2560.633)"
                  fill="#f14d74"
                />
                <Path
                  id="Path_2539"
                  data-name="Path 2539"
                  d="M322.646,281.884H302.535a3.868,3.868,0,1,0,0,7.735h20.111a3.868,3.868,0,1,0,0-7.735Z"
                  transform="translate(-196.411 2560.633)"
                  fill="#f14d74"
                />
                <Path
                  id="Path_2540"
                  data-name="Path 2540"
                  d="M313.364,304.884H302.535a3.868,3.868,0,0,0,0,7.735h10.829a3.868,3.868,0,0,0,0-7.735Z"
                  transform="translate(-196.411 2573.215)"
                  fill="#f14d74"
                />
                <Path
                  id="Path_2541"
                  data-name="Path 2541"
                  d="M354.646,304.884H334.535a3.868,3.868,0,1,0,0,7.735h20.111a3.868,3.868,0,0,0,0-7.735Z"
                  transform="translate(-178.906 2573.215)"
                  fill="#f14d74"
                />
                <Path
                  id="Path_2542"
                  data-name="Path 2542"
                  d="M322.364,297.884a14.7,14.7,0,1,0,14.7,14.7A14.7,14.7,0,0,0,322.364,297.884Zm0,21.658a6.962,6.962,0,1,1,6.962-6.962A6.969,6.969,0,0,1,322.364,319.542Z"
                  transform="translate(-191.487 2569.386)"
                  fill="#8a2eff"
                />
                <Path
                  id="Path_2543"
                  data-name="Path 2543"
                  d="M335.364,274.884a14.7,14.7,0,1,0,14.7,14.7A14.7,14.7,0,0,0,335.364,274.884Zm0,21.658a6.962,6.962,0,1,1,6.962-6.962A6.969,6.969,0,0,1,335.364,296.542Z"
                  transform="translate(-184.376 2556.804)"
                  fill="#8a2eff"
                />
              </G>
            </Svg>
          </View>

          <View style={{paddingTop: 20, width: '100%', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                color: colors.secondary,
                fontFamily: fonts.PoppinsBold,
              }}>
              Request sent
            </Text>
          </View>
          <Text style={{textAlign: 'center'}}>
            you will be notified if the request has been granted
          </Text>
          <View style={{paddingTop: 50}}>
            <GradientButton title="Back to profile" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default SentRequest;
