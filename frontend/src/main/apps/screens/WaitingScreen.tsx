import {Pressable} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {moveNavigation} from '@/main/stores/clients/navigationCategory.ts';
import {useDispatch} from 'react-redux';
import CommonLayout from '@/main/apps/layout/CommonLayout.tsx';

function WaitingScreen() {
  const dispatch = useDispatch();
  return (
    <CommonLayout>
      <Pressable onPress={() => dispatch(moveNavigation('reservation'))}>
        <CustomText>예매하러가기</CustomText>
      </Pressable>
    </CommonLayout>
  );
}

export default WaitingScreen;
