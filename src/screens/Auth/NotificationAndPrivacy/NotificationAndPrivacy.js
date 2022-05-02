import React,{useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomText from '../../../components/Text';
import {Header, Badge, Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import {Switch} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  updateProfileIno,
} from '../../../redux/actions/auth';

// covered ? covered[0]?.photo_url : ''
const NotificationAndPrivacy = ({user,updateProfileIno,navigation}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(user.email_notifications=='Yes' ? true : false);
  const [visibility, setvisibility] = React.useState(user.search_visibility=='Yes' ? true : false);
  const [notifications, setnotifications] = React.useState(user.app_notifications=='Yes' ? true : false);

  
    const onToggleSwitch = async id => {
      console.log("form data 1",isSwitchOn);
        const formData = new FormData();
        setIsSwitchOn(!isSwitchOn);
        
        formData.append('email_notifications', isSwitchOn);
        formData.append('modal', 7);
        const res = await updateProfileIno(formData, user?.auth);
    
    };

    const searchvisibility = async id => {

        const formData = new FormData();
        setvisibility(!visibility);
        
        formData.append('search_visibility', visibility);
        formData.append('modal', 8);
        const res = await updateProfileIno(formData, user?.auth);
    
    };

    const searchnotifications = async id => {

      const formData = new FormData();
      setnotifications(!notifications);
      
      formData.append('app_notifications', notifications);
      formData.append('modal', 9);
      const res = await updateProfileIno(formData, user?.auth);
  
  };

    console.log("form data 3",isSwitchOn);

  

  
  


  return (
    <View style={{flex: 1,backgroundColor:'white'}}>
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
                title={'Notifications & Privacy'}
                type={'large'}
                color={colors.secondary}
                style={{fontSize: 28, marginLeft: 10}}
              />
              <CustomText
                title={'Manage your notification & privacy here'}
                type={'medium'}
                color={'black'}
                style={{fontSize: 13, marginLeft: 10}}
              />
            </View>
          </View>
        }
      />
      <View style={{marginLeft: 25, marginTop: 20}}>
        <Text style={styles.email}>Email notifications</Text>
        <Text style={{color: 'black'}}>Choose who can view your profile</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 30,
          paddingHorizontal: 30,
        }}>
        <View style={{width:'8%'}}>
          <Text style={{fontSize: 16}}>Off</Text>
        </View>
        <View style={{width:'13%'}}>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color="red"
          />
        </View>
        <View style={{width:'68%'}}>
          <Text style={{fontSize: 16}}>On</Text>
        </View>
      </View>
      <View style={{marginLeft: 25, marginTop: 20}}>
        <Text style={styles.email}>Search visibility</Text>
        <Text style={{color: 'black'}}>Manage your search visibility</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 30,
          paddingHorizontal: 30,
        }}>
        <View style={{width:'20%'}}>
          <Text style={{fontSize: 16}}>Invisible</Text>
        </View>
        <View style={{width:'13%'}}>
          <Switch
            value={visibility}
            onValueChange={searchvisibility}
            color="red"
          />
        </View>
        <View style={{width:'60%'}}>
          <Text style={{fontSize: 16}}>Visible</Text>
        </View>
      </View>
      <View style={{marginLeft: 25, marginTop: 20}}>
        <Text style={styles.email}>In app notifications</Text>
        <Text style={{color: 'black'}}>Manage your in app notifications</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 30,
          paddingHorizontal: 30,
        }}>
        <View style={{width:'20%'}}>
          <Text style={{fontSize: 16}}>Turn off</Text>
        </View>
        <View style={{width:'13%'}}>
          <Switch
            value={notifications}
            onValueChange={searchnotifications}
            color="red"
          />
        </View>
        <View style={{width:'60%'}}>
          <Text style={{fontSize: 16}}>Turn on</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  email: {
    fontSize: 22,
    color: colors.secondary,
    fontFamily: fonts.PoppinsBold,
  },
});

const mapStateToProps = state => {
  const {user} = state.auth;
  return {user};
};
export default connect(mapStateToProps, {
  updateProfileIno
})(NotificationAndPrivacy);
