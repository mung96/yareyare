import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import {Section} from '@/main/shared/types';

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
        <Text style={styles.text}>{section.label}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.restText]}>1</Text>
        <Text style={[styles.text]}>석</Text>
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
