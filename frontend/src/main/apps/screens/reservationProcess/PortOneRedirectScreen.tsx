import {Alert, Image, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';

function PortOneRedirectScreen({}) {
  const dispatch = useDispatch();
  Alert.alert('알림', '결제가 완료되었어요.', [
    {
      text: '홈으로',
      onPress: () => {
        dispatch(moveNavigation('navbar'));
      },
      style: 'destructive',
    },
  ]);
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('@/main/assets/yareLogo.png')}
        resizeMode={'contain'}
      />
    </View>
  );
}

export default PortOneRedirectScreen;
