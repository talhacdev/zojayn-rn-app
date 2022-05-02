import {StyleSheet} from 'react-native';
import colors from '../../../theme/colors';
const styles = StyleSheet.create({
  avatar: {
    margin: 5,
    borderRadius: 100,
    backgroundColor: '#eee',
    elevation: 1,
    marginTop: 5,
    alignSelf: 'center',
  },
  bottomIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  item: {
    // alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    borderRadius: 5,
    // backgroundColor: colors.primary,
    paddingVertical: 15,
    marginHorizontal: 15,

    // height: 45,
  },
});
export default styles;
