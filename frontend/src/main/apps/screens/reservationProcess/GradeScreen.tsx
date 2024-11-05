import {ScrollView, StyleSheet, Text, View} from 'react-native';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {COLORS} from '@/main/shared/styles';
import SectionList from '@/main/ui/components/reservation/SectionList';
import {Controller, useForm} from 'react-hook-form';
import {GradeInput} from '@/main/shared/types';

type Props = {
  onNext: (grade: GradeInput) => void;
};

function GradeScreen({onNext}: Props) {
  const {control, handleSubmit} = useForm<GradeInput>({
    defaultValues: undefined,
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            2024 신한SOL뱅크 KBO 리그 롯데 vs 두산
          </Text>
          <Text style={styles.date}>
            2024.08.15(목) 17:00 기아 챔피언스 필드
          </Text>
        </View>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <SectionList value={value} onSelect={onChange} />
          )}
          name="grade"
        />
      </ScrollView>
      <MainButton
        label={'다음'}
        onPress={handleSubmit(onNext)}
        size={'large'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
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
export default GradeScreen;
