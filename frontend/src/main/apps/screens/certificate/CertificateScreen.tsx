import {Text, View} from 'react-native';
import IMP from 'iamport-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CertificateParamList} from '@/main/apps/navigations/CertificateNavigation.tsx';
import {PATH} from '@/main/shared/constants';
import {postCertificate} from '@/main/apis/member.ts';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';
const Loading = () => {
  return (
    <View>
      <Text>loading...</Text>
    </View>
  );
};
type CertificateStartScreenProps = NativeStackScreenProps<
  CertificateParamList,
  'Certificate'
>;

type CertificationResponse = {
  imp_uid: string;
  merchant_uid: string;
  success: string;
};
function CertificateScreen({navigation, route}: CertificateStartScreenProps) {
  /* 가맹점 식별코드, 본인인증 데이터 추출 */
  const dispatch = useDispatch();

  const userCode = route.params.userCode;
  const data = route.params.data;

  /* 본인인증 후 실행될 콜백 함수 입력 */
  async function callback(response: CertificationResponse) {
    console.log(response);
    const isSuccessed = getIsSuccessed(response);
    if (isSuccessed) {
      /* 본인인증 성공한 경우, 리디렉션 위해 홈으로 이동한다 */
      try {
        const {status} = await postCertificate(response.imp_uid);
        if (status === 201) {
          // dispatch(moveNavigation('navbar'))}
        }
      } catch (error) {
        console.log(error);
        navigation.goBack();
      }
    } else {
      navigation.goBack();
    }
  }

  function getIsSuccessed(response: CertificationResponse) {
    const {success} = response;

    if (typeof success === 'string') {
      return success === 'true';
    }
    if (typeof success === 'boolean') {
      return success === true;
    }
  }

  return (
    <IMP.Certification
      userCode={userCode}
      loading={<Loading />}
      data={{
        ...data,
      }}
      callback={callback}
    />
  );
}

export default CertificateScreen;
