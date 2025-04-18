//본인 인증
import {apiRequester} from '@/main/apis/requester.ts';
import {END_POINT} from '@/main/shared/constants/api.ts';
import {TicketType} from '@/main/shared/types/payment/domain.ts';
import {
  PaymentDetailResponse,
  PaymentHistoryRequest,
  PaymentHistoryResponse,
  PaymentRegistRequest,
  TicketListResponse,
} from '@/main/shared/types/payment/api.ts';
import {Response} from '@/main/shared/types/common/api.ts';

export async function getTicketRecord(
  type: TicketType,
  lastPurchaseId?: number,
): Promise<TicketListResponse> {
  const params = lastPurchaseId ? {lastPurchaseId} : {};
  const {data} = await apiRequester.get<Response<TicketListResponse>>(
    END_POINT.TICKET_RECORD(type),
    {params: {...params}},
  );
  return data.body;
}

export async function postRegistPayment(request: PaymentRegistRequest) {
  const {data} = await apiRequester.post<Response<null>>(END_POINT.PAYMENT, {
    ...request,
  });
  return data.body;
}

export async function postPaymentHistory(request: PaymentHistoryRequest) {
  const {data} = await apiRequester.post<Response<PaymentHistoryResponse>>(
    END_POINT.PAYMENT_HISTORY,
    {
      ...request,
    },
  );
  return data.body;
}

export async function getTicketDetail(
  purchaseId: number,
): Promise<PaymentDetailResponse> {
  const {data} = await apiRequester.get<Response<PaymentDetailResponse>>(
    END_POINT.TICKET_DETAIL(purchaseId),
  );
  return data.body;
}
