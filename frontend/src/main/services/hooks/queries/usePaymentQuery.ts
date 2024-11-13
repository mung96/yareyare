import {useMutation} from '@tanstack/react-query';
import {
  PaymentDto,
  PaymentHistoryRequest,
} from '@/main/shared/types/payment/api.ts';
import {MutationOptionsWithoutFn} from '@/main/shared/types/common/api.ts';
import {postPaymentHistory, postRegistPayment} from '@/main/apis/payment.ts';

export function usePaymentHistoryMutation(
  mutationOption?: MutationOptionsWithoutFn<PaymentHistoryRequest, PaymentDto>,
) {
  return useMutation<PaymentDto, unknown, PaymentHistoryRequest>({
    mutationFn: async variables => {
      return await postPaymentHistory(variables);
    },
    ...mutationOption,
  });
}

export function usePaymentRegistMutation(
  mutationOption?: MutationOptionsWithoutFn<PaymentDto, null>,
) {
  return useMutation<null, unknown, PaymentDto>({
    mutationFn: async variables => {
      return await postRegistPayment(variables);
    },
    ...mutationOption,
  });
}
