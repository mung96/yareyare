import SectionItem from '@/main/ui/components/reservation/SectionItem.tsx';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import {SECTION_LIST} from '@/main/shared/constants';

function SectionList() {
  return (
    <>
      <View style={styles.imgContainer}>
        <Image source={SECTION_LIST.FIRST_INFIELD.img} />
      </View>
      <View style={styles.sectionContainer}>
        <SectionItem />
        <SectionItem />
        <SectionItem />
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
