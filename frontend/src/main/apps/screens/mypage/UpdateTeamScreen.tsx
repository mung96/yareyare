import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {useTeamQuery} from '@/main/services/hooks/queries/useTeamQuery.ts';
import {SvgUri} from 'react-native-svg';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import useMemberModel from '@/main/services/hooks/useMemberModel.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';
import {PATH} from '@/main/shared/constants';
import {patchMyTeam} from '@/main/apis/member.ts';

function UpdateTeamScreen({
  navigation,
}: NativeStackScreenProps<MypageParamList>) {
  const {data: teamListData} = useTeamQuery();
  const {member} = useMemberModel();
  const [teamId, setTeamId] = useState<number>(
    member?.myTeamId ? member.myTeamId : 0,
  );
  console.log(teamListData);
  const handleLogoPress = async (teamId: number) => {
    await patchMyTeam(teamId);
    navigation.navigate(PATH.MY_PAGE);
  };
  return (
    <ScrollView contentContainerStyle={styles.layout}>
      {teamListData?.teams.map(team => (
        <View style={styles.logoContainer} key={team.teamId}>
          <Pressable
            onPress={() => {
              setTeamId(team.teamId);
              handleLogoPress(team.teamId);
            }}
            style={styles.logoBox}>
            <SvgUri uri={team.teamLogo} width={90} height={90} />
          </Pressable>
          {teamId === team.teamId && (
            <View style={[styles.activeLogo]}>
              <Icon
                name={'heart'}
                size={30}
                color={COLORS.WHITE}
                style={[styles.icon]}
              />
            </View>
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
    position: 'absolute',
    display: 'flex',
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: COLORS.PURPLE_300,
    zIndex: 2,
    opacity: 0.8,
    top: 0,
  },
  icon: {
    position: 'absolute',
    zIndex: 10,
  },
});

export default UpdateTeamScreen;
