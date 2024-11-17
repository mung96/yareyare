import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {COLORS} from '@/main/shared/styles';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconA from 'react-native-vector-icons/AntDesign';

function TicketImageScreen({
  route,
}: NativeStackScreenProps<MypageParamList, 'TicketImage'>) {
  const ticket = route.params;
  const [seatIdx, setSeatIdx] = useState(0);
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
      <View style={{width: 24, height: 24}}>
        {seatIdx !== 0 && (
          <Pressable onPress={() => setSeatIdx(prev => prev - 1)}>
            <IconA name={'caretleft'} size={24} />
          </Pressable>
        )}
      </View>
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
              - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
            <CustomText style={styles.description}>
              {ticket.gameDateTime}
            </CustomText>
            <CustomText style={styles.description}>
              {ticket.seats[seatIdx].gradeName + ticket.seats[seatIdx].seatNo}
            </CustomText>
            <CustomText style={styles.stadiumText}>
              {ticket.stadiumName}
            </CustomText>
          </View>
          <View style={styles.barcodeBox}>
            <Icon name={'barcode'} size={120} color={COLORS.BLACK} />
            <CustomText
              style={{position: 'absolute', top: 115, color: COLORS.GRAY_300}}>
              {ticket.seats[seatIdx].ticketId}
            </CustomText>
          </View>
        </ScrollView>
      </View>
      <View>
        <View style={{width: 24, height: 24}}>
          {seatIdx !== ticket.seats.length - 1 && (
            <Pressable onPress={() => setSeatIdx(prev => prev + 1)}>
              <IconA name={'caretright'} size={24} />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 265,
    height: 435,
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
  stadiumText: {
    color: COLORS.GRAY_300,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.GRAY_300,
  },
});

export default TicketImageScreen;
