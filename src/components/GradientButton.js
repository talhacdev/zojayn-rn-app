import React from 'react';
import {Text, Image, View, StyleSheet, ImageBackground, Platform} from 'react-native';
import fonts from '../theme/fonts';
import {TouchableOpacity} from 'react-native';
import {
  buttonBg,
  GoogleBtn,
  facebookbtn,
  signin,
  signinbtn,
  unblockuserbutton,
  GradientYellow,
  logout,
  Google2,
  arrowright,
  Facebook,
  fbBg,
  siginbg,
} from '../assets';
import colors from '../theme/colors';
import Svg, {
  Ellipse,
  G,
  Path,
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

//login gradient button starts///

export const GradientButton = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  onButtonPress,
  custombg,
}) => (
  // <TouchableOpacity
  //   style={styles.main}
  //   activeOpacity={1}
  //   onPress={onButtonPress}>
  //   <Image
  //     source={signinbtn}
  //     style={{
  //       width: '95%',
  //       height: 50,
  //       borderRadius: 100,
  //     }}
  //   />
  //   <View style={styles.absoluteView}>
  //     <Text
  //       style={{
  //         color: 'white',
  //         fontSize: 14,
  //         fontWeight: '500',
  //         fontFamily: fonts.PoppinsMedium,
  //       }}>
  //       {title}
  //     </Text>
  //   </View>

  //   {iconLeft && (
  //     <Image
  //       source={iconLeft}
  //       resizeMode="contain"
  //       style={{
  //         position: 'absolute',
  //         left: 35,
  //         height: 18,
  //         width: 18,
  //       }}
  //     />
  //   )}
  //   {iconRight && (
  //     <Image
  //       source={iconRight}
  //       resizeMode="contain"
  //       style={{
  //         position: 'absolute',
  //         right: 0,
  //         height: 10,
  //         widht: 18,
  //         tintColor: 'white',
  //       }}
  //     />
  //   )}
  // </TouchableOpacity>

  <TouchableOpacity onPress={onButtonPress} style={{marginHorizontal: 10}}>
    <ImageBackground
      source={siginbg}
      style={{
        height: 50,
        width: '100%',
        borderRadius: 100 / 2,
        overflow: 'hidden',
        marginTop:Platform.OS==='ios'?5:0
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1}}>
        <View
          style={{
            flex: 1,

            justifyContent: 'center',
          }}>
          {iconLeft && (
            <Image
              source={iconLeft}
              style={{height: 18, width: 19, marginLeft: 20}}
            />
          )}
        </View>
        <View
          style={{
            flex: 1.3,
            // backgroundColor: 'green',

            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>{title}</Text>
        </View>
      </View>
    </ImageBackground>
    {/* <GradientButton
    title="Sign in"
    iconLeft={logout}
    onButtonPress={() => {
      handleLogin();
    }}
  /> */}
  </TouchableOpacity>
);

export const GradientButtongrayPic = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  onButtonPress,
  custombg,
}) => (
  <TouchableOpacity
    style={styles.main}
    // activeOpacity={1}
    onPress={onButtonPress}>
    <Image
      source={GoogleBtn}
      style={{
        width: '100%',
        borderRadius: 100,
        overflow: 'hidden',
      }}
    />
    <View style={styles.absoluteView}>
      <Text
        style={{
          color: 'black',
          fontSize: 14,
          fontWeight: '500',
          fontFamily: fonts.PoppinsMedium,
        }}>
        {title}
      </Text>
    </View>
    {iconLeft && (
      <Image
        source={iconLeft}
        resizeMode="contain"
        style={{
          position: 'absolute',
          left: 10,
          height: 18,
          width: 18,
        }}
      />
    )}
    {iconRight && (
      <Image
        source={iconRight}
        resizeMode="contain"
        style={{
          position: 'absolute',
          right: 0,
          height: 10,
          widht: 18,
          tintColor: 'white',
        }}
      />
    )}
  </TouchableOpacity>
);

export const GradientButtonunblockuser = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  onButtonPress,
  custombg,
}) => (
  <TouchableOpacity
    style={[styles.main, {}]}
    // activeOpacity={1}
    onPress={onButtonPress}>
    <View style={{borderRadius: 50, overflow: 'hidden'}}>
      <Image
        source={unblockuserbutton}
        style={{
          height: 50,
          width: 170,
        }}
      />
      <View style={[styles.absoluteView, {}]}>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '500',
            paddingLeft: 55,
            paddingTop: 14,
            fontFamily: fonts.PoppinsBold,
          }}>
          {title}
        </Text>
      </View>
      {iconLeft && (
        <Image
          source={iconLeft}
          resizeMode="contain"
          style={{
            position: 'absolute',
            left: 10,
            height: 18,
            width: 18,
          }}
        />
      )}
      {iconRight && (
        <Image
          source={iconRight}
          resizeMode="contain"
          style={{
            position: 'absolute',
            right: 0,
            height: 10,
            widht: 18,
            tintColor: 'white',
          }}
        />
      )}
    </View>
  </TouchableOpacity>
);

export const GradientGoogleButton = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  onButtonPress,
  custombg,
}) => (
  // <TouchableOpacity
  //   style={styles.main}
  //   activeOpacity={1}
  //   onPress={onButtonPress}>
  //   <Image
  //     source={GoogleBtn}
  //     style={{
  //       width: '95%',
  //       height: 50,
  //       borderRadius: 100,
  //     }}
  //   />
  //   <View style={styles.absoluteView}>
  //     <Text
  //       style={{
  //         color: 'black',
  //         fontSize: 14,
  //         fontWeight: '500',
  //         fontFamily: fonts.PoppinsMedium,
  //       }}>
  //       {title}
  //     </Text>
  //   </View>
  //   {iconLeft && (
  //     <Image
  //       source={iconLeft}
  //       resizeMode="contain"
  //       style={{
  //         position: 'absolute',
  //         left: 30,
  //         height: 40,
  //         width: 40,
  //       }}
  //     />
  //   )}
  //   {iconRight && (
  //     <Image
  //       source={iconRight}
  //       resizeMode="contain"
  //       style={{
  //         position: 'absolute',
  //         left: 107,
  //         height: 10,
  //         widht: 18,
  //         tintColor: colors.secondary,
  //       }}
  //     />
  //   )}
  // </TouchableOpacity>

  <TouchableOpacity
    onPress={onButtonPress}
    style={{marginHorizontal: 10, marginTop: 20}}>
    <ImageBackground
      source={GoogleBtn}
      style={{
        height: 50,
        width: '100%',
        borderRadius: 100 / 2,
        overflow: 'hidden',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1}}>
        <View
          style={{
            flex: 1,

            justifyContent: 'center',
          }}>
          {iconLeft && (
            <Image
              source={Google2}
              style={{height: 30, width: 30, marginLeft: 20}}
            />
          )}
        </View>

        <View
          style={{
            flex: 1.3,
            // backgroundColor: 'green',

            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>{title}</Text>
        </View>
        <View
          style={{
            flex: 0.5,

            justifyContent: 'center',
            // backgroundColor: 'red',
            alignItems: 'center',
          }}>
          <Image
            source={arrowright}
            style={{height: 18, width: 18, tintColor: colors.secondary}}
          />
        </View>
      </View>
    </ImageBackground>
    {/* <GradientGoogleButton
    title="Sign in with google"
    iconLeft={Google2}
    iconRight={arrowright}
    onButtonPress={() => {
      signInG();
    }}
  /> */}
  </TouchableOpacity>
);

export const GradientfbButton = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  onButtonPress,
  custombg,
}) => (
  // <TouchableOpacity
  //   style={styles.main}
  //   activeOpacity={1}
  //   onPress={onButtonPress}>
  //   <Image
  //     source={facebookbtn}
  //     style={{
  //       width: '95%',
  //       height: 50,
  //       borderRadius: 100,
  //     }}
  //   />
  //   <View style={styles.absoluteView}>
  //     <Text
  //       style={{
  //         color: 'white',
  //         fontSize: 14,
  //         fontWeight: '500',
  //         fontFamily: fonts.PoppinsMedium,
  //       }}>
  //       {title}
  //     </Text>
  //   </View>
  //   {iconLeft && (
  //     <Image
  //       source={iconLeft}
  //       resizeMode="contain"
  //       style={{
  //         position: 'absolute',
  //         left: 25,
  //         height: 40,
  //         width: 40,
  //       }}
  //     />
  //   )}
  //   {iconRight && (
  //     <Image
  //       source={iconRight}
  //       resizeMode="contain"
  //       style={{
  //         position: 'absolute',
  //         left: 107,
  //         height: 10,
  //         widht: 18,
  //         tintColor: 'white',
  //       }}
  //     />
  //   )}
  // </TouchableOpacity>

  <TouchableOpacity onPress={onButtonPress} style={{marginHorizontal: 10}}>
    <ImageBackground
      source={fbBg}
      style={{
        height: 50,
        width: '100%',
        borderRadius: 100 / 2,
        overflow: 'hidden',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1}}>
        <View
          style={{
            flex: 1,

            justifyContent: 'center',
          }}>
          <Image
            source={Facebook}
            style={{height: 30, width: 30, marginLeft: 20}}
          />
        </View>
        <View
          style={{
            flex: 1.3,
            // backgroundColor: 'green',

            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>{title}</Text>
        </View>
        <View
          style={{
            flex: 0.5,

            justifyContent: 'center',
            // backgroundColor: 'red',
            alignItems: 'center',
          }}>
          <Image
            source={arrowright}
            style={{height: 18, width: 18, tintColor: 'white'}}
          />
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

export const GradientsigninButton = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  onButtonPress,
  custombg,
}) => (
  // <TouchableOpacity
  //   style={styles.main}
  //   activeOpacity={1}
  //   onPress={onButtonPress}>
  //   <Image
  //     source={buttonBg}
  //     style={{
  //       width: '95%',
  //       height: 50,
  //       borderRadius: 100,
  //     }}
  //   />
  //   <View style={styles.absoluteView}>
  //     <Text
  //       style={{
  //         color: 'white',
  //         fontSize: 14,
  //         fontWeight: '500',
  //         fontFamily: fonts.PoppinsMedium,
  //       }}>
  //       {title}
  //     </Text>
  //   </View>
  //   {iconLeft && (
  //     <Image
  //       source={iconLeft}
  //       resizeMode="contain"
  //       style={{
  //         position: 'absolute',
  //         left: 35,
  //         height: 18,
  //         width: 18,
  //       }}
  //     />
  //   )}
  //   {iconRight && (
  //     <Image
  //       source={iconRight}
  //       resizeMode="contain"
  //       style={{
  //         position: 'absolute',
  //         right: -220,
  //         height: 15,
  //         widht: 15,
  //         tintColor: 'white',
  //       }}
  //     />
  //   )}
  // </TouchableOpacity>

  <TouchableOpacity
    onPress={onButtonPress}
    style={{
      marginTop: 15,
      marginBottom: 40,
      marginHorizontal: 10,
    }}>
    <ImageBackground
      source={buttonBg}
      style={{
        height: 50,
        width: '100%',
        borderRadius: 100 / 2,
        overflow: 'hidden',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1}}>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
          }}>
          {iconLeft && (
            <Image
              source={iconLeft}
              style={{height: 18, width: 19, marginLeft: 20}}
            />
          )}
        </View>

        <View
          style={{
            // backgroundColor: 'green',
            flex: 4,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>{title}</Text>
        </View>
        <View
          style={{
            flex: 0.5,

            justifyContent: 'center',
            // backgroundColor: 'red',
            // alignItems: 'center',
          }}>
          {iconRight && (
            <Image
              source={arrowright}
              style={{height: 18, width: 18, tintColor: 'white'}}
            />
          )}
        </View>
      </View>
    </ImageBackground>
    {/* <GradientsigninButton
    title="Sign up instead"
    iconLeft={logout}
    onButtonPress={() => {
      navigation.navigate('Signup');
    }}
  /> */}
  </TouchableOpacity>
);

//login gradient button end///

//timeline gradient button starts///
export const GradientButtonyellow = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  onButtonPress,
}) => (
  <TouchableOpacity
    style={styles.main}
    activeOpacity={1}
    onPress={onButtonPress}>
    <Image
      source={GradientYellow}
      style={{
        width: '95%', //'95%'
        // //50
        height: 50,
        borderRadius: 100,
        // backgroundColor: `#ffa500`,
      }}
    />
    <View style={styles.absoluteView1}>
      <Text
        style={{
          color: 'rgb(0, 0, 0)',
          fontSize: 15,
          // fontWeight: '900',
          fontFamily: fonts.PoppinsBold,
        }}>
        {title}
      </Text>
    </View>
    {iconLeft && (
      <Image
        source={iconLeft}
        resizeMode="contain"
        style={{
          position: 'absolute',
          left: 40,
          height: 18,
          width: 18,
        }}
      />
    )}
    {iconRight && (
      <Image
        source={iconRight}
        resizeMode="contain"
        style={{
          position: 'absolute',
          right: -210,
          height: 18,
          widht: 18,
          tintColor: 'black',
        }}
      />
    )}
  </TouchableOpacity>
);

export const GradientButtongray = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  onButtonPress,
}) => (
  <TouchableOpacity
    style={styles.main}
    activeOpacity={1}
    onPress={onButtonPress}>
    <Image
      style={{
        width: '55%', //'95%'
        // //50
        height: 32,
        borderRadius: 100,
        backgroundColor: `#ffa500`,
      }}
    />
    <View style={styles.absoluteView1}>
      <Text
        style={{
          color: 'black',
          fontSize: 13,
          fontWeight: '900',
          fontFamily: fonts.PoppinsRegular,
        }}>
        {title}
      </Text>
    </View>
    {iconLeft && (
      <Image
        source={iconLeft}
        resizeMode="contain"
        style={{
          position: 'absolute',
          left: 105,
          height: 18,
          width: 18,
        }}
      />
    )}
    {iconRight && (
      <Image
        source={iconRight}
        resizeMode="contain"
        style={{
          position: 'absolute',
          left: 280,
          height: 18,
          widht: 18,
          tintColor: 'white',
        }}
      />
    )}
  </TouchableOpacity>
);

//MyDashboard Gradient button starts///

export const GradientButtonupgrade = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  onButtonPress,
}) => (
  <TouchableOpacity
    style={[styles.main, {}]}
    // activeOpacity={1}
    onPress={onButtonPress}>
    <Image
      source={unblockuserbutton}
      style={{
        width: '95%', //'95%'
        // //50
        height: 30,
        borderRadius: 100,
      }}
    />
    <View style={styles.absoluteView}>
      <Text
        style={{
          color: 'black',
          fontSize: 13,
          fontWeight: 'bold',
          fontFamily: fonts.PoppinsMedium,
        }}>
        {title}
      </Text>
    </View>
    {iconLeft && (
      <Image
        source={iconLeft}
        resizeMode="contain"
        style={{
          position: 'absolute',
          left: 15,
          height: 15,
          width: 15,
        }}
      />
    )}
    {iconRight && (
      <Image
        source={iconRight}
        resizeMode="contain"
        style={{
          position: 'absolute',
          right: -3,
          height: 10,
          widht: 15,
          // tintColor: 'violet',
          color: 'colors.secondary',
        }}
      />
    )}
  </TouchableOpacity>
);

export const GradientButtonupgrade1 = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  onButtonPress,
}) => (
  <TouchableOpacity
    style={styles.main}
    // activeOpacity={1}
    onPress={onButtonPress}>
    <Image
      source={GradientYellow}
      style={{
        width: '90%', //'95%'
        // //50
        height: 30,
        borderRadius: 100,
      }}
    />
    <View style={styles.absoluteView}>
      <Text
        style={{
          color: colors.darkBlack,
          fontSize: 13,
          fontWeight: 'bold',
          fontFamily: fonts.PoppinsMedium,
        }}>
        {title}
      </Text>
    </View>
    {iconLeft && (
      <Image
        source={iconLeft}
        resizeMode="contain"
        style={{
          position: 'absolute',
          left: 22,
          height: 15,
          width: 15,
        }}
      />
    )}
    {iconRight && (
      <Image
        source={iconRight}
        resizeMode="contain"
        style={{
          position: 'absolute',
          right: -10,
          height: 10,
          widht: 15,
          // tintColor: 'violet',
          color: 'colors.secondary',
        }}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 10,
  },
  absoluteView: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0.8,
    backgroundColor: 'transparent',
  },
  absoluteView1: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0.8,
    backgroundColor: 'transparent',
    paddingLeft: 20,
  },
});
