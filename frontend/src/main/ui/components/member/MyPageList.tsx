import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';
import MypageItem from '@/main/ui/components/member/MypageItem.tsx';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import React from 'react';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';
import {PATH} from '@/main/shared/constants';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useLogoutMutation} from '@/main/services/hooks/queries/useMemberQuery.ts';

function MyPageList() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<MypageParamList>>();
  const {mutate: logout} = useLogoutMutation();
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>마이페이지</CustomText>
      <MypageItem
        icon={<Icon name={'ticket'} size={22} />}
        title={'티켓 예매 내역'}
        onPress={() =>
          navigation.navigate(PATH.TICKET_RECORD, {type: 'purchases'})
        }
      />
      <MypageItem
        icon={<MIcon name={'ticket-confirmation'} size={22} />}
        title={'티켓 취소 내역'}
        onPress={() =>
          navigation.navigate(PATH.TICKET_RECORD, {type: 'cancellations'})
        }
      />
      <MypageItem
        icon={<MIcon name={'account-group'} size={22} />}
        title={'나의 팀 변경'}
        onPress={() => navigation.navigate(PATH.UPDATE_MYTEAM)}
      />
      <MypageItem
        icon={<MIcon name={'file-certificate'} size={22} />}
        title={'본인 인증'}
        onPress={() => dispatch(moveNavigation('certificate'))}
      />
      <MypageItem
        icon={<MIcon name={'logout'} size={22} />}
        title={'로그아웃'}
        onPress={() => logout()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GRAY_400,
    paddingHorizontal: 20,
    paddingVertical: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '100%',
    maxWidth: 360,
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    color: COLORS.BLACK,
    fontWeight: '900',
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 8,
  },
});
export default MyPageList;
