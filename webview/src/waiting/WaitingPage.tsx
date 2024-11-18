import React, {useEffect, useRef, useState} from 'react';
import './wait.css';
import * as StompJs from '@stomp/stompjs';
import {connect, disConnect} from "./webSocketUtil";

type Response = {
  "gameId": number;
  "token": string;
  "position": number;
  "behind": number;
}

function App() {
  const client = useRef<StompJs.Client | null>(null);
  const [data, setData] = useState<Response | null>();
  const onConnect = () => {
    if (client.current !== null) {
      client.current.publish({
        destination: '/app/join-queue/693',
        body: JSON.stringify({gameId: 693}),
        headers: {
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc0NlcnRpZmljYXRlZCI6dHJ1ZSwic3ViIjoiODQxNTg1NjctZDAxZC00MjY0LTgyNDQtZDY1ZWQ1N2YxMjYyIiwicm9sZSI6IlJPTEVfVVNFUiIsImlzcyI6Ind3dy5zYW1zdW5nLmNvbSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJleHAiOjE3MzIwMDY5NzR9.D_HDpPqGjau3trZoMkUikU7Eheaop4-nIkp_K0uViHRDgSW7HLwcrV-KBRVte2LUvhM3d2qWnIbAf27mklK2ZA',
        },
      });

      client.current.subscribe(
          '/topic/queue-status/game/693/memberId/84158567-d01d-4264-8244-d65ed57f1262',
          message => {
            const response = JSON.parse(message.body);
            setData(JSON.parse(message.body))
          },
      );
    }
  };

  useEffect(() => {
    connect(client, onConnect);
    console.log('useEffect 호출됨');
    return () => disConnect(client);
  }, []);

  return (
      <div className="container">
        <div className="header">
          <p className="header-title">접속 인원이 많아 대기중입니다.</p>
          {/*<p className="header-subtitle">{gameDetail.name}</p>*/}
        </div>
        <div className="queue-info">
          <p className="queue-info-title">나의 대기순서</p>
          <p className="queue-info-number">{data?.position}</p>
          <p className="queue-info-behind">
            뒤에 <span className="footer-highlight">{data?.behind}</span>명
          </p>
        </div>
        <div className="footer">
          <p className="footer-text">잠시만 기다려주시면, 예매하기 페이지로 연결됩니다. 새로고침 하거나 재접속 하시면 대기순서가
            <span className="footer-highlight"> 초기화</span> 되어 대기시간이 더 길어집니다.
          </p>
        </div>
      </div>
  );
}

export default App;
