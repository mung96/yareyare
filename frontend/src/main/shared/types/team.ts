import {ImageSourcePropType} from 'react-native';

export type TeamKey =
  | 'DOOSAN'
  | 'KIWOOM'
  | 'LG'
  | 'KT'
  | 'NC'
  | 'SAMSUNG'
  | 'HANHWA'
  | 'KIA'
  | 'LOTTE'
  | 'SSG';

export type Team = {
  name: string;
  logo: ImageSourcePropType;
  stadium: string;
};
