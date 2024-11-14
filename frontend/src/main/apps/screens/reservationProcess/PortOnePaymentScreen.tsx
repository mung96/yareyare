import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {PORTONE_REDIRECT_URI, WEB_VIEW_SERVER} from '@env';
import {useRef} from 'react';
import useMemberModel from '@/main/services/hooks/useMemberModel.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ReservationParamList} from '@/main/apps/navigations/ReservationNavigation.tsx';
import {usePaymentRegistMutation} from '@/main/services/hooks/queries/usePaymentQuery.ts';

function PortOnePaymentScreen({
  route,
}: NativeStackScreenProps<ReservationParamList, 'PortOnePayment'>) {
  const {member} = useMemberModel();
  const params = route.params;
  const {mutate: registPayment} = usePaymentRegistMutation({
    onSuccess: () => {},
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
  };
  const handleOnMessage = async (event: WebViewMessageEvent) => {
    console.log(event.nativeEvent);
    if (event.nativeEvent.url.includes(`${PORTONE_REDIRECT_URI}?`)) {
      const queryString = event.nativeEvent.url.split('?')[1].split('&');
      const paymentInfo = {
        transactionType: queryString[1].split('=')[1],
        paymentId: queryString[3].split('=')[1],
        txId: queryString[5].split('=')[1],
      };
      console.log(queryString);
      console.log(paymentInfo);
      registPayment({
        idempotencyKey: queryString[3].split('=')[1],
        vendor: 'PAYMENT',
      });
      // const response = await apiRequester.get(`members/token/${token}`);
    }
  };

  return (
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
  );
}

export default PortOnePaymentScreen;
