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
  const dispatch = useDispatch();
  const userCode = route.params.userCode;
  const data = route.params.data;

  async function callback(response: CertificationResponse) {
    const isSuccessed = getIsSuccessed(response);
    if (isSuccessed) {
      try {
        const {status} = await postCertificate(response.imp_uid);
        if (status === 201) {
          dispatch(moveNavigation('navbar'));
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
