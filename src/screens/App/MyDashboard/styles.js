import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  categoryContainer: {
    flex: 0.5,
    justifyContent: 'center',
    padding: 12,
    alignItems: 'center',
    // marginTop: 10,
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 0.2,
    borderColor: '#ddd',
    shadowColor: '#BDBDBD',
    shadowOpacity: 0.6,
    // justifyContent: 'center',
    // alignItems: 'cenboter',
    elevation: 4,
    margin: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});
export default styles;
