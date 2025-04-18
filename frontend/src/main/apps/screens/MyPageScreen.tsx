import React from 'react';
import MyPageList from '@/main/ui/components/member/MyPageList.tsx';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
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
        paddingHorizontal: 24,
        paddingBottom: 16,
        alignItems: 'center',
        gap: 52,
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.WHITE,
      }}>
      <View style={styles.container}>
        <View style={styles.textBox}>
          <CustomText style={styles.text}>{member?.name}님,</CustomText>
          <CustomText style={styles.text}>안녕하세요~</CustomText>
        </View>
        <View style={styles.logoBox}>
          {member?.myTeamLogo ? (
            <SvgUri
              uri={String(member?.myTeamLogo)}
              width={'100%'}
              height={'100%'}
            />
          ) : (
            <Image
              source={require('@/main/assets/yareLogo.png')}
              resizeMode={'contain'}
              style={{width: '100%', height: '100%', borderRadius: 50}}
            />
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
    height: 240,
    paddingHorizontal: 24,
    paddingBottom: 16,
    bottom: 12,
  },
  text: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.WHITE,
  },
  logoBox: {
    width: 90,
    height: 90,
    backgroundColor: COLORS.WHITE,
    borderRadius: 50,
  },
});

export default MyPageScreen;
