import {StyleSheet, View} from 'react-native';
import PaymentMethodList from '@/main/ui/components/reservation/PaymentMethodList';
import ExpectedPayment from '@/main/ui/components/reservation/ExpectedPayment.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {COLORS} from '@/main/shared/styles';
import {Controller, useForm} from 'react-hook-form';
import {PaymentContext, PaymentStep} from '@/main/shared/types';
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
  const {
    control,
    handleSubmit,
    formState: {isValid: isFormValid, isSubmitting},
  } = useForm<PaymentContext>({
    defaultValues: {
      paymentMethod: '카드결제',
    },
  });
  const navigation = useNavigation<NavigationProp<ReservationParamList>>();
  const {mutate: postPaymentHistory} = usePaymentHistoryMutation({
    onSuccess: data => {
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
    <>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({field: {value, onChange}}) => (
            <PaymentMethodList select={value} onSelect={onChange} />
          )}
          name="paymentMethod"
        />
        <ExpectedPayment
          price={context.price * context.seatList.length}
          charge={context.seatList.length * 1000}
        />
      </View>

      <View style={styles.buttonContainer}>
        <MainButton
          label={'이전'}
          onPress={onPrev}
          size={'large'}
          variant={'outlined'}
          style={{width: '25%'}}
        />
        <MainButton
          label={'다음'}
          style={{width: '75%'}}
          onPress={handleSubmit(() =>
            postPaymentHistory({
              idempotencyKey: context.idempotencyKey,
              gameId: Number(gameId),
              seatIds: context.seatList.map(seat => Number(seat.seatId)),
            }),
          )}
          size={'large'}
          disabled={!isFormValid || isSubmitting}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  buttonContainer: {
    backgroundColor: COLORS.WHITE,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingRight: 32,
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 0.3,
    borderColor: COLORS.GRAY_200,
  },
});
export default PaymentScreen;
