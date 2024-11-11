import {ScrollView, StyleSheet, Text, View} from 'react-native';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {COLORS} from '@/main/shared/styles';
import GradeList from '@/main/ui/components/reservation/GradeList.tsx';
import {Controller, useForm} from 'react-hook-form';
import {GradeContext} from '@/main/shared/types';
import {useGetGameDetailQuery} from '@/main/services/hooks/queries/useGameQuery.ts';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/main/stores/rootReducer.ts';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import useGameDetailModel from '@/main/services/hooks/useGameDetailQuery.ts';

type Props = {
  onNext: (grade: GradeContext) => void;
};

function GradeScreen({onNext}: Props) {
  const {control, handleSubmit} = useForm<GradeContext>({
    defaultValues: undefined,
  });
  const {gameDetail} = useGameDetailModel();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <CustomText style={styles.title}>{gameDetail.name}</CustomText>
          <CustomText style={styles.date}>
            {gameDetail.date}
            {' ' + gameDetail.place}
          </CustomText>
        </View>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <GradeList value={value} onSelect={onChange} />
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
    fontSize: 14,
  },
});
export default GradeScreen;
