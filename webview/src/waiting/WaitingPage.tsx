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
  const [nativeData, setNativeData] = useState<NativeData | null>(null);
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
          `/topic/queue-status/game/${nativeData?.gameId}/memberId/${nativeData?.memberId}`,
          message => {
            setData(JSON.parse(message.body))
          },
      );
    }
  };
  const onMessageHandler = (e: { data: string; }) => {
    // @ts-ignore
    // window.ReactNativeWebView.postMessage("페이지 진입")
    // // @ts-ignore
    // window.ReactNativeWebView.postMessage(e.data)
    setNativeData(JSON.parse(e.data))
  }
  useEffect(() => {

    // 안드로이드에서는 document / IOS 에서는 window 객체를 참조한다고 한다

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
    if (data?.position && data?.position! <= 10) {
      // @ts-ignore
      window.ReactNativeWebView.postMessage('대기열 탈출')
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

export default WaitingPage;
