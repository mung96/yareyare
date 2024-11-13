import React from 'react';
import MyPageList from '@/main/ui/components/member/MyPageList.tsx';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import CouponBox from '@/main/ui/components/member/CouponBox.tsx';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import useMemberModel from '@/main/services/hooks/useMemberModel.ts';
import {SvgUri} from 'react-native-svg';
const {width} = Dimensions.get('window');
function MyPageScreen() {
  const {member} = useMemberModel();
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 12,
        paddingBottom: 64,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 48,
        width: '100%',
        backgroundColor: COLORS.WHITE,
      }}>
      <View style={styles.container}>
        <View style={styles.textBox}>
          <CustomText style={styles.text}>{member?.name}님,</CustomText>
          <CustomText style={styles.text}>안녕하세요~</CustomText>
        </View>
        <View style={styles.logoBox}>
          {member?.myTeamLogo && (
            <SvgUri uri={String(member?.myTeamLogo)} width={48} height={48} />
          )}
        </View>
      </View>
      <CouponBox />
      <MyPageList />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  textBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    backgroundColor: COLORS.PURPLE_300,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    height: 200,
    paddingHorizontal: 20,
    paddingBottom: 16,
    bottom: 12,
  },
  text: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.WHITE,
  },
  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.WHITE,
    borderRadius: 50,
  },
});

export default MyPageScreen;
