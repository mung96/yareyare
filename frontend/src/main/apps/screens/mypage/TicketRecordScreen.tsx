import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';
import {ActivityIndicator, FlatList, View} from 'react-native';
import TicketRecordItem from '@/main/ui/components/member/TicketRecordItem.tsx';
import {COLORS} from '@/main/shared/styles';
import useTicketRecordModel from '@/main/services/hooks/useTicketRecordModel.ts';

function TicketRecordScreen({
  route,
}: NativeStackScreenProps<MypageParamList, 'TicketRecord'>) {
  const recordType = route.params.type;
  const {ticketRecordList, updateTicketRecordList, isFetching} =
    useTicketRecordModel(recordType);

  return (
    <View
      style={{
        paddingHorizontal: 12,
        alignItems: 'center',
        gap: 12,
        width: '100%',
        backgroundColor: COLORS.WHITE,
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={ticketRecordList}
        renderItem={ticket => <TicketRecordItem ticket={ticket.item} />}
        keyExtractor={ticket => String(ticket.purchaseId)}
        onEndReached={() => updateTicketRecordList()}
        onEndReachedThreshold={1}
        ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
      />
    </View>
  );
}

export default TicketRecordScreen;
