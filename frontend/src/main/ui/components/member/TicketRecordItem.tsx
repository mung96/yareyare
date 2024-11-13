import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';

function TicketRecordItem() {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>
        2024 신한SOL뱅크 KBO리그 롯데vs두산
      </CustomText>
      <View style={styles.content}>
        <View style={styles.ticketImageBox} />
        <View style={styles.textContainer}>
          <View style={styles.textBox}>
            <CustomText style={[styles.ticketText, styles.label]}>
              예매번호
            </CustomText>
            <CustomText style={[styles.ticketText, styles.value]}>
              T3271381
            </CustomText>
          </View>
          <View style={styles.textBox}>
            <CustomText style={[styles.ticketText, styles.label]}>
              예매일
            </CustomText>
            <CustomText style={[styles.ticketText, styles.value]}>
              2024.06.08
            </CustomText>
          </View>
          <View style={styles.textBox}>
            <CustomText style={[styles.ticketText, styles.label]}>
              장소
            </CustomText>
            <CustomText style={[styles.ticketText, styles.value]}>
              잠실야구장
            </CustomText>
          </View>
          <View style={styles.textBox}>
            <CustomText style={[styles.ticketText, styles.label]}>
              경기일시
            </CustomText>
            <CustomText style={[styles.ticketText, styles.value]}>
              2024.06.13(목) 18:30
            </CustomText>
          </View>

          <View style={styles.textBox}>
            <CustomText style={[styles.ticketText, styles.label]}>
              취소가능일시
            </CustomText>
            <CustomText style={[styles.ticketText, styles.value]}>
              2024.06.12(수) 23:59
            </CustomText>
          </View>
          <View style={styles.textBox}>
            <CustomText style={[styles.ticketText, styles.label]}>
              상태
            </CustomText>
            <CustomText style={[styles.ticketText, styles.value]}>
              예매완료
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
