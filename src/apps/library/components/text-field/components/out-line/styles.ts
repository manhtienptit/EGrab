import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: 7,
    borderColor: 'gray',
    paddingLeft : 8,
    paddingRight : 10,
    justifyContent: 'center',
  },
  input: {
    color: '#000',
    padding: 0,
    borderBottomColor: 'transparent',
  },
  text: {
    alignSelf: 'flex-start',
    zIndex: 4,
    top : -10,
    left: 30,
  },
  wrapLabel: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  wrapPlaceHolder: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingLeft: 5,
  },
  flex: {
    flex: 1,
    marginTop : 10,
    paddingHorizontal: 5,
  },
  icon: {
    marginTop : 30,
  },
});
