import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {COLORS} from '@/main/shared/styles';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconA from 'react-native-vector-icons/AntDesign';

function TicketImageScreen({
  route,
}: NativeStackScreenProps<MypageParamList, 'TicketImage'>) {
  const ticket = route.params;
  console.log(ticket.imageUrl);
  return (
    <View
      style={{
        backgroundColor: COLORS.WHITE,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
      }}>
      <Pressable>
        <IconA name={'caretleft'} size={24} />
      </Pressable>
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              top: 280,
            }}>
            <View
              style={{
                backgroundColor: COLORS.WHITE,
                width: 32,
                height: 32,
                borderRadius: 100,
                transform: [{translateX: -16}],
              }}
            />
            <CustomText>
              - - - - - - - - - - - - - - - - - - - - - - - - -
            </CustomText>
            <View
              style={{
                backgroundColor: COLORS.WHITE,
                width: 32,
                height: 32,
                borderRadius: 100,
                transform: [{translateX: 16}],
              }}
            />
          </View>
          <Image
            source={{uri: ticket.imageUrl}}
            style={{width: 180, height: 180, borderRadius: 180}}
          />
          <View style={styles.textBox}>
            <CustomText>{ticket.gameDateTime}</CustomText>
            <CustomText>{ticket.gameDateTime}</CustomText>
            <CustomText>{ticket.gameDateTime}</CustomText>
          </View>
          <View style={styles.barcodeBox}>
            <Icon name={'barcode'} size={120} color={COLORS.BLACK} />
            <CustomText
              style={{position: 'absolute', top: 115, color: COLORS.GRAY_300}}>
              {ticket.gameDateTime}
            </CustomText>
          </View>
        </ScrollView>
      </View>
      <Pressable>
        <IconA name={'caretright'} size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 430,
    backgroundColor: COLORS.GRAY_400,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    gap: 14,
  },
  textBox: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  barcodeBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default TicketImageScreen;
