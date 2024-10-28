import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Calendar />
    </View>
  );
}

export default HomeScreen;
