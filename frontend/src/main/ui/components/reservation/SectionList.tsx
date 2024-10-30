import SectionItem from '@/main/ui/components/reservation/SectionItem.tsx';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';

function SectionList() {
  return (
    <View style={styles.container}>
      <SectionItem />
      <SectionItem />
      <SectionItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GRAY_400,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 30,
    paddingRight: 20,
  },
});

export default SectionList;
