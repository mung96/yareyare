import {Alert, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';

function PortOneRedirectScreen({}) {
  const dispatch = useDispatch();
  Alert.alert('알림', '아직 개발 중이에요. 다른 방법으로 로그인해주세요', [
    {
      text: '결제가 완료되었습니다',
      onPress: () => {
        dispatch(moveNavigation('navbar'));
      },
      style: 'destructive',
    },
  ]);
  return (
    <Image
      source={require('@/main/assets/yareLogo.png')}
      resizeMode={'contain'}
    />
  );
}

export default PortOneRedirectScreen;
