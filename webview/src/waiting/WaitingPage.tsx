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
type NativeData = {
  gameName: string,
  accessToken: string
  gameId: number,
  memberId: string
}

function WaitingPage() {
  const client = useRef<StompJs.Client | null>(null);
  const [data, setData] = useState<Response | null>();
  const [nativeData, setNativeData] = useState<NativeData | null>({gameName: '', accessToken: '', gameId: 0, memberId: ''});
  const onConnect = () => {
    if (client.current !== null) {
      client.current.publish({
        destination: `/app/join-queue/${nativeData?.gameId}`,
        body: JSON.stringify({gameId: nativeData?.gameId}),
        headers: {
          Authorization: `Bearer ${nativeData?.accessToken}`
        },
      });

      client.current.subscribe(
          `/topic/queue-status/game/${nativeData?.gameId || 693}/memberId/${nativeData?.memberId || '84158567-d01d-4264-8244-d65ed57f1262'}`,
          message => {
            setData(JSON.parse(message.body))
          },
      );
    }
  };
  const onMessageHandler = (e: { data: string; }) => {
    setNativeData(JSON.parse(e.data))
  }
  useEffect(() => {
    // @ts-ignore
    document.addEventListener("message", onMessageHandler);
    return () => {
      // @ts-ignore
      document.removeEventListener("message", onMessageHandler);
    };
  }, []);

  useEffect(() => {
    if (nativeData) {
      connect(client, onConnect);
      return () => disConnect(client);
    }
    return () => disConnect(client);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nativeData]);

  useEffect(() => {
    // @ts-ignore
    window.ReactNativeWebView.postMessage('대기열 입장')

    // @ts-ignore
    window.ReactNativeWebView.postMessage(data?.position)
    if (!data?.position && data?.position! <= 10) {
      // @ts-ignore
      window.ReactNativeWebView.postMessage('대기열 탈출')
      disConnect(client);
    }
  }, [data?.position])

  return (
      <div className="container">
        <div className="header">
          <p className="header-title">접속 인원이 많아 대기중입니다.</p>
          <p className="header-subtitle">{nativeData?.gameName}</p>
        </div>
        <div className="queue-info">
          <p className="queue-info-title">나의 대기순서</p>
          <p className="queue-info-number">{data?.position || 1}</p>
          <p className="queue-info-behind">
            뒤에 <span className="footer-highlight">{data?.behind || 0}</span>명
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

export default WaitingPage;
