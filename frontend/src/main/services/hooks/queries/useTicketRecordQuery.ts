import {TicketType} from '@/main/shared/types/payment/domain.ts';
import {useQuery} from '@tanstack/react-query';
import {getTicketDetail, getTicketRecord} from '@/main/apis/payment.ts';

export function useGetTicketRecordQuery(type: TicketType, purchaseId?: number) {
  return useQuery({
    queryFn: () => getTicketRecord(type, purchaseId),
    queryKey: ['ticketRecord', type, purchaseId],
  });
}

export function useGetTicketDetailQuery(purchaseId: number) {
  return useQuery({
    queryFn: () => getTicketDetail(purchaseId),
    queryKey: ['ticketDetail', purchaseId],
  });
}
