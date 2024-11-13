import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {useTeamQuery} from '@/main/services/hooks/queries/useTeamQuery.ts';
import {SvgUri} from 'react-native-svg';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';

function UpdateTeamScreen() {
  const {data: teamListData} = useTeamQuery();
  return (
    <View style={styles.layout}>
      {teamListData?.teams.map(team => (
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <SvgUri uri={team.teamLogo} width={96} height={96} />
          </View>
          <CustomText>{team.teamName}</CustomText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 21,
    gap: 12,
    height: '100%',
    backgroundColor: COLORS.WHITE,
  },
  logoContainer: {
    width: '30%',
  },
  logoBox: {
    width: '100%',
    borderWidth: 1,
  },
});

export default UpdateTeamScreen;
