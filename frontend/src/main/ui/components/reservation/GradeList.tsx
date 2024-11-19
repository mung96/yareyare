import {Image, StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import {Grade} from '@/main/shared/types';
import {GRADE_IMG} from '@/main/shared/constants';
import useGradeModel from '@/main/services/hooks/useGradeModel.ts';
import GradeItem from '@/main/ui/components/reservation/GradeItem.tsx';

type Props = {
  value: Grade | undefined;
  onSelect: (section: Grade) => void;
};
function GradeList({value, onSelect}: Props) {
  const {gradeList} = useGradeModel();
  return (
    <>
      <View style={styles.imgContainer}>
        <Image source={value ? value.img : GRADE_IMG.DEFAULT} />
      </View>
      <View style={styles.sectionContainer}>
        {gradeList.map(grade => (
          <GradeItem
            isSelect={value?.gradeName === grade.gradeName}
            key={grade.gradeName}
            grade={grade}
            onSelect={onSelect}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    width: '100%',
    backgroundColor: COLORS.GRAY_400,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 24,
  },
  sectionContainer: {
    width: '100%',
    backgroundColor: COLORS.GRAY_400,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    paddingTop: 16,
    paddingBottom: 16,
  },
});

export default GradeList;
