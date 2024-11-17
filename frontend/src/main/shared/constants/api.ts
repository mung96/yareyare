import {TicketType} from '@/main/shared/types/payment/domain.ts';

export const END_POINT = {
  //game
  GAME: 'games',
  GAME_RESULT: 'games/results',
  GAME_PLAN: (teamId: string) => `games/teams/${teamId}`,
  GAME_SCHEDULE: (teamId: string) => `games/teams/${teamId}/schedule`,

  GAME_DETAIL: (gameId: string) => `games/${gameId}/details`,
  GAME_GRADE: (gameId: string) => `games/${gameId}/grades`,
  GAME_SEAT: (gameId: string) => `games/${gameId}/seats`,

  //member
  CERTIFICATION: 'members/authentication',
  MEMBER: 'members',
  LOGOUT: 'members/logout',
  MY_TEAM: 'members/my-team',

  //teamrr
  TEAM: 'games/teams',

  //payment
  TICKET_RECORD: (type: TicketType) => `payments/tickets/${type}`,
  PAYMENT_HISTORY: 'payments/history',
  PAYMENT: 'payments',
  TICKET_DETAIL: (purchaseId: number) => `payments/tickets/${purchaseId}`,

  //stadium
  STADIUM: 'games/stadiums',
};
