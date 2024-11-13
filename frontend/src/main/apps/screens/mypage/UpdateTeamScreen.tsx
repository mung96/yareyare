import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {useTeamQuery} from '@/main/services/hooks/queries/useTeamQuery.ts';
import {SvgUri} from 'react-native-svg';
import {ScrollView, StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';

function UpdateTeamScreen() {
  const {data: teamListData} = useTeamQuery();
  console.log(teamListData);
  return (
    <ScrollView contentContainerStyle={styles.layout}>
      {teamListData?.teams.map(team => (
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <SvgUri uri={team.teamLogo} width={90} height={90} />
          </View>
          <CustomText style={styles.nameText}>{team.teamName}</CustomText>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layout: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 21,
    gap: 12,
    backgroundColor: COLORS.WHITE,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  logoBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GRAY_400,
    borderRadius: 50,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
});

export default UpdateTeamScreen;
