import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {WEB_VIEW_SERVER} from '@env';
import {useRef} from 'react';
import useMemberModel from '@/main/services/hooks/useMemberModel.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ReservationParamList} from '@/main/apps/navigations/ReservationNavigation.tsx';

function PortOnePaymentScreen({
  route,
}: NativeStackScreenProps<ReservationParamList, 'PortOnePayment'>) {
  const {member} = useMemberModel();
  const params = route.params;
  console.log(params);
  const message = {
    type: 'payement',
    email: member?.email,
    phoneNumber: member?.tel,
    fullName: member?.name,
    orderName: '포트원 결제',
    totalAmount: params.price * params.seatList.length,
    paymentId: '1113124567',
  };
  const webViewRef = useRef<WebView>(null);
  const onLoad = async () => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({...message}));
    }
  };
  const handleOnMessage = async (event: WebViewMessageEvent) => {
    console.log(event.nativeEvent);
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
