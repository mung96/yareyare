import {Pressable, StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import {Grade} from '@/main/shared/types';
import CustomText from '@/main/ui/widgets/CustomText.tsx';

type Props = {
  grade: Grade;
  onSelect: (section: Grade) => void;
  isSelect: boolean;
};

function GradeItem({grade, onSelect, isSelect}: Props) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        pressed && styles.pressed,
        isSelect && styles.selected,
      ]}
      onPress={() => {
        onSelect(grade);
      }}>
      <View style={styles.textContainer}>
        <View style={[styles.sectionColor, {backgroundColor: grade.color}]} />
        <CustomText style={styles.text}>{grade.gradeName}</CustomText>
      </View>
      <View style={styles.textContainer}>
        <CustomText style={[styles.text, styles.restText]}>
          {grade.availableSeats}
        </CustomText>
        <CustomText style={[styles.text]}>석</CustomText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GRAY_400,
    borderRadius: 5,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingLeft: 30,
    paddingRight: 20,
    borderBottomColor: COLORS.GRAY_200,
    borderBottomWidth: 0.4,
  },
  sectionColor: {
    backgroundColor: COLORS.BLACK,
    width: 14,
    height: 14,
    marginTop: 6,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: '700',
  },
  restText: {
    color: COLORS.PURPLE_100,
    fontWeight: '900',
  },
  pressed: {
    backgroundColor: COLORS.GRAY_500,
  },
  selected: {
    backgroundColor: COLORS.GRAY_500,
  },
});
export default GradeItem;
