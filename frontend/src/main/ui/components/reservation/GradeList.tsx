import SectionItem from '@/main/ui/components/reservation/SectionItem.tsx';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import {Grade, GradeKey} from '@/main/shared/types';
import {GRADE_IMG, GRADE_LIST} from '@/main/shared/constants';

type Props = {
  value: Grade | undefined;
  onSelect: (section: Grade) => void;
};
function GradeList({value, onSelect}: Props) {
  console.log(value);
  return (
    <>
      <View style={styles.imgContainer}>
        <Image source={value ? value.img : GRADE_IMG.DEFAULT} />
      </View>
      <View style={styles.sectionContainer}>
        {Object.keys(GRADE_LIST).map(gradeKey => (
          <SectionItem
            key={gradeKey}
            section={GRADE_LIST[gradeKey as GradeKey]}
            onSelect={onSelect}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    backgroundColor: COLORS.GRAY_400,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 12,
  },
  sectionContainer: {
    backgroundColor: COLORS.GRAY_400,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 30,
    paddingRight: 20,
    paddingVertical: 8,
  },
});

export default GradeList;
