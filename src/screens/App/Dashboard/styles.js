import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,

    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 10,
    shadowColor: '#BDBDBD',
    shadowOpacity: 0.6,
    // justifyContent: 'center',
    // alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  footerIcon: {
    elevation: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    elevation: 5,
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
    top: height / 6,
  },
  badge: {
    alignSelf: 'flex-end',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 100,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageFooter: {
    // backgroundColor: 'teal',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 10,
  },
});
export default styles;
