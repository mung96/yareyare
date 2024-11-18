import * as StompJs from '@stomp/stompjs';


// interface ConnectProps {
//     client: { current: StompJs.Client | null };
//     onConnect: () => void;
// }

export const afterSubscribe = (response: any, message: string, func: any) => {
  if (response.message === message) {
    func();
  }
};

export const publishSocket = (
    data: any,
    client: {current: StompJs.Client | null},
    roomId: number,
) => {
  client.current?.publish({
    destination: `/pub/game/${roomId}`,
    body: JSON.stringify(data),
  });
};

export const connect = async (
    client: {current: StompJs.Client | null},
    onConnect: () => void,
) => {
  try {
    client.current = new StompJs.Client({
      brokerURL: 'wss://yareyare.co.kr/ws',
      connectHeaders: {
        Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc0NlcnRpZmljYXRlZCI6dHJ1ZSwic3ViIjoiODQxNTg1NjctZDAxZC00MjY0LTgyNDQtZDY1ZWQ1N2YxMjYyIiwicm9sZSI6IlJPTEVfVVNFUiIsImlzcyI6Ind3dy5zYW1zdW5nLmNvbSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJleHAiOjE3MzE5OTIwMjN9._Zh4D5r-C8kKifGBhgdTp4GY01UtKoGQP2plbcmBrpDAlw2AdLqkT2W5LBCcrvcJxr7OEW0yIiAWOkxWG3n1MA'
      },
      debug: function (str) {
        console.log('소켓 디버그:', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('onConnect 호출됨');
        onConnect();
      },
    });

    if (client.current) {
      client.current.activate();
      console.log('WebSocket 활성화됨');
    } else {
      console.log('클라이언트가 초기화되지 않았습니다.');
    }
  } catch (err) {
    console.log(err);
  }
};
// 연결 끊기
export const disConnect = (client: {
  current: {deactivate: () => void} | null;
}) => {
  if (client.current === null) {
    return;
  }
  client.current.deactivate();
};
