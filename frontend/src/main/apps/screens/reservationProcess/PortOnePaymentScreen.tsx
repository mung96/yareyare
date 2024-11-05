import {Payment} from '@portone/react-native-sdk';
import {PORTONE_CHANNEL_KEY, PORTONE_STORE_ID} from '@env';

function PortOnePaymentScreen() {
  return (
    <Payment
      request={{
        storeId: PORTONE_STORE_ID,
        channelKey: PORTONE_CHANNEL_KEY,
        customer: {fullName: 'aaa'},
        paymentId: `payment-${1211}`,
        orderName: '나이키 와플 트레이너 2 SD',
        totalAmount: 1000,
        currency: 'CURRENCY_KRW',
        payMethod: 'CARD',
      }}
      onError={error => console.log(error)}
      onComplete={response => console.log(response)}
    />
  );
}

export default PortOnePaymentScreen;
