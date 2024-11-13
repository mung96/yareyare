import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {useTeamQuery} from '@/main/services/hooks/queries/useTeamQuery.ts';
import {SvgUri} from 'react-native-svg';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import useMemberModel from '@/main/services/hooks/useMemberModel.ts';

function UpdateTeamScreen() {
  const {data: teamListData} = useTeamQuery();
  const {member} = useMemberModel();
  const [teamId, setTeamId] = useState<number>(
    member?.myTeamId ? member.myTeamId : 0,
  );
  console.log(teamListData);
  return (
    <ScrollView contentContainerStyle={styles.layout}>
      {teamListData?.teams.map(team => (
        <View style={styles.logoContainer} key={team.teamId}>
          <Pressable
            style={({pressed}) => [
              styles.logoBox,
              pressed && styles.activeLogo,
            ]}>
            <SvgUri uri={team.teamLogo} width={90} height={90} />
          </Pressable>
          {teamId !== team.teamId && (
            <Icon
              name={'heart'}
              size={30}
              color={COLORS.WHITE}
              style={[styles.icon]}
            />
          )}
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
  activeLogo: {
    backgroundColor: COLORS.PURPLE_300,
    zIndex: 1,
    opacity: 0.9,
  },
  icon: {
    position: 'absolute',
    zIndex: 2,
    top: 30,
  },
});

export default UpdateTeamScreen;
