import SectionItem from '@/main/ui/components/reservation/SectionItem.tsx';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import {Section, SectionKey} from '@/main/shared/types';
import {SECTION_IMG, SECTION_LIST} from '@/main/shared/constants';
import {useState} from 'react';

function SectionList() {
  const [selctedSection, setSelctedSection] = useState<Section | undefined>();

  return (
    <>
      <View style={styles.imgContainer}>
        <Image
          source={selctedSection ? selctedSection.img : SECTION_IMG.DEFAULT}
        />
      </View>
      <View style={styles.sectionContainer}>
        {Object.keys(SECTION_LIST).map(sectionKey => (
          <SectionItem
            key={sectionKey}
            section={SECTION_LIST[sectionKey as SectionKey]}
            onSelect={setSelctedSection}
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
