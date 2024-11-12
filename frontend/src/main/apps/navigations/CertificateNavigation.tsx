import React from 'react';
import {PATH} from '@/main/shared/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import {Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';
import CertificateStartScreen from '@/main/apps/screens/certificate/CertificateStartScreen.tsx';
import CertificateScreen from '@/main/apps/screens/certificate/CertificateScreen.tsx';
import CertificateRedirectScreen from '@/main/apps/screens/certificate/CertificateRedirectScreen.tsx';
type CertificationData = {
  data: {
    carrier: string;
    company: string;
    merchant_uid: string;
    name: string;
    phone: string;
  };
  userCode: string;
};

export type CertificateParamList = {
  [PATH.CERTIFICATE_START]: undefined;
  [PATH.CERTIFICATE]: CertificationData;
  [PATH.CERTIFICATE_REDIRECT]: undefined;
};

const Stack = createNativeStackNavigator<CertificateParamList>();

function ReservationNavigation() {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <Pressable onPress={() => dispatch(moveNavigation('navbar'))}>
            <Icon name={'x'} size={22} />
          </Pressable>
        ),
      }}>
      <Stack.Screen
        name={PATH.CERTIFICATE_START}
        component={CertificateStartScreen}
      />
      <Stack.Screen name={PATH.CERTIFICATE} component={CertificateScreen} />
      <Stack.Screen
        name={PATH.CERTIFICATE_REDIRECT}
        component={CertificateRedirectScreen}
      />
    </Stack.Navigator>
  );
}

export default ReservationNavigation;
