import SectionItem from '@/main/ui/components/reservation/SectionItem.tsx';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import {Section, SectionKey} from '@/main/shared/types';
import {SECTION_IMG, SECTION_LIST} from '@/main/shared/constants';

type Props = {
  value: Section | undefined;
  onSelect: (section: Section) => void;
};
function SectionList({value, onSelect}: Props) {
  console.log(value);
  return (
    <>
      <View style={styles.imgContainer}>
        <Image source={value ? value.img : SECTION_IMG.DEFAULT} />
      </View>
      <View style={styles.sectionContainer}>
        {Object.keys(SECTION_LIST).map(sectionKey => (
          <SectionItem
            key={sectionKey}
            section={SECTION_LIST[sectionKey as SectionKey]}
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

export default SectionList;
