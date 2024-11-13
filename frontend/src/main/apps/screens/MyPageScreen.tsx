import React from 'react';
import MyPageList from '@/main/ui/components/member/MyPageList.tsx';
import {ScrollView} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import CouponBox from '@/main/ui/components/member/CouponBox.tsx';

function MyPageScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 64,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        width: '100%',
        backgroundColor: COLORS.WHITE,
      }}>
      <CouponBox />
      <MyPageList />
    </ScrollView>
  );
}

export default MyPageScreen;
