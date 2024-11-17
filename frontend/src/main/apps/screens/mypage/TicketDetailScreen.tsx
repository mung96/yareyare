import {Alert, ScrollView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';
import {useGetTicketDetailQuery} from '@/main/services/hooks/queries/useTicketRecordQuery.ts';
import {isAxiosError} from 'axios';
import TicketDetailBox from '@/main/ui/components/member/TicketDetailBox.tsx';
import {COLORS} from '@/main/shared/styles';
import TicketDetailChip from '@/main/ui/components/member/TicketDetailChip.tsx';
import TicketDetailButton from '@/main/ui/components/member/TicketDetailButton.tsx';
import {PATH} from '@/main/shared/constants';

function TicketDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<MypageParamList, 'TicketDetail'>) {
  console.log(route.params.purchaseId);

  const {data: ticketDetailData, error} = useGetTicketDetailQuery(
    route.params.purchaseId,
  );

  if (isAxiosError(error)) {
    Alert.alert('', '해당 구매 내역이 존재하지 않아요', [
      {
        text: '돌아가기',
        onPress: () => {
          navigation.pop();
        },
        style: 'destructive',
      },
    ]);
  }
  return (
    <ScrollView contentContainerStyle={styles.layout}>
      <TicketDetailBox title={'예매정보'}>
        <TicketDetailChip label={'관람일시'} value={'2024'} />
        <TicketDetailChip label={'예매일'} value={'2024'} />
        <TicketDetailChip label={'예매번호'} value={'2024'} />
        <TicketDetailChip label={'예매상태'} value={'2024'} />
      </TicketDetailBox>

      <TicketDetailBox
        title={'티켓 수령방법'}
        button={
          <TicketDetailButton
            title={'모바일티켓보기'}
            onPress={() =>
              navigation.navigate(PATH.TICKET_IMAGE, ticketDetailData!)
            }
          />
        }>
        <TicketDetailChip label={'수령방법'} value={'2024'} />
      </TicketDetailBox>

      <TicketDetailBox title={'결제정보'}>
        <TicketDetailChip label={'금액'} value={'2024'} />
        <TicketDetailChip label={'수수료'} value={'2024'} />
        <TicketDetailChip label={'총 결제금액'} value={'2024'} />
      </TicketDetailBox>

      <TicketDetailBox
        title={'좌석정보'}
        button={
          <TicketDetailButton
            title={'좌석 위치보기'}
            onPress={() => console.log('클릭')}
          />
        }>
        <TicketDetailChip label={'티켓번호'} value={'2024'} />
        <TicketDetailChip label={'좌석등급'} value={'2024'} />
        <TicketDetailChip label={'좌석번호'} value={'2024'} />
        <TicketDetailChip label={'가격'} value={'2024'} />
      </TicketDetailBox>

      <TicketDetailBox
        title={'취소기한'}
        button={
          <TicketDetailButton
            title={'좌석 위치보기'}
            onPress={() => console.log('클릭')}
          />
        }>
        <TicketDetailChip label={'티켓번호'} value={'2024'} />
        <TicketDetailChip label={'좌석등급'} value={'2024'} />
        <TicketDetailChip label={'좌석번호'} value={'2024'} />
        <TicketDetailChip label={'가격'} value={'2024'} />
      </TicketDetailBox>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layout: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 21,
    gap: 12,
    backgroundColor: COLORS.WHITE,
  },
});
export default TicketDetailScreen;
