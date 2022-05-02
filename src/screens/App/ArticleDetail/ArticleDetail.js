import React, {useState, useEffect} from 'react';
import {ImageBackground, Text, View, Image, Dimensions} from 'react-native';
import {Header, Badge} from 'react-native-elements';
import colors from '../../../theme/colors';
import CustomText from '../../../components/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import styles from './styles';
import {
  updown,
  Chevron_multicolor_up,
  Chevron_multicolor_down,
  Circled_favorite_off,
  Circled_favorite_on,
  Circled_edit,
} from '../../../assets';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
const {width, height} = Dimensions.get('window');
import fonts from '../../../theme/fonts';
import {connect} from 'react-redux';
import {makefavArticles} from '../../../redux/actions/app';
import {storeurl} from '../../../redux/actions/storeurl';
import axios from 'axios';
import {Loading} from '../../../components/Loading';

const ArticleDetail = ({route, makefavArticles, user}) => {
  const [loading, setLoading] = useState(false);
  const [isliked, setisliked] = useState(Circled_favorite_off);
  const {item} = route?.params;
  const navigation = useNavigation();

  console.log('my item', item);

  const handleLogin = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('articleid', item.id);
    axios
      .post(`${storeurl}api/make_article_fav`, formData, {
        headers: {
          auth: user.auth,
        },
      })
      .then(res => {
        if (res.data.status == true) {
          if (res.data.data == '1') {
            setisliked(Circled_favorite_off);
          } else {
            setisliked(Circled_favorite_on);
          }

          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        rej(err.message);
        console.log('api response erro', err.message);
      });
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append('articleid', item.id);
    axios
      .post(`${storeurl}api/if_article_liked`, formData, {
        headers: {
          auth: user.auth,
        },
      })
      .then(res => {
        console.log('api response', res);
        if (res.data.status == true) {
          if (res.data.data == '1') {
            setisliked(Circled_favorite_off);
          } else {
            setisliked(Circled_favorite_on);
          }

          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        rej(err.message);
        console.log('api response erro', err.message);
      });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Loading visible={loading} />
      <ScrollView>
        <View style={{flexDirection: 'row', marginTop: 60}}>
          <View style={{paddingTop: 10, paddingLeft: 10}}>
            <Ionicons
              name={'chevron-back'}
              size={20}
              color={colors.secondary}
              style={{alignItems: 'center'}}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          <View>
            <Text
              style={{
                color: colors.secondary,
                fontSize: 26,
                fontFamily: fonts.PoppinsBold,
                paddingLeft: 20,
              }}>
              {item?.article_header}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{textAlign: 'center'}}>
            by Mahmut oslun - 1 week ago
          </Text>
        </View>

        <View style={{marginTop: 30}}>
          <TouchableOpacity style={styles.cardContainer} activeOpacity={1}>
            <ImageBackground
              style={{width: '100%', height: height / 3.2}}
              source={{
                uri: item?.article_picture
                  ? item?.article_picture
                  : 'https://wise.edu.pk/wp-content/uploads/2021/03/placeholder.png',
              }}></ImageBackground>
            <View style={{position: 'absolute', right: 15, bottom: 15}}>
              <TouchableOpacity
                onPress={() => {
                  handleLogin();
                }}>
                <Image
                  style={{alignSelf: 'flex-end', height: 40, width: 40}}
                  source={isliked}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            marginVertical: 10,
          }}></View>
        <CustomText
          title={item?.article_content}
          type={'normal'}
          color={'black'}
          style={{
            fontSize: 12,
            padding: 20,
            fontFamily: fonts.PoppinsMedium,
            fontSize: 15,
          }}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  const {user} = state.auth;
  return {user};
};
export default connect(mapStateToProps, {makefavArticles})(ArticleDetail);
