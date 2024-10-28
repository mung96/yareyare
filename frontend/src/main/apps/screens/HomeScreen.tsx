import {View} from 'react-native';
import DayPicker from '@/main/ui/components/common/DayPicker.tsx';

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
