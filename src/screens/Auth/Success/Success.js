import React, {useReducer, useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import Button from '../../../components/Button';
import CustomText from '../../../components/Text';
import styles from './styles';
import {SocialButton} from '../../../components/SocialButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//google
import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {set} from 'react-native-reanimated';
import {connect} from 'react-redux';
import {bells, arrowright,Success1,P,Bye} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {GradientButton,GradientsigninButton} from '../../../components/GradientButton';
import { ScrollView } from 'react-native-gesture-handler';
import {logoutSuccess} from '../../../redux/actions/auth';


const Success = ({route,userData,logoutSuccess}) => {
  const [secure, setisSecure] = useState(true);
  const [secure1, setisSecure1] = useState(true);
  const navigation = useNavigation();
  const {from} = route?.params;
  // const from = "signupsuccess";
  // const from = "acctdeleted";

  if(from=="acctdeleted"){
    
    (async () => {
      const res = await logoutSuccess();      
    })();

  }

  return (
    
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
            flexGrow: 1,
           
          
        }}>
        
        <View style={{justifyContent:'center',alignItems:'center'}}>

        {from=="signupsuccess" && (  
        <Image source={Success1} style={styles.logo_blue} />
        )}

        {/* <Image source={P} style={styles.logo_blue} /> */}
        {from=="acctdeleted" && (  
        <Image source={Bye} style={styles.logo_blue} />
        )}

        </View>
       
         <View>

        {from=="signupsuccess" && (    
        <CustomText
          title={'Sign up successful'}
          type={'large'}
          color={colors.primary}
          style={{fontSize: 24, alignSelf: 'center',marginTop:80,fontWeight:'bold' }}
        />
        )}

        {from=="acctdeleted" && (    
        <CustomText
          title={'Account Deleted'}
          type={'large'}
          color={colors.primary}
          style={{fontSize: 24, alignSelf: 'center',marginTop:80,fontWeight:'bold' }}
        />
        )}
        </View>
        <View>
        {from=="signupsuccess" && (
        <CustomText
          title={'Your account is now registered'}
          type={'medium'}
          color={'black'}
          style={{fontSize: 13, alignSelf: 'center', marginTop: 0, marginBottom: 10,fontWeight:'bold'}}
        />
        )}

        {from=="acctdeleted" && (
        <CustomText
          title={'Hope to see you again soon'}
          type={'medium'}
          color={'black'}
          style={{fontSize: 13, alignSelf: 'center', marginTop: 0, marginBottom: 10,fontWeight:'bold'}}
        />
        )}
        
       </View>
        
       {from=="signupsuccess" && (
        <GradientsigninButton
          title="Proceed Next"
          iconRight={arrowright}
          onButtonPress={() => {
            navigation.navigate('Profile', {params: {from: 'Additional Information'}});
          }}
        />
        )}

        {from=="acctdeleted" && (
        <View style={{marginTop:30}}>
          <GradientsigninButton
            title="Go to login screen"
            iconRight={arrowright}
            onButtonPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>  
        )}
       
      </KeyboardAwareScrollView>
     
    </SafeAreaView>
    
  );
};

const mapStateToProps = state => {
  const {user} = state.auth;
  return {userData: user};
};
export default connect(mapStateToProps, {logoutSuccess})(Success);
