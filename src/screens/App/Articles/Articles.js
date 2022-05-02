import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import styles from './styles';
import CustomText from '../../../components/Text';

import {Header, Badge} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../theme/colors';
const window = Dimensions.get('window');
import fonts from '../../../theme/fonts';
import {Loading} from '../../../components/Loading';
import {Divider} from 'react-native-paper';
import {Alert} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

//redux
import {connect} from 'react-redux';
import {getArticles} from '../../../redux/actions/app';
import {ScrollView} from 'react-native-gesture-handler';
const Articles = ({articles, getArticles, user}) => {
  const [selected, setSelected] = useState('');
  const [myarticles, setarticles] = useState([]);
  const [allarticles, setallarticles] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);

    (async () => {
      const res = await getArticles('', user.id, '');
      if (res.data.status == true) {
        setallarticles(res.data.data);
        // setSelected('top');
      } else {
        setarticles([]);
      }
      setLoading(false);
    })();
  }, [selected]);

  useEffect(() => {
    if (selected == 'top') {
      setarticles(allarticles.zojayn);
    } else if (selected == 'like') {
      setarticles(allarticles.Islamic);
    } else if (selected == 'follow') {
      setarticles(allarticles.fav);
    }
  }, [selected]);

  const fetcharticles = async id => {
    setSelected(id);
  };

  const sheet = useRef();
  const renderPages = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ArticleDetail', {item});
        }}
        key={index}
        activeOpacity={0.9}
        style={styles.cardContainer}>
        <Image
          style={{
            height: 290,
            width: '100%',
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            // marginTop: 30,
          }}
          source={{
            uri: item.article_picture,
          }}
        />
        <Text
          style={[
            {
              color: 'black',
              fontFamily: fonts.PoppinsBold,
              fontSize: 16,
              marginTop: 10,
              color: colors.secondary,
              marginLeft: 10,
            },
          ]}>
          {item.article_header}
        </Text>
        <Text
          style={[
            {
              color: 'black',
              fontFamily: fonts.PoppinsMedium,
              fontSize: 12,
              color: colors.black,
              marginLeft: 10,
              marginBottom: 10,
              fontWeight: 'bold',
            },
          ]}>
          {item?.article_content?.slice(0, 90)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Header
          containerStyle={{marginVertical: 30}}
          backgroundColor={'white'}
          centerComponent={
            <View>
              <View style={{alignItems: 'center'}}>
                <CustomText
                  title={'Articles'}
                  type={'large'}
                  color={colors.secondary}
                  style={{fontSize: 26}}
                />
                <CustomText
                  title={'check out our collection below'}
                  type={'medium'}
                  color={'gray'}
                  style={{fontSize: 13, marginTop: 3}}
                />
              </View>
            </View>
          }
        />
        <View style={styles1.mainContainer}>
          <StatusBar content />
          <View style={styles1.header}>
            {/* <View style={styles1.top}>
            <View style={{}}></View>
          </View> */}
            <View style={styles1.tabs}>
              <TouchableOpacity
                onPress={() => {
                  fetcharticles('top');
                }}>
                <CustomText
                  title={'Zojayn'}
                  type={'large'}
                  color={selected == 'top' ? colors.secondary : colors.black}
                  style={{fontSize: 14, marginBottom: 8, paddingLeft: 20}}
                />
                {selected == 'top' && <Divider style={styles1.divider} />}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  fetcharticles('like');
                }}>
                <CustomText
                  title={'Islamic'}
                  type={'large'}
                  color={selected == 'like' ? colors.secondary : colors.black}
                  style={{fontSize: 14, marginBottom: 8, paddingLeft: 15}}
                />

                {selected == 'like' && <Divider style={styles1.divider} />}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  fetcharticles('follow');
                }}>
                <CustomText
                  title={'Favourites'}
                  type={'large'}
                  color={selected == 'follow' ? colors.secondary : colors.black}
                  style={{fontSize: 14, marginBottom: 8, paddingLeft: 10}}
                />

                {selected == 'follow' && <Divider style={styles1.divider} />}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FlatList
          data={myarticles}
          renderItem={renderPages}
          keyExtractor={(item, index) => item + index.toString()}
          showsVerticalScrollIndicator={false}
        />

        <Loading visible={loading} />
      </View>
    </ScrollView>
  );
};
const mapStateToProps = state => {
  const {user} = state.auth;
  const {articles} = state.app;
  return {articles, user};
};
export default connect(mapStateToProps, {getArticles})(Articles);
const styles1 = StyleSheet.create({
  tabs: {
    // justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomWidth: 0.5,

    marginHorizontal: 20,
  },
  mainContainer: {
    // flex: 1,
    // backgroundColor: 'white',
    // paddingBottom: 20,
  },
  header: {},

  divider: {
    height: 1.5,
    backgroundColor: colors.secondary,
    width: 80,
    // alignSelf:'flex-start',
    marginTop: 5,
    alignSelf: 'center',
  },
});
