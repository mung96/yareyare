import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthParamList} from '@/main/apps/navigations/AuthNavigation.tsx';
import {PATH} from '@/main/shared/constants';
import CommonLayout from '@/main/apps/layout/CommonLayout';

function LoginScreen() {
  const navigation = useNavigation<NavigationProp<AuthParamList>>();

  const handleGoogleLoginBtn = () => {
    Alert.alert('알림', '아직 개발 중이에요. 다른 방법으로 로그인해주세요', [
      {
        text: '확인',
        onPress: () => {},
        style: 'destructive',
      },
    ]);
  };
  return (
    <CommonLayout>
      <Image
        source={require('@/main/assets/yareLogo.png')}
        resizeMode={'contain'}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.naverButton]}
          onPress={() => navigation.navigate(PATH.SOCIAL, {social: 'naver'})}>
          <Image
            source={require('@/main/assets/Naver.png')}
            resizeMode={'contain'}
          />
          <Text style={[styles.buttonText, styles.naverText]}>
            네이버로 계속하기
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.kakaoButton]}
          onPress={() => navigation.navigate(PATH.SOCIAL, {social: 'kakao'})}>
          <Image
            source={require('@/main/assets/Kakao.png')}
            resizeMode={'contain'}
          />
          <Text style={[styles.buttonText, styles.kakaoText]}>
            카카오로 계속하기
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.googleButton]}
          onPress={handleGoogleLoginBtn}>
          <Image
            source={require('@/main/assets/Google.png')}
            resizeMode={'contain'}
          />
          <Text style={[styles.buttonText, styles.googleText]}>
            구글로 계속하기
          </Text>
        </Pressable>
      </View>
    </CommonLayout>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  kakaoText: {
    color: '#33373F',
  },
  googleButton: {
    backgroundColor: '#F3F3F3',
  },
  googleText: {
    color: '#33373F',
  },
  naverButton: {
    backgroundColor: '#03C75A',
  },
  naverText: {
    color: 'white',
  },
});

export default LoginScreen;
