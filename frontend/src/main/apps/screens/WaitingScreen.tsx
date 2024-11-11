import {Pressable} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';
import {useDispatch, useSelector} from 'react-redux';
import CommonLayout from '@/main/apps/layout/CommonLayout.tsx';
import {RootState} from '@/main/stores/rootReducer.ts';

function WaitingScreen() {
  const dispatch = useDispatch();

  const gameId = useSelector((state: RootState) => state.reservation.gameId);
  return (
    <CommonLayout>
      <Pressable onPress={() => dispatch(moveNavigation('reservation'))}>
        <CustomText>{gameId}</CustomText>
        <CustomText>예매하러가기</CustomText>
      </Pressable>
    </CommonLayout>
  );
}

export default WaitingScreen;
