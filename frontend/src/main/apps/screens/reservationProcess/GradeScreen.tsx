import {StyleSheet, View} from 'react-native';
import MainButton from '@/main/ui/widgets/MainButton.tsx';
import {COLORS} from '@/main/shared/styles';
import GradeList from '@/main/ui/components/reservation/GradeList.tsx';
import {Controller, useForm} from 'react-hook-form';
import {GradeContext} from '@/main/shared/types';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import ReservationLayout from '@/main/apps/layout/ReservationLayout.tsx';
import useGameDetailModel from '@/main/services/hooks/useGameDetailQuery.ts';

type Props = {
  onNext: (grade: GradeContext) => void;
};

function GradeScreen({onNext}: Props) {
  const {
    control,
    handleSubmit,
    formState: {isValid: isFormValid, isSubmitting},
  } = useForm<GradeContext>({
    defaultValues: undefined,
  });
  const {gameDetail} = useGameDetailModel();

  return (
    <>
      <ReservationLayout>
        <View style={styles.headerContainer}>
          <CustomText style={styles.title}>{gameDetail.name}</CustomText>
          <CustomText style={styles.date}>
            {gameDetail.date}
            {' ' + gameDetail.place}
          </CustomText>
        </View>

        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <GradeList value={value} onSelect={onChange} />
          )}
          name="grade"
        />
      </ReservationLayout>

      <View style={styles.buttonContainer}>
        <MainButton
          label={'다음'}
          onPress={handleSubmit(onNext)}
          size={'large'}
          disabled={!isFormValid || isSubmitting}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: COLORS.GRAY_400,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 12,
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
  buttonContainer: {
    backgroundColor: COLORS.WHITE,
    width: '100%',
    height: 56,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});
export default GradeScreen;
