import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import {TicketResponse} from '@/main/shared/types/payment/api.ts';

type Props = {
  ticket: TicketResponse;
};

function TicketRecordItem({ticket}: Props) {
  console.log(ticket);
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>
        {ticket.seasonName} {ticket.homeTeamName} vs {ticket.awayTeamName}
      </CustomText>
      <View style={styles.content}>
        <View style={styles.ticketImageBox} />
        <View style={styles.textContainer}>
          <View style={styles.textBox}>
            <CustomText style={[styles.ticketText, styles.label]}>
              예매번호
            </CustomText>
            <CustomText style={[styles.ticketText, styles.value]}>
              {ticket.reservationId}
            </CustomText>
          </View>
          <View style={styles.textBox}>
            <CustomText style={[styles.ticketText, styles.label]}>
              예매일
            </CustomText>
            <CustomText style={[styles.ticketText, styles.value]}>
              {ticket.reservationDate}
            </CustomText>
          </View>
          <View style={styles.textBox}>
            <CustomText style={[styles.ticketText, styles.label]}>
              장소
            </CustomText>
            <CustomText style={[styles.ticketText, styles.value]}>
              {ticket.stadiumName}
            </CustomText>
          </View>
          <View style={styles.textBox}>
            <CustomText style={[styles.ticketText, styles.label]}>
              경기일시
            </CustomText>
            <CustomText style={[styles.ticketText, styles.value]}>
              {ticket.gameDateTime}
            </CustomText>
          </View>

          <View style={styles.textBox}>
            <CustomText style={[styles.ticketText, styles.label]}>
              취소가능일시
            </CustomText>
            <CustomText style={[styles.ticketText, styles.value]}>
              {ticket.cancelDeadline}
            </CustomText>
          </View>
          <View style={styles.textBox}>
            <CustomText style={[styles.ticketText, styles.label]}>
              상태
            </CustomText>
            <CustomText style={[styles.ticketText, styles.value]}>
              {ticket.purchaseStatus}
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 8,
    borderBottomWidth: 0.3,
    paddingVertical: 22,
  },
  content: {
    width: '100%',
    display: 'flex',
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
  },
  ticketImageBox: {
    width: 120,
    height: 160,
    backgroundColor: COLORS.GRAY_500,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 8,
  },
  textBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 220,
    gap: 10,
  },
  ticketText: {
    fontSize: 12,
  },
  label: {
    flexBasis: 70,
    flexShrink: 0,
    color: COLORS.GRAY_300,
  },
  value: {
    flex: 1, // 남은 공간을 차지하도록 설정
  },
});

export default TicketRecordItem;
