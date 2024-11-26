import {useEffect, useState} from 'react';
import {TicketType} from '@/main/shared/types/payment/domain.ts';
import {useGetTicketRecordQuery} from '@/main/services/hooks/queries/useTicketRecordQuery.ts';
import {TicketResponse} from '@/main/shared/types/payment/api.ts';

const useTicketRecordModel = (type: TicketType) => {
  const [purchaseId, setPurchaseId] = useState(0);
  const [ticketRecordList, setTicketRecordList] = useState<TicketResponse[]>(
    [],
  );

  const {
    data: ticketListData,
    isFetching,
    isSuccess,
  } = useGetTicketRecordQuery(type, purchaseId);

  useEffect(() => {
    if (isSuccess) {
      setTicketRecordList(prev => [...prev, ...ticketListData.tickets.content]);
    }
  }, [isSuccess, ticketListData]);

  const updateTicketRecordList = () => {
    if (ticketListData?.tickets.hasNext) {
      setPurchaseId(
        ticketListData.tickets.content[
          ticketListData.tickets.content.length - 1
        ].purchaseId,
      );
    }
  };

  return {
    ticketRecordList,
    updateTicketRecordList,
    isFetching,
  };
};

export default useTicketRecordModel;
