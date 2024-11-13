import {StyleSheet, View} from 'react-native';
import PaymentMethodList from '@/main/ui/components/reservation/PaymentMethodList';
import ExpectedPayment from '@/main/ui/components/reservation/ExpectedPayment.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {COLORS} from '@/main/shared/styles';
import {Controller, useForm} from 'react-hook-form';
import {PaymentContext, PaymentStep} from '@/main/shared/types';
import {useSelectSeatMutation} from '@/main/services/hooks/queries/useSeatQuery.ts';
import {usePaymentHistoryMutation} from '@/main/services/hooks/queries/usePaymentQuery.ts';
import {PATH} from '@/main/shared/constants';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ReservationParamList} from '@/main/apps/navigations/ReservationNavigation.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '@/main/stores/rootReducer.ts';

type Props = {
  onPrev: () => void;
  context: PaymentStep;
};

function PaymentScreen({onPrev, context}: Props) {
  const gameId = useSelector((state: RootState) => state.game.gameId);
  const {control, handleSubmit} = useForm<PaymentContext>({
    defaultValues: {
      paymentMethod: '카드결제',
    },
  });
  const navigation = useNavigation<NavigationProp<ReservationParamList>>();
  const {mutate: postPaymentHistory} = usePaymentHistoryMutation({
    onSuccess: data => {
      console.log(data);
      navigation.navigate(PATH.PORTONE_PAYMENT, {
        ...context,
        totalPrice: data.totalPrice,
        paymentMethod: control._formValues.paymentMethod,
      });
    },
    onError: error => {
      console.log(error);
    },
  });
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {value, onChange}}) => (
          <PaymentMethodList select={value} onSelect={onChange} />
        )}
        name="paymentMethod"
      />
      <ExpectedPayment />

      <MainButton
        label={'결제 및 완료'}
        onPress={handleSubmit(() =>
          postPaymentHistory({
            gameId: Number(gameId),
            seats: context.seatList.map(seat => {
              return {
                seatId: Number(seat.seatId),
              };
            }),
          }),
        )}
        size={'large'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});
export default PaymentScreen;
