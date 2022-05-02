import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import CustomText from '../../../components/Text';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import {
  updown,
  Chevron_multicolor_up,
  Chevron_multicolor_down,
} from '../../../assets';
//redux
import {connect} from 'react-redux';
import {getFaqs, getFaqs1} from '../../../redux/actions/app';
import {Loading} from '../../../components/Loading';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
const FAQs = ({params, getFaqs, faqs, getFaqs1}) => {
  const navigation = useNavigation();
  const [index1, setIndex] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsub = getfaq();
    return () => unsub;
  }, []);
  const getfaq = async () => {
    setLoading(true);
    new Promise((rsl, rej) => {
      getFaqs(rsl, rej);
    })
      .then(res => {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };
  // const getfaq1 = async () => {
  //   setLoading(true);
  //   new Promise((rsl, rej) => {
  //     getFaqs1(rsl, rej);
  //   })
  //     .then(res => {
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       setLoading(false);
  //     });
  // };
  return (
    <View style={{flex: 1, backgroundColor: 'white', marginTop: 10}}>
      {/* <Header
        containerStyle={{height: 150}}
        backgroundColor={'transparent'}
        leftComponent={ */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Ionicons
            name={'chevron-back'}
            size={20}
            color={colors.secondary}
            onPress={() => {
              navigation.goBack();
            }}
            style={{alignSelf: 'flex-end', marginRight: 10}}
          />
        </View>
        <View style={{flex: 9}}>
          <Text
            style={{
              fontSize: 26,
              color: colors.secondary,
              fontWeight: 'bold',
            }}>
            Frequently asked {'\n'} questions
          </Text>
        </View>

        {/* <Ionicons
              name={'chevron-back'}
              size={20}
              color={colors.secondary}
              onPress={() => {
                navigation.goBack();
              }}
              style={{marginBottom: 35, marginRight: 20}}
            />
            <View style={{}}>
              <CustomText
                title={'Frequently asked  questions'}
                type={'large'}
                color={colors.secondary}
                style={{fontSize: 24, marginRight: 70}}
              />
              <CustomText
                title={'you can search your queries here'}
                type={'medium'}
                color={'black'}
                style={{fontSize: 14, marginLeft: 5, marginTop: 5}}
              />
            </View> */}
      </View>
      <View style={{paddingLeft: 45}}>
        <Text
          style={{
            fontSize: 14,
            color: 'black',
            marginBottom: 40,
            marginTop: 3,
          }}>
          you can search your queries here
        </Text>
      </View>
      {/* }
      /> */}
      <FlatList
        data={faqs}
        keyExtractor={item => item}
        renderItem={({item, index}) => {
          return (
            <View
              style={{padding: 20}}
              backgroundColor={index == index1 ? '#F5F5F5' : 'white'}>
              <TouchableOpacity
                onPress={() => {
                  setIndex(index);
                }}>
                <View style={styles.question}>
                  <View style={{width: '95%'}}>
                    {/* <CustomText
                    onPress={() => {
                      setIndex(index);
                    }}
                    color={index == index1 ? colors.secondary : 'black'}
                    title={item.faq_question}
                    type={'medium'}
                    style={{fontSize: 14}}
                  /> */}

                    <Text
                      style={{
                        fontSize: 17,
                        fontFamily: fonts.PoppinsBold,
                        color: index == index1 ? colors.secondary : 'black',
                      }}>
                      {item.faq_question}
                    </Text>
                  </View>
                  <View style={{width: '5%', paddingTop: 5}}>
                    <AntDesign
                      onPress={() => {
                        setIndex(index);
                      }}
                      name={index == index1 ? 'up' : 'down'}
                      size={15}
                      color={index == index1 ? colors.secondary : 'grey'}
                      style={{alignSelf: 'center'}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {index1 == index && (
                // <CustomText
                //   title={item.faq_answer}
                //   type={'normal'}
                //   color={'black'}
                //   style={{
                //     fontSize: 12,

                //     marginRight: 20,
                //     marginLeft: 20,
                //     marginBottom:10
                //   }}
                // />

                <Text
                  style={{
                    marginTop: 15,
                    fontFamily: fonts.PoppinsMedium,
                    lineHeight: 20,
                  }}>
                  {item.faq_answer}
                </Text>
              )}
            </View>
          );
        }}
      />
      <Loading visible={loading} />
    </View>
  );
};
const mapStateToProps = state => {
  const {faqs} = state.app;
  return {faqs};
};
export default connect(mapStateToProps, {getFaqs, getFaqs1})(FAQs);
const styles = StyleSheet.create({
  question: {
    flex: 1,
    // padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
