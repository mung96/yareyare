import {Pressable, StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import {Section} from '@/main/shared/types';
import CustomText from '@/main/ui/widgets/CustomText.tsx';

type Props = {
  section: Section;
  onSelect: (section: Section) => void;
};

function SectionItem({section, onSelect}: Props) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        onSelect(section);
      }}>
      <View style={styles.textContainer}>
        <View style={[styles.sectionColor, {backgroundColor: section.color}]} />
        <CustomText style={styles.text}>{section.label}</CustomText>
      </View>
      <View style={styles.textContainer}>
        <CustomText style={[styles.text, styles.restText]}>1</CustomText>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,

    borderBottomColor: COLORS.GRAY_200,
    borderBottomWidth: 0.4,
  },
  sectionColor: {
    backgroundColor: COLORS.BLACK,
    width: 12,
    height: 12,
    marginTop: 6,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontWeight: 'bold',
  },
  restText: {
    color: COLORS.PURPLE_100,
    fontWeight: '900',
  },
});
export default SectionItem;
