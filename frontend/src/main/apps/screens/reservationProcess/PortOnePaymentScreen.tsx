import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {PORTONE_REDIRECT_URI, WEB_VIEW_SERVER} from '@env';
import {useRef, useState} from 'react';
import useMemberModel from '@/main/services/hooks/useMemberModel.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ReservationParamList} from '@/main/apps/navigations/ReservationNavigation.tsx';
import {usePaymentRegistMutation} from '@/main/services/hooks/queries/usePaymentQuery.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PATH} from '@/main/shared/constants';
import LoadingScreen from '@/main/apps/screens/LoadingScreen.tsx';

function PortOnePaymentScreen({
  route,
}: NativeStackScreenProps<ReservationParamList, 'PortOnePayment'>) {
  const {member} = useMemberModel();
  const [isLoading, setIsLoading] = useState(true);
  const params = route.params;
  const navigation = useNavigation<NavigationProp<ReservationParamList>>();
  const {mutate: registPayment} = usePaymentRegistMutation({
    onSuccess: () => {
      navigation.navigate(PATH.PORTONE_REDIRECT);
    },
    onError: error => {
      console.log(error);
    },
  });
  const message = {
    type: 'payement',
    email: member?.email,
    phoneNumber: member?.tel,
    fullName: member?.name,
    orderName: '포트원 결제',
    totalAmount: params.totalPrice,
    paymentId: params.idempotencyKey,
  };
  const webViewRef = useRef<WebView>(null);

  const onLoad = async () => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({...message}));
    }
    setIsLoading(false);
  };
  const handleOnMessage = async (event: WebViewMessageEvent) => {
    console.log(event.nativeEvent);
    console.log(event.nativeEvent.url.includes(`${PORTONE_REDIRECT_URI}?`));
    console.log(`${PORTONE_REDIRECT_URI}?`);
    if (event.nativeEvent.url.includes(`${PORTONE_REDIRECT_URI}?`)) {
      console.log(event.nativeEvent.url.split('?')[1].split('&'));

      const queryString = event.nativeEvent.url.split('?')[1].split('&');
      console.log(queryString[0].split('=')[1].split('-')[1]);
      registPayment({
        idempotencyKey: queryString[0].split('=')[1].split('-')[1],
        vendor: 'PAYMENT',
      });
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <WebView
        source={{
          uri: `${WEB_VIEW_SERVER}/payment`,
        }}
        onMessage={handleOnMessage}
        javaScriptEnabled={true}
        mixedContentMode="always"
        domStorageEnabled={true}
        ref={webViewRef}
        onLoad={onLoad}
      />
    </>
  );
}

export default PortOnePaymentScreen;
