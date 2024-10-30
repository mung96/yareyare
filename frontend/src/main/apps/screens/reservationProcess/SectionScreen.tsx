import {StyleSheet, Text, View} from 'react-native';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {COLORS} from '@/main/shared/styles';

type Props = {
  onNext: () => void;
};

function SectionScreen({onNext}: Props) {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>2024 신한SOL뱅크 KBO 리그 롯데 vs 두산</Text>
        <Text style={styles.date}>2024.08.15(목) 17:00 기아 챔피언스 필드</Text>
      </View>

      <View>
        <View>
          <Text>1루 내야</Text>
          <View>
            <Text>1</Text>
            <Text>석</Text>
          </View>
        </View>
      </View>

      <MainButton label={'다음'} onPress={onNext} size={'large'} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.GRAY_400,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  title: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: '700',
  },
  date: {
    color: COLORS.BLACK,
    fontSize: 12,
  },
});
export default SectionScreen;
