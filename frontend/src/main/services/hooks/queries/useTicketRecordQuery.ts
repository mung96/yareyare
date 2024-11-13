import {TicketType} from '@/main/shared/types/payment/domain.ts';
import {useQuery} from '@tanstack/react-query';
import {getTicketRecord} from '@/main/apis/payment.ts';

export function useGetTicketRecordQuery(type: TicketType, purchaseId?: number) {
  return useQuery({
    queryFn: () => getTicketRecord(type, purchaseId),
    queryKey: ['ticketRecord', type, purchaseId],
  });
}
