import {View} from 'react-native';
import DayPicker from '@/ui/components/common/DayPicker';

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      <DayPicker />
    </View>
  );
}

export default HomeScreen;
