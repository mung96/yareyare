import {useMutation} from '@tanstack/react-query';
import {
  PaymentHistoryRequest,
  PaymentHistoryResponse,
  PaymentRegistRequest,
} from '@/main/shared/types/payment/api.ts';
import {MutationOptionsWithoutFn} from '@/main/shared/types/common/api.ts';
import {postPaymentHistory, postRegistPayment} from '@/main/apis/payment.ts';

export function usePaymentHistoryMutation(
  mutationOption?: MutationOptionsWithoutFn<
    PaymentHistoryRequest,
    PaymentHistoryResponse
  >,
) {
  return useMutation<PaymentHistoryResponse, unknown, PaymentHistoryRequest>({
    mutationFn: async variables => {
      return await postPaymentHistory(variables);
    },
    ...mutationOption,
  });
}

export function usePaymentRegistMutation(
  mutationOption?: MutationOptionsWithoutFn<PaymentRegistRequest, null>,
) {
  return useMutation<null, unknown, PaymentRegistRequest>({
    mutationFn: async variables => {
      return await postRegistPayment(variables);
    },
    ...mutationOption,
  });
}
