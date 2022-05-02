import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Alert,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {
  GradientButton,
  GradientsigninButton,
  GradientButtongrayPic,
} from './GradientButton';
import {Input} from './Input/Input';
import Entypo from 'react-native-vector-icons/Entypo';
import AlertModal from '../components/AlertModal';
import {search, logout, Circled_camera, Circled_Video, URL} from '../assets';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
const ImagePicker = require('react-native-image-picker');

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
import {Loading} from '../components/Loading';
import fonts from '../theme/fonts';
import {TextInput} from 'react-native-paper';
import colors from '../theme/colors';
import {gestureHandlerRootHOC, ScrollView} from 'react-native-gesture-handler';
import {storeurl} from '../redux/actions/storeurl';
import {connect} from 'react-redux';
import {
  signInWithPhone,
  signup,
  updateAccount,
  updateProfileIno,
  Blockuser,
  likeunlikeuser,
  updateAdditionalIno,
  logoutSuccess,
} from '../redux/actions/auth';
import {uploadPhoto, uploadcoverPhoto} from '../redux/actions/app';
import {Blocked_person, buttonBg, Filtered_search} from '../assets';

const Modal1 = ({
  status,
  onChange,
  userData,
  uploadPhoto,
  uploadcoverPhoto,
  updateProfileIno,
  Blockuser,
  likeunlikeuser,
  logoutSuccess,
}) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: ' 6',
    },
  ];

  console.log('userData', userData);

  const refRBSheet = useRef();
  const Item = ({title}) => (
    <View style={[styles.item]}>
      <Text
        style={[
          styles.title,
          {fontFamily: fonts.PoppinsBold, fontSize: 17, padding: 10},
        ]}>
        {title}
      </Text>
    </View>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        closerbsheet(item.status, item.id, item.title);
      }}>
      <Item title={item.title} />
    </TouchableOpacity>
  );
  const [checked, setChecked] = React.useState('first');
  const [modalVisible, setModalVisible] = useState(true);
  const [additionalinfo, setadditionalinfo] = useState(false);
  const [aboutyou, setaboutyou] = useState(false);
  const [appearencehealth, setappearencehealth] = useState(false);
  const [familybackground, setfamilybackground] = useState(false);
  const [educationprofession, seteducationprofession] = useState(false);
  const [walisinformation, setwalisinformation] = useState(false);
  const [ishowmodal, setishowmodal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [apidata, setapidata] = useState([]);
  const [loading, setLoading] = useState(false);

  //use state for about you starts here
  const [tagline, settagline] = useState(userData.tagline);
  const [about, setabout] = useState(userData.about);
  const [aboutpartner, setaboutpartner] = useState(userData.aboutpartner);
  const [likes, setlikes] = useState(userData.likes);
  const [dislikes, setdislikes] = useState(userData.dislikes);
  const [dobday, setdobday] = useState('day');
  const [dobmonth, setdobmonth] = useState('month');
  const [dobyear, setdobyear] = useState('year');
  const [sect, setsect] = useState(userData.sect);
  const [gender, setgender] = useState(userData.gender);
  const [religion_practice, setreligion_practice] = useState(
    userData.religion_practice,
  );
  const [country, setcountry] = useState(userData.country_name);
  const [countryid, setcountryid] = useState(userData.country_id);
  const [city, setcity] = useState(userData.city_name);
  const [cityid, setcityid] = useState(userData.city_id);
  const [allcountry, setallcountry] = useState(['']);
  const [allcity, setallcity] = useState(['']);
  const [allday, setallday] = useState(['']);
  const [allmonth, setallmonth] = useState(['']);
  const [allyear, setallyear] = useState(['']);
  const [heightinfeet, setheightinfeet] = useState(userData.heightinfeet);
  const [heightininches, setheightininches] = useState(userData.heightininches);
  const [weight, setweight] = useState(userData.weight);
  const [disability, setdisability] = useState(userData.disability);
  const [describedisability, setdescribedisability] = useState(
    userData.describedisability,
  );
  const [language, setlanguage] = useState(userData.language_name);
  const [languageid, setlanguageid] = useState(userData.language_id);
  const [alllanguage, setalllanguage] = useState([]);
  const [ethinicity, setethinicity] = useState(userData.ethinicity);
  const [ethinicityid, setethinicityid] = useState(userData.ethinic_id);
  const [allethinicity, setallethinicity] = useState([]);
  const [allnationality, setallnationality] = useState([]);
  const [nationality, setnationality] = useState(userData.nationality_name);
  const [nationalityid, setnationalityid] = useState(userData.nationality_id);
  const [educationlevel, seteducationlevel] = useState(userData.education);
  const [alleducationlevel, setalleducationlevel] = useState([]);
  const [profession, setprofession] = useState(userData.education);
  const [allprofession, setallprofession] = useState([]);
  const [earningpermonth, setearningpermonth] = useState(
    userData.earningpermonth,
  );
  const [allearningpermonth, setallearningpermonth] = useState([]);
  const [martial_status, setmartial_status] = useState(userData.martial_status);
  const [allmartial_status, setallmartial_status] = useState([]);
  const [var1, setvar1] = useState(false);
  const [wali_f_name, setwali_f_name] = useState(userData.wali_f_name);
  const [wali_l_name, setwali_l_name] = useState(userData.wali_l_name);
  const [wali_email, setwali_email] = useState(userData.wali_email);
  const [wali_phone, setwali_phone] = useState(userData.wali_phone);
  const [unblockuser, setunblockuser] = useState(false);
  const [blockuser, setblockuser] = useState(false);
  const [favuser, setfavuser] = useState(false);
  const [unfavuser, setunfavuser] = useState(false);
  const [blockunblockuser, setblockunblockuser] = useState(false);
  const [searchfilter, setsearchfilter] = useState(false);
  const [filtername, setfiltername] = useState('');
  const [chooseoption, setchooseoption] = useState(false);
  const [camerabgcolor, setcamerabgcolor] = useState('#F9F9F9');
  const [videobgcolor, setvideobgcolor] = useState('#F9F9F9');
  const [globebgcolor, setglobebgcolor] = useState('#F9F9F9');
  const [inputglobalurl, setinputglobalurl] = useState(false);
  const [mycoverurl, setmycoverurl] = useState('false');
  const [previewblocked, setpreviewblocked] = useState('false');

  console.log('my userdata', status);
  const aboutdetail = async id => {
    // setLoading(true);

    try {
      const formData = new FormData();
      if (id == 1) {
        //about section
        formData.append('tagline', tagline);
        formData.append('about', about);
        formData.append('aboutpartner', aboutpartner);
        formData.append('likes', likes);
        formData.append('dislikes', dislikes);
        formData.append('sect', sect);
        formData.append('religion_practice', religion_practice);
        formData.append('modal', 1);
      } else if (id == 2) {
        //apearane and health
        if (parseInt(heightinfeet) > 0) {
        } else {
          alert('Please choose height');
          return false;
        }

        if (parseInt(heightininches) > 0) {
        } else {
          alert('Please choose height');
          return false;
        }

        if (parseInt(weight) > 0) {
        } else {
          alert('Please choose weight');
          return false;
        }
        formData.append('heightinfeet', heightinfeet);
        formData.append('heightininches', heightininches);
        formData.append('weight', weight);
        formData.append('disability', disability);
        formData.append('describedisability', describedisability);
        formData.append('modal', 2);
      } else if (id == 3) {
        if (gender == '') {
          alert('Please choose gender');
          return false;
        } else if (
          countryid == '' ||
          countryid == 'null' ||
          countryid == 'undefined'
        ) {
          alert('Please choose Country');
          return false;
        } else if (cityid == '' || cityid == 'null') {
          alert('Please choose city');
          return false;
        }

        const dobnew = dobyear + '-' + dobmonth + '-' + dobday;
        formData.append('gender', gender);
        formData.append('countryid', countryid);
        formData.append('cityid', cityid);
        formData.append('dobnew', dobnew);
        formData.append('modal', 3);
        console.log('formdata', formData);
      } else if (id == 4) {
        //family background
        formData.append('ethinicityid', ethinicityid);
        formData.append('languageid', languageid);
        formData.append('nationalityid', nationalityid);
        formData.append('modal', 4);
      } else if (id == 5) {
        //education level
        formData.append('educationlevel', educationlevel);
        formData.append('profession', profession);
        formData.append('earningpermonth', earningpermonth);
        formData.append('martial_status', martial_status);
        formData.append('modal', 5);
      } else if (id == 6) {
        //education level

        formData.append('wali_f_name', wali_f_name);
        formData.append('wali_l_name', wali_l_name);
        formData.append('wali_email', wali_email);
        formData.append('wali_phone', wali_phone);
        formData.append('modal', 6);
        console.log('my form data==>', formData);
      }

      const res = await updateProfileIno(formData, userData?.auth);

      if (res.data.status == true) {
        setMsg(res.data.message);
        setShowAlert(true);
      } else {
        new Promise((rsl, rej) => {
          logoutSuccess(rsl, rej);
        })
          .then(res => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Login'}],
              }),
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    } catch (err) {
      setMsg(err.message);
      setShowAlert(true);
      // console.log(err);

      new Promise((rsl, rej) => {
        logoutSuccess(rsl, rej);
      })
        .then(res => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Login'}],
            }),
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const blockunblockuserfunc = async id => {
    // setLoading(true);

    try {
      const formData = new FormData();
      if (id == 1) {
        //about section
        formData.append('blockunblockuser', blockunblockuser);
      }

      const res = await Blockuser(formData, userData?.auth);
      console.log('my form data', userData?.auth);
      if (res.data.status == true) {
        setMsg(res.data.message);
        setShowAlert(true);
      } else {
      }
    } catch (err) {
      setMsg(err.message);
      setShowAlert(true);
    }
  };

  const likeunlikeuserfunc = async id => {
    // setLoading(true);

    try {
      const formData = new FormData();
      if (id == 1) {
        //about section
        formData.append('likeunlikeuser', blockunblockuser);
      }
      const res = await likeunlikeuser(formData, userData?.auth);
      if (res.data.status == true) {
        setMsg(res.data.message);
        setShowAlert(true);
      } else {
      }
    } catch (err) {
      setMsg(err.message);
      setShowAlert(true);
    }
  };

  const uploadcoverphoto = async id => {
    try {
      const formData = new FormData();

      formData.append('coverphoto', mycoverurl);
      formData.append('modal', 12);

      const res = await updateProfileIno(formData, userData?.auth);
      if (res.data.status == true) {
        setMsg(res.data.message);
        setShowAlert(true);
      } else {
      }
    } catch (err) {
      console.log('error msg', err);
      setMsg(err.message);
      setShowAlert(true);
    }
  };

  const uploadsearchfilter = async id => {
    if (!filtername) {
      setMsg('Kindly enter name of search filter');
      setShowAlert(true);
    } else {
      try {
        const formData = new FormData();
        if (id == 1) {
          //about section
          formData.append('agefrom', status.agefrom);
          formData.append('ageto', status.ageto);
          formData.append('gender', status.gender);
          formData.append('languageid', status.languageid);
          formData.append('profession', status.profession);
          formData.append('educationlevel', status.educationlevel);
          formData.append('ethinicityid', status.ethinicityid);
          formData.append('countryid', status.countryid);
          formData.append('martial_status', status.martial_status);
          formData.append('filtername', filtername);
        }

        await axios
          .post(`${storeurl}api/uploadfilters`, formData, {
            headers: {
              auth: userData.auth,
            },
          })
          .then(res => {
            console.log('res', res);
            if (res.data.status == true) {
              setMsg(res.data.message);
              setShowAlert(true);
            } else {
            }
          })
          .catch(err => {
            console.log('error', res);
            console.log(err);
          });
      } catch (err) {
        console.log('error msg', err);
        setMsg(err.message);
        setShowAlert(true);
      }
    }
  };
  const requestsent = false;

  useEffect(() => {
    if (status == 'aboutyou') {
      setaboutyou(true);
    } else if (status == 'additionalinfo') {
      setadditionalinfo(true);
      axios
        .get(`${storeurl}api/get_county`, '', {})
        .then(res => {
          console.log('my array==>', res.data);
          if (res.data.status == true) {
            var arry = [];

            for (var i = 0; i < res.data.data.length; i++) {
              let person = {
                id: res.data.data[i].country_id,
                title: res.data.data[i].country_name,
                status: 'country',
              };

              arry.push(person);
            }
            setallcountry(arry);
          } else {
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          rej(err.message);
        });

      axios
        .get(`${storeurl}api/getdateofbirth`, '', {})
        .then(res => {
          console.log('year12==>', res.data);
          if (res.data.status == true) {
            console.log('year1==>', res.data);
            setallday(res.data.day);
            setallmonth(res.data.month);
            setallyear(res.data.year);
          } else {
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          rej(err.message);
        });

      const formData = new FormData();
      formData.append('country_id', userData.country_id);
      axios
        .post(`${storeurl}api/get_city`, formData, {})
        .then(res => {
          if (res.data.status == true) {
            var arry = [];
            for (var i = 0; i < res.data.data.length; i++) {
              let person = {
                id: res.data.data[i].city_id,
                title: res.data.data[i].city_name,
                status: 'city',
              };
              arry.push(person);
            }
            setallcity(arry);
          } else {
            setallcity('');
          }
        })
        .catch(err => {
          setLoading(false);
          console.log('error comes here', err);
          rej(err.message);
        });
    } else if (status == 'appearencehealth') {
      setappearencehealth(true);
    } else if (
      status == 'familybackground' ||
      status == 'educationprofession'
    ) {
      if (status == 'familybackground') {
        setfamilybackground(true);
      } else if (status == 'educationprofession') {
        seteducationprofession(true);
      }

      axios
        .get(`${storeurl}api/get_general_Data`, '', {})
        .then(res => {
          if (res.data.status == true) {
            var arry = [];

            for (var i = 0; i < res.data.ethinicity.length; i++) {
              let person = {
                id: res.data.ethinicity[i].ethinic_id,
                title: res.data.ethinicity[i].ethinicity,
                status: 'ethinicity',
              };

              arry.push(person);
            }
            setallethinicity(arry);

            var arry = [];

            for (var i = 0; i < res.data.language.length; i++) {
              let person = {
                id: res.data.language[i].language_id,
                title: res.data.language[i].language_name,
                status: 'language',
              };

              arry.push(person);
            }
            setalllanguage(arry);

            var arry = [];

            for (var i = 0; i < res.data.nationality.length; i++) {
              let person = {
                id: res.data.nationality[i].nationality_id,
                title: res.data.nationality[i].nationality_name,
                status: 'nationality',
              };

              arry.push(person);
            }
            setallnationality(arry);

            var arry = [];

            for (var i = 0; i < res.data.educationlevel.length; i++) {
              let person = {
                id: i,
                title: res.data.educationlevel[i],
                status: 'educationlevel',
              };

              arry.push(person);
            }
            setalleducationlevel(arry);

            var arry = [];

            for (var i = 0; i < res.data.professions.length; i++) {
              let person = {
                id: i,
                title: res.data.professions[i],
                status: 'professions',
              };

              arry.push(person);
            }
            setallprofession(arry);

            var arry = [];

            for (var i = 0; i < res.data.earnings.length; i++) {
              let person = {
                id: i,
                title: res.data.earnings[i],
                status: 'earningpermonth',
              };

              arry.push(person);
            }
            setallearningpermonth(arry);

            console.log('general data', res.data.educationlevel);
          } else {
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          rej(err.message);
        });
    } else if (status == 'walisinformation') {
      setwalisinformation(true);
    } else if (status.name == 'unblockuser') {
      setunblockuser(true);
      setblockunblockuser(status.userid);
    } else if (status.name == 'blockuser') {
      setblockuser(true);
      setblockunblockuser(status.userid);
    } else if (status.name == 'favuser') {
      setfavuser(true);
      setblockunblockuser(status.userid);
    } else if (status.name == 'unfavuser') {
      setunfavuser(true);
      setblockunblockuser(status.userid);
    } else if (status.name == 'searchfilter') {
      setsearchfilter(true);
      setblockunblockuser(status.userid);
    } else if (status == 'chooseoption') {
      setchooseoption(true);
    } else if (status == 'previewblocked') {
      setpreviewblocked(true);
    }

    if (userData.dob != '') {
      var splitdob = userData.dob.split('-');
      setdobday(splitdob[2]);
      setdobmonth(splitdob[1]);
      setdobyear(splitdob[0]);
    }

    if (weight > 0) {
    } else {
      setweight('10');
    }
  }, []);

  console.log('block user status', blockuser);

  function handleChange(event) {
    onChange('false');
    setaboutyou(false);
    setadditionalinfo(false);
    setappearencehealth(false);
    setfamilybackground(false);
    seteducationprofession(false);
    setwalisinformation(false);
    setunblockuser(false);
    setblockuser(false);
    setLoading(true);
  }

  function openrbsheet(var1) {
    if (var1 == 'day') {
      setapidata(allday);
    } else if (var1 == 'month') {
      setapidata(allmonth);
    } else if (var1 == 'year') {
      setapidata(allyear);
    } else if (var1 == 'country') {
      setapidata(allcountry);
    } else if (var1 == 'city') {
      setapidata(allcity);
    } else if (var1 == 'heightinfeet') {
      var arry = [];
      for (var i = 2; i < 8; i++) {
        let person = {
          id: i,
          title: i,
          status: 'heightinfeet',
        };
        arry.push(person);
      }

      setapidata(arry);
    } else if (var1 == 'heightininches') {
      var arry = [];
      for (var i = 1; i < 13; i++) {
        let person = {
          id: i,
          title: i,
          status: 'heightininches',
        };
        arry.push(person);
      }

      setapidata(arry);
    } else if (var1 == 'weight') {
      var arry = [];
      for (var i = 50; i < 200; i++) {
        let person = {
          id: i,
          title: i,
          status: 'weight',
        };
        arry.push(person);
      }

      setapidata(arry);
    } else if (var1 == 'disability') {
      var arry = [];
      let person = {
        id: 1,
        title: 'Yes',
        status: 'disability',
      };
      arry.push(person);

      let person1 = {
        id: 1,
        title: 'No',
        status: 'disability',
      };
      arry.push(person1);

      setapidata(arry);
    } else if (var1 == 'ethinicity') {
      setapidata(allethinicity);
    } else if (var1 == 'language') {
      setapidata(alllanguage);
    } else if (var1 == 'nationality') {
      setapidata(allnationality);
    } else if (var1 == 'educationlevel') {
      setapidata(alleducationlevel);
    } else if (var1 == 'profession') {
      setapidata(allprofession);
    } else if (var1 == 'earningpermonth') {
      setapidata(allearningpermonth);
    } else if (var1 == 'martial_status') {
      var arry = [];
      let person = {
        id: 1,
        title: 'Single',
        status: 'maritalstatus',
      };
      arry.push(person);

      let person1 = {
        id: 2,
        title: 'Divorced',
        status: 'maritalstatus',
      };
      arry.push(person1);

      let person2 = {
        id: 2,
        title: 'Widow',
        status: 'maritalstatus',
      };
      arry.push(person2);

      setapidata(arry);
    }
    refRBSheet.current.open();
  }

  function closerbsheet(status1, id1, title1) {
    refRBSheet.current.close();

    if (status1 == 'country') {
      setcountry(title1);
      setcountryid(id1);
      const formData = new FormData();
      formData.append('country_id', id1);

      axios
        .post(`${storeurl}api/get_city`, formData, {})
        .then(res => {
          if (res.data.status == true) {
            var arry = [];
            for (var i = 0; i < res.data.data.length; i++) {
              let person = {
                id: res.data.data[i].city_id,
                title: res.data.data[i].city_name,
                status: 'city',
              };
              arry.push(person);
            }
            console.log('allcity', arry);
            setallcity(arry);

            setcity(arry[0].title);
            setcityid(arry[0].id);
          } else {
            setallcity('');
          }
        })
        .catch(err => {
          setLoading(false);
          console.log('error comes here', err);
          rej(err.message);
        });
    } else if (status1 == 'day') {
      setdobday(title1);
    } else if (status1 == 'month') {
      setdobmonth(title1);
    } else if (status1 == 'year') {
      setdobyear(title1);
    } else if (status1 == 'heightinfeet') {
      setheightinfeet(title1);
    } else if (status1 == 'heightininches') {
      setheightininches(title1);
    } else if (status1 == 'disability') {
      setdisability(title1);
    } else if (status1 == 'weight') {
      setweight(title1);
    } else if (status1 == 'ethinicity') {
      setethinicity(title1);
      setethinicityid(id1);
    } else if (status1 == 'language') {
      setlanguage(title1);
      setlanguageid(id1);
    } else if (status1 == 'nationality') {
      setnationality(title1);
      setnationalityid(id1);
    } else if (status1 == 'city') {
      setcity(title1);
      setcityid(id1);
    } else if (status1 == 'educationlevel') {
      seteducationlevel(title1);
    } else if (status1 == 'professions') {
      setprofession(title1);
    } else if (status1 == 'earningpermonth') {
      setearningpermonth(title1);
    } else if (status1 == 'maritalstatus') {
      setmartial_status(title1);
    }
  }

  console.log('day data==>', allday);

  const openCamera1 = async index => {
    // setLoader(true);

    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        uploadNewPhoto(response, index);
      }
    });
  };

  const uploadNewPhoto = async (response, index) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', {
        uri: response.uri,
        name: response.fileName,
        type: response.type,
      });
      formData.append('photo_status', 12);

      const res = await uploadcoverPhoto(formData, userData?.auth);
      console.log('myres', res.data);
      if (res.data.status == true) {
        setMsg(res.data.message);
        setShowAlert(true);
      } else {
        setMsg(res.data.message);
        setShowAlert(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handlefilter = () => {
  //   if (!filtername) {
  //     // setMsg('Kindly Enter Phone No');
  //     // setShowAlert(true);
  //     alert('kindly enter the name of search filter');
  //   }
  // };

  return (
    <Modal
      animationType="slide"
      backdropOpacity={1}
      transparent={true}
      visible={modalVisible}>
      <View style={styles.centeredView}>
        <Loading visible={loading} />
        <View style={styles.modalView}>
          <Pressable onPress={() => handleChange()}>
            <View
              style={{
                alignItems: 'flex-end',
                paddingRight: 10,
                paddingTop: 10,
              }}>
              <Entypo name="cross" color="red" size={24} />
            </View>
          </Pressable>
          {requestsent && (
            <View>
              <View style={{alignItems: 'center'}}>
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

              <View
                style={{paddingTop: 20, width: '100%', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.secondary,
                    // fontFamily: fonts.PoppinsBold,
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
          )}

          {(unblockuser || blockuser) && (
            <View>
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    backgroundColor: '#F9F9F9',
                    padding: 10,
                    borderRadius: 20,
                    elevation: 15,
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={Blocked_person}
                  />
                </View>
              </View>

              <View
                style={{paddingTop: 20, width: '100%', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  {blockuser == true ? 'Block user' : 'Unblock user'}
                </Text>
              </View>
              <Text style={{textAlign: 'center'}}>Are you sure</Text>
              <View style={{paddingTop: 30}}>
                <GradientsigninButton
                  onButtonPress={() => {
                    blockunblockuserfunc(1);
                  }}
                  title="Confirm"
                />
              </View>
              <View style={{marginTop: -25}}>
                <GradientButtongrayPic
                  onButtonPress={() => {
                    handleChange();
                  }}
                  title="Cancel"
                />
              </View>
            </View>
          )}

          {(unfavuser || favuser) && (
            <View>
              <View style={{alignItems: 'center'}}>
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

              <View
                style={{paddingTop: 20, width: '100%', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  {favuser == true ? 'Like user' : 'Unlike user'}
                </Text>
              </View>
              <Text style={{textAlign: 'center'}}>Are you sure</Text>
              <View style={{paddingTop: 30}}>
                <GradientButton
                  onButtonPress={() => {
                    likeunlikeuserfunc(1);
                  }}
                  title="Confirm"
                />
              </View>
              <View style={{marginTop: 0}}>
                <GradientButton
                  onButtonPress={() => {
                    handleChange();
                  }}
                  title="Cancel"
                />
              </View>
            </View>
          )}

          {searchfilter && (
            <View style={{marginBottom: 25}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{height: 200, width: 200}}
                  source={Filtered_search}
                />
              </View>

              <View
                style={{
                  marginTop: 20,
                  width: '100%',
                  paddingLeft: 25,
                  marginBottom: 0,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,

                    // fontFamily: fonts.PoppinsBold,
                  }}>
                  Type name for the search filter
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <TextInput
                  style={{
                    marginLeft: 28,
                    marginRight: 24,
                    backgroundColor: 'white',
                    height: 20,
                    paddingBottom: 15,
                    fontSize: 12,
                  }}
                  onChangeText={e => {
                    setfiltername(e);
                  }}
                />
              </View>
              <View style={{width: '95%', paddingLeft: 23, marginTop: 25}}>
                <GradientsigninButton
                  title="Save and search"
                  onButtonPress={() => {
                    uploadsearchfilter(1);
                  }}
                />
                <View style={{position: 'absolute', right: 40, top: 29}}>
                  <EvilIcons name="search" size={26} color="white" />
                </View>
              </View>
            </View>
          )}
          {previewblocked == 1 && (
            <View style={{marginBottom: 40}}>
              <View
                style={{
                  alignItems: 'center',
                  // backgroundColor: `#dcdcdc`,
                  // width: '20%',
                  // marginLeft: 150,

                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
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

              <View
                style={{paddingTop: 20, width: '100%', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Preview blocked due
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  to privacy
                </Text>
                <Text style={{fontSize: 12}}>Request user for access</Text>
              </View>
              <View style={{marginTop: 20}}>
                <GradientButton title="Request Access" />
                <View style={{position: 'absolute', left: 40, top: 22}}>
                  <Feather name="key" size={22} color="white" />
                </View>
              </View>
            </View>
          )}
          {educationprofession && (
            <View style={{paddingLeft: 20, marginBottom: 20}}>
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Education & profession
                </Text>
                <Text style={{marginTop: 5}}>
                  Some information about education and information
                </Text>
              </View>
              <View style={{marginTop: 45}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Education Level
                </Text>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <View style={{borderBottomWidth: 0.5, width: '95%'}}>
                  <TouchableOpacity
                    onPress={() => openrbsheet('educationlevel')}>
                    <Text
                      style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                      {educationlevel}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', right: 20, bottom: 8}}>
                  <TouchableOpacity
                    onPress={() => openrbsheet('educationlevel')}>
                    <EvilIcons name="chevron-down" size={26} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 25}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Profession
                </Text>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <View style={{borderBottomWidth: 0.5, width: '95%'}}>
                  <TouchableOpacity onPress={() => openrbsheet('profession')}>
                    <Text
                      style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                      {profession}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', right: 20, bottom: 8}}>
                  <TouchableOpacity onPress={() => openrbsheet('profession')}>
                    <EvilIcons name="chevron-down" size={26} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginTop: 25}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Earnings per month
                </Text>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <View style={{borderBottomWidth: 0.5, width: '95%'}}>
                  <TouchableOpacity
                    onPress={() => openrbsheet('earningpermonth')}>
                    <Text
                      style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                      {earningpermonth}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', right: 20, bottom: 8}}>
                  <TouchableOpacity
                    onPress={() => openrbsheet('earningpermonth')}>
                    <EvilIcons name="chevron-down" size={26} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 25}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Marital Status
                </Text>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <View style={{borderBottomWidth: 0.5, width: '95%'}}>
                  <TouchableOpacity
                    onPress={() => openrbsheet('martial_status')}>
                    <Text
                      style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                      {martial_status}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', right: 20, bottom: 8}}>
                  <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                    <EvilIcons name="chevron-down" size={26} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 25, paddingRight: 10}}>
                {/* <GradientButton title={'Update'} /> */}
                <GradientsigninButton
                  onButtonPress={() => {
                    aboutdetail(5); //education & profession
                  }}
                  title={'Update'}
                />
              </View>
            </View>
          )}
          {walisinformation && (
            <View style={{paddingLeft: 20, marginBottom: 20}}>
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Wali's Information
                </Text>
                <Text style={{marginTop: 5}}>
                  Enter your wali's information below
                </Text>
              </View>
              <View style={{marginTop: 45}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  First name
                </Text>
              </View>
              <View style={{marginTop: 20, width: '95%'}}>
                <TextInput
                  style={{
                    backgroundColor: 'white',
                    height: 20,
                    paddingBottom: 12,
                  }}
                  value={wali_f_name}
                  onChangeText={e => {
                    setwali_f_name(e);
                  }}
                />
              </View>
              <View style={{marginTop: 22}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Last name
                </Text>
              </View>
              <View style={{marginTop: 20, width: '95%'}}>
                <TextInput
                  style={{
                    backgroundColor: 'white',
                    height: 20,
                    paddingBottom: 12,
                  }}
                  value={wali_l_name}
                  onChangeText={e => {
                    setwali_l_name(e);
                  }}
                />
              </View>
              <View style={{marginTop: 22}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Email (optional)
                </Text>
              </View>
              <View style={{marginTop: 20, width: '95%'}}>
                <TextInput
                  style={{
                    backgroundColor: 'white',
                    height: 20,
                    paddingBottom: 12,
                  }}
                  value={wali_email}
                  onChangeText={e => {
                    setwali_email(e);
                  }}
                />
              </View>
              <View style={{marginTop: 22}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Phone
                </Text>
              </View>
              <View style={{marginTop: 20, width: '95%'}}>
                <TextInput
                  style={{
                    backgroundColor: 'white',
                    height: 20,
                    paddingBottom: 12,
                  }}
                  value={wali_phone}
                  onChangeText={e => {
                    setwali_phone(e);
                  }}
                />
              </View>
              <View style={{marginTop: 30, paddingRight: 10}}>
                <GradientsigninButton
                  onButtonPress={() => {
                    aboutdetail(6); //family background
                  }}
                  title={'Update'}
                />
              </View>
            </View>
          )}
          {aboutyou && (
            <ScrollView>
              <View style={{paddingLeft: 20, marginBottom: 30}}>
                <View>
                  <Text
                    style={{
                      fontSize: 22,
                      color: colors.secondary,
                      fontFamily: fonts.PoppinsBold,
                    }}>
                    About you & your spouse
                  </Text>
                  <Text style={{marginTop: 5}}>
                    Discuss bit about yourself and what you are looking for
                  </Text>
                </View>
                <View style={{marginTop: 18}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.secondary,
                      fontFamily: fonts.PoppinsBold,
                    }}>
                    Tag line
                  </Text>
                  <TextInput
                    multiline={true}
                    value={tagline}
                    onChangeText={e => {
                      settagline(e);
                    }}
                    style={styles.inputdesign}
                  />
                </View>
                {/* <View
                  style={{
                    width: '95%',
                  }}>
               
                </View> */}
                <View style={{marginTop: 15}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.secondary,
                      fontFamily: fonts.PoppinsBold,
                    }}>
                    About yourself
                  </Text>
                  <TextInput
                    multiline={true}
                    value={about}
                    onChangeText={e => {
                      setabout(e);
                    }}
                    style={styles.inputdesign}
                  />
                </View>
                {/* <View style={{marginTop: 20, width: '95%'}}>
                
                </View> */}
                <View style={{marginTop: 34}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.secondary,
                      fontFamily: fonts.PoppinsBold,
                    }}>
                    About partner
                  </Text>
                  <TextInput
                    multiline={true}
                    value={aboutpartner}
                    onChangeText={e => {
                      setaboutpartner(e);
                    }}
                    style={styles.inputdesign}
                  />
                </View>

                <View style={{marginTop: 24}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.secondary,
                      fontFamily: fonts.PoppinsBold,
                    }}>
                    Likes
                  </Text>
                  <TextInput
                    multiline={true}
                    value={likes}
                    onChangeText={e => {
                      setlikes(e);
                    }}
                    style={styles.inputdesign}
                  />
                </View>

                <View style={{marginTop: 34}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.secondary,
                      fontFamily: fonts.PoppinsBold,
                    }}>
                    Dislikes
                  </Text>
                  <TextInput
                    multiline={true}
                    value={dislikes}
                    onChangeText={e => {
                      setdislikes(e);
                    }}
                    style={styles.inputdesign}
                  />
                </View>

                <View style={{marginTop: 34}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.secondary,
                      fontFamily: fonts.PoppinsBold,
                    }}>
                    Your religious sect
                  </Text>
                  <TextInput
                    multiline={true}
                    value={sect}
                    onChangeText={e => {
                      setsect(e);
                    }}
                    style={styles.inputdesign}
                  />
                </View>

                <View style={{marginTop: 34}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.secondary,
                      fontFamily: fonts.PoppinsBold,
                    }}>
                    Religious practice level
                  </Text>
                  <TextInput
                    multiline={true}
                    value={religion_practice}
                    onChangeText={e => {
                      setreligion_practice(e);
                    }}
                    style={styles.inputdesign}
                  />
                </View>
                <View style={{marginTop: 30, paddingRight: 10}}>
                  <GradientsigninButton
                    title={'Update'}
                    onButtonPress={() => {
                      aboutdetail(1); //about section here
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          )}
          {chooseoption && (
            <View
              style={{
                paddingLeft: 60,
                marginBottom: 20,
                paddingRight: 60,
                paddingBottom: 25,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Choose an option
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  width: 160,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setcamerabgcolor('#E9E9E9');
                      setvideobgcolor('#F9F9F9');
                      setglobebgcolor('#F9F9F9');
                      openCamera1();
                      setinputglobalurl(false);
                    }}>
                    <View
                      style={{
                        height: 70,
                        width: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: camerabgcolor,
                        elevation: 3,
                        borderRadius: 15,
                      }}>
                      <Image
                        style={{height: 50, width: 50}}
                        source={Circled_camera}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setcamerabgcolor('#F9F9F9');
                      setvideobgcolor('#E9E9E9');
                      setglobebgcolor('#F9F9F9');
                      setinputglobalurl(true);
                    }}>
                    <View
                      style={{
                        height: 70,
                        width: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: videobgcolor,
                        elevation: 3,
                        borderRadius: 15,
                      }}>
                      <Image
                        style={{height: 50, width: 50}}
                        source={Circled_Video}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/* inputglobalurl */}
              {inputglobalurl && (
                <View
                  style={{
                    // borderBottomWidth: 1.5,
                    marginTop: 50,
                    // borderBottomColor:'gray'
                  }}>
                  <View style={{}}>
                    <TextInput
                      placeholder="Add url here"
                      underlineColorAndroid="red"
                      onChangeText={e => {
                        setmycoverurl(e);
                      }}
                      style={{
                        width: 260,
                        height: 30,
                        backgroundColor: 'white',
                        textAlignVertical: 'top',
                        paddingLeft: 20,
                      }}
                    />
                  </View>
                  <View style={{marginTop: -30}}>
                    <Image style={{height: 20, width: 20}} source={URL} />
                  </View>
                </View>
              )}
              {inputglobalurl && (
                <View style={{marginTop: 20}}>
                  <GradientsigninButton
                    onButtonPress={() => {
                      uploadcoverphoto(1);
                    }}
                    title="Confirm"
                  />
                </View>
              )}
            </View>
          )}
          {familybackground && (
            <View style={{paddingLeft: 20, marginBottom: 20}}>
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Family background
                </Text>
                <Text style={{marginTop: 5}}>
                  Some information about your family background
                </Text>
              </View>
              <View style={{marginTop: 45}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Ethincity
                </Text>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <View style={{borderBottomWidth: 0.5, width: '95%'}}>
                  <TouchableOpacity onPress={() => openrbsheet('ethinicity')}>
                    <Text
                      style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                      {ethinicity}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', right: 20, bottom: 8}}>
                  <TouchableOpacity onPress={() => openrbsheet('ethinicity')}>
                    <EvilIcons name="chevron-down" size={26} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 25}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Language
                </Text>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <View style={{borderBottomWidth: 0.5, width: '95%'}}>
                  <TouchableOpacity onPress={() => openrbsheet('language')}>
                    <Text
                      style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                      {language}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', right: 20, bottom: 8}}>
                  <TouchableOpacity onPress={() => openrbsheet('language')}>
                    <EvilIcons name="chevron-down" size={26} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginTop: 25}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Nationality
                </Text>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <View style={{borderBottomWidth: 0.5, width: '95%'}}>
                  <TouchableOpacity onPress={() => openrbsheet('nationality')}>
                    <Text
                      style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                      {nationality}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', right: 20, bottom: 8}}>
                  <TouchableOpacity onPress={() => openrbsheet('nationality')}>
                    <EvilIcons name="chevron-down" size={26} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginTop: 60, paddingRight: 10}}>
                <GradientsigninButton
                  onButtonPress={() => {
                    aboutdetail(4); //family background
                  }}
                  title={'Update'}
                />
              </View>
            </View>
          )}
          {appearencehealth && (
            <View style={{paddingLeft: 20, marginBottom: 20}}>
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Appearence & health
                </Text>
                <Text style={{marginTop: 5}}>
                  Some physical characteristics of your personality
                </Text>
              </View>
              <View style={{marginTop: 45}}>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.secondary,
                      fontFamily: fonts.PoppinsBold,
                    }}>
                    Height (feet)
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '36%',
                }}>
                <View
                  style={{
                    backgroundColor: colors.lightGray,
                    borderRadius: 8,
                    width: 60,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <TouchableOpacity onPress={() => openrbsheet('heightinfeet')}>
                    <Text style={{marginRight: 10}}>{heightinfeet}'</Text>
                    <View style={{position: 'absolute', right: -20, bottom: 1}}>
                      <EvilIcons name="chevron-down" size={22} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    backgroundColor: colors.lightGray,
                    borderRadius: 8,
                    width: 60,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => openrbsheet('heightininches')}>
                    <Text style={{marginRight: 10}}>{heightininches}''</Text>
                    <View style={{position: 'absolute', right: -20, bottom: 1}}>
                      <EvilIcons name="chevron-down" size={22} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Weight (kg)
                </Text>
              </View>
              <View
                style={{
                  width: 90,
                  marginTop: 5,
                  backgroundColor: colors.lightGray,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <TouchableOpacity onPress={() => openrbsheet('weight')}>
                  <Text style={{marginRight: 8}}>{weight}kg</Text>
                  <View style={{position: 'absolute', right: -18, bottom: 1}}>
                    <EvilIcons name="chevron-down" size={22} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Any Disability?
                </Text>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <View style={{borderBottomWidth: 0.5, width: '95%'}}>
                  <TouchableOpacity onPress={() => openrbsheet('disability')}>
                    <Text
                      style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                      {disability}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', right: 20, bottom: 8}}>
                  <TouchableOpacity onPress={() => openrbsheet('disability')}>
                    <EvilIcons name="chevron-down" size={26} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Describe your disibility
                </Text>
              </View>
              <View style={{marginTop: 0, width: '90%'}}>
                <TextInput
                  value={describedisability}
                  style={{backgroundColor: 'white'}}
                  onChangeText={text => setdescribedisability(text)}
                />
              </View>
              <View style={{marginTop: 10, paddingRight: 10}}>
                <GradientsigninButton
                  onButtonPress={() => {
                    aboutdetail(2); //appearence and health
                  }}
                  title={'Update'}
                />
              </View>
            </View>
          )}
          {additionalinfo && (
            <View style={{paddingLeft: 20, marginBottom: 20}}>
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Additional information
                </Text>
                <Text style={{marginTop: 5}}>
                  Some physical characteristics of your personality
                </Text>
              </View>
              <View style={{marginTop: 30}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Date of birth
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '66%',
                }}>
                <View
                  style={{
                    backgroundColor: colors.lightGray,
                    borderRadius: 8,
                    width: 75,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <TouchableOpacity onPress={() => openrbsheet('day')}>
                    <Text style={{marginRight: 10}}>{dobday}</Text>
                    <View style={{position: 'absolute', right: -10, bottom: 1}}>
                      <EvilIcons name="chevron-down" size={22} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    backgroundColor: colors.lightGray,
                    borderRadius: 8,
                    width: 75,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <TouchableOpacity onPress={() => openrbsheet('month')}>
                    <Text style={{marginRight: 10}}>{dobmonth}</Text>
                    <View style={{position: 'absolute', right: -10, bottom: 1}}>
                      <EvilIcons name="chevron-down" size={22} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    backgroundColor: colors.lightGray,
                    borderRadius: 8,
                    width: 75,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <TouchableOpacity onPress={() => openrbsheet('year')}>
                    <Text style={{marginRight: 10}}>{dobyear}</Text>
                    <View style={{position: 'absolute', right: -13, bottom: 1}}>
                      <EvilIcons name="chevron-down" size={22} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Gender
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',

                  width: '63%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '30%',
                  }}>
                  <View>
                    <RadioButton
                      color="red"
                      value="first"
                      status={gender === 'Male' ? 'checked' : 'unchecked'}
                      onPress={() => setgender('Male')}
                    />
                  </View>
                  <View style={{marginTop: 7}}>
                    <Text>Male</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', width: '60%'}}>
                  <View style={{}}>
                    <RadioButton
                      value="second"
                      color="red"
                      status={gender === 'Female' ? 'checked' : 'unchecked'}
                      onPress={() => setgender('Female')}
                    />
                  </View>
                  <View style={{marginTop: 7}}>
                    <Text>Female</Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  Country
                </Text>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <View style={{borderBottomWidth: 0.5, width: '95%'}}>
                  <TouchableOpacity onPress={() => openrbsheet('country')}>
                    <Text
                      style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                      {country}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', right: 20, bottom: 8}}>
                  <TouchableOpacity onPress={() => openrbsheet('country')}>
                    <EvilIcons name="chevron-down" size={26} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.PoppinsBold,
                  }}>
                  City
                </Text>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <View style={{borderBottomWidth: 0.5, width: '95%'}}>
                  <TouchableOpacity onPress={() => openrbsheet('city')}>
                    <Text
                      style={{marginBottom: 10, paddingLeft: 15, fontSize: 12}}>
                      {city}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', right: 20, bottom: 8}}>
                  <TouchableOpacity onPress={() => openrbsheet('city')}>
                    <EvilIcons name="chevron-down" size={26} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 30, paddingRight: 10}}>
                <GradientsigninButton
                  onButtonPress={() => {
                    aboutdetail(3);
                  }}
                  title={'Update'}
                />
              </View>
            </View>
          )}
        </View>

        <RBSheet
          height={300}
          duration={250}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              height: 900,
            },

            // },
            draggableIcon: {
              backgroundColor: 'black',
            },
            container: {
              alignItems: 'center',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}>
          <FlatList
            data={apidata}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </RBSheet>

        {showAlert && (
          <AlertModal
            heading={msg}
            button1="OK"
            form={true}
            onOkPress={() => {
              handleChange();
            }}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: 40,
    paddingBottom: 40,
  },
  inputdesign: {
    backgroundColor: 'white',
    height: 30,
    padding: 10,
    width: '95%',
  },
  modalView: {
    width: '90%',
    // height: '60%',
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
  item: {
    width: 400,
    padding: 2,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  const {user, token} = state.auth;
  return {
    userData: user,
    token,
  };
};
// export default connect(mapStateToProps)(Modal1);

export default connect(mapStateToProps, {
  updateProfileIno,
  logoutSuccess,
  Blockuser,
  likeunlikeuser,
  uploadPhoto,
  uploadcoverPhoto,
})(Modal1);
