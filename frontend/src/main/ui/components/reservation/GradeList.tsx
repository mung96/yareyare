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
  console.log(value);
  const {gradeList} = useGradeModel();
  console.log(gradeList);
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
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 12,
  },
  sectionContainer: {
    width: '100%',
    backgroundColor: COLORS.GRAY_400,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',

    paddingVertical: 8,
  },
});

export default GradeList;
