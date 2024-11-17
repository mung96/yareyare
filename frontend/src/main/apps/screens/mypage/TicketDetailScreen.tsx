import {Alert, ScrollView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';
import {useGetTicketDetailQuery} from '@/main/services/hooks/queries/useTicketRecordQuery.ts';
import {isAxiosError} from 'axios';
import TicketDetailBox from '@/main/ui/components/member/TicketDetailBox.tsx';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {COLORS} from '@/main/shared/styles';

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
        <CustomText>관람일시</CustomText>
        <CustomText>2024</CustomText>
      </TicketDetailBox>
      {/*<Text*/}
      {/*    onPress={() =>*/}
      {/*        navigation.navigate(PATH.TICKET_IMAGE, ticketDetailData!)*/}
      {/*    }>*/}
      {/*</Text>*/}
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
