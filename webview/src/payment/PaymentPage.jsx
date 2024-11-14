import {fetchPortOne} from "./Payment";
import {useEffect, useState} from "react";


function PaymentPage() {
  const [data,setData] = useState()
  const onMessageHandler =(e) =>{
    window.ReactNativeWebView.postMessage("페이지 진입")
    window.ReactNativeWebView.postMessage(e.data)
    setData(JSON.parse(e.data))
  }
  useEffect(() => {

    // 안드로이드에서는 document / IOS 에서는 window 객체를 참조한다고 한다
    document.addEventListener("message", onMessageHandler);
    return () => {
      document.removeEventListener("message", onMessageHandler);
    };
  }, []);
  useEffect(() => {
    data &&   fetchPortOne(data)
  }, [data]);
  return (
      <div>
      </div>
  );
}

export default PaymentPage;
