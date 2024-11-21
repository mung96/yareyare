import {StyleSheet, View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {SvgUri} from 'react-native-svg';

type Props = {
  team: {
    teamId: number;
    teamLogo: string;
    teamName: string;
    label: string;
    value: number;
  };
};

function TeamItem({team}: Props) {
  return (
    <View style={styles.container}>
      <SvgUri uri={team.teamLogo} width={48} height={48} />
      <CustomText style={styles.text}>{team.teamName}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 0.3,
    paddingVertical: 12,
    paddingLeft: 16,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default TeamItem;
